import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SmsService } from './../shared/sms.service';
import { AppointmentService } from './../shared/appointment.service';
import { ActivatedRoute, Router } from "@angular/router";
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-make-sms',
  templateUrl: './make-sms.page.html',
  styleUrls: ['./make-sms.page.scss'],
})
export class MakeSmsPage implements OnInit {
  smsForm: FormGroup;
  user_id:any;
  myid:any;
  username:any;

  constructor(
    private smsService: SmsService,
    private aptService: AppointmentService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private auth: Auth,
    public fb: FormBuilder
  ) {
	  this.myid=this.auth.currentUser.uid;
	  this.user_id = this.actRoute.snapshot.paramMap.get('user_id');
	                                                          this.aptService.getBooking(this.user_id).valueChanges().subscribe(res => {
									                                                                        this.username=res.name;
																		                                                                          });
 
  }

  ngOnInit() {
	  var mydate=new Date();
    this.smsForm = this.fb.group({
      user_id: [this.myid],
      appointment_id: [this.user_id],
      draft: [1],
      content: [''],
      date: [mydate],
    });
  }

  formSubmit() {
    if (!this.smsForm.valid) {
      return false;
    } else {
      return this.smsService
        .createSms(this.smsForm.value)
        .then((res) => {
          console.log(res);
          this.smsForm.reset();
          this.router.navigate(['/home']);
        })
        .catch((error) => console.log(error));
    }
  }
  smsSend() {
    if (!this.smsForm.valid) {
      return false;
    } else {
	    var myvalue=this.smsForm.value;
	    myvalue.draft=0;
      return this.smsService
        .createSms(this.smsForm.value)
        .then((res) => {
          console.log(res);
          this.smsForm.reset();
          this.router.navigate(['/home']);
        })
        .catch((error) => console.log(error));
    }
}
