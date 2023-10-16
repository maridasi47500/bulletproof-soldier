import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AppointmentService } from './../shared/appointment.service';
import { Auth } from '@angular/fire/auth';
@Component({
  selector: 'app-make-appointment',
  templateUrl: './make-appointment.page.html',
  styleUrls: ['./make-appointment.page.scss'],
})
export class MakeAppointmentPage implements OnInit {
  bookingForm: FormGroup;
  constructor(
    private aptService: AppointmentService,
    private router: Router,
    private auth: Auth,
    public fb: FormBuilder
  ) { }
  ngOnInit() {
	  var thisuser:any=this.auth.currentUser;
	  var uid=thisuser.uid;
	  console.log(thisuser,uid);
    this.bookingForm = this.fb.group({
      name: [''],
      email: [''],
      user_id: [uid],
      mobile: [''],
    });
  }
  formSubmit() {
    if (!this.bookingForm.valid) {
      console.log();
      return false;

    } else {
      console.log("form vald");
        console.log(this.bookingForm.value);
      return this.aptService
        .createBooking(this.bookingForm.value)
        .then((res: any) => {
          console.log(res, "monresultat");
          this.bookingForm.reset();
          this.router.navigate(['/home']);
        })
        .catch((error: any) => console.log(error));
    }
  }
}
