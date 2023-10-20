import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";
import { AppointmentService } from './../shared/sms.service';
import { Auth } from '@angular/fire/auth';
@Component({
  selector: 'app-edit-sms',
  templateUrl: './edit-sms.page.html',
  styleUrls: ['./edit-sms.page.scss'],
})
export class EditAppointmentPage implements OnInit {
  updateAppointmentForm: FormGroup;
  id: any;
  constructor(
    private aptService: AppointmentService,
    private actRoute: ActivatedRoute,
    private router: Router,
    public fb: FormBuilder
  ) {
    this.id = this.actRoute.snapshot.paramMap.get('id');
    this.aptService.getAppointment(this.id).valueChanges().subscribe(res => {
      this.updateAppointmentForm.setValue(res);
    });
  }
  ngOnInit() {
    this.updateAppointmentForm = this.fb.group({
      date: [''],
      content: [''],
      user_id: [''],
      appointment_id: [''],
      draft: [''],
      sent: ['']
    })
    console.log(this.updateAppointmentForm.value)
  }
  updateForm() {
    this.aptService.updateAppointment(this.id, this.updateSmsForm.value)
      .then(() => {
        this.router.navigate(['/home']);
      })
      .catch(error => console.log(error));
  }
}
