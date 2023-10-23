import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SmsService } from './../shared/sms.service';
import { Sms } from './../shared/Sms';
import { AppointmentService } from './../shared/appointment.service';
import { ActivatedRoute, Router } from "@angular/router";
import { Auth } from '@angular/fire/auth';
import { SMS } from '@awesome-cordova-plugins/sms/ngx';


@Component({
  selector: 'app-make-sms',
  templateUrl: './make-sms.page.html',
  styleUrls: ['./make-sms.page.scss'],
})
export class MakeSmsPage implements OnInit {
 smsForm: FormGroup;
 myvalue:any;
  user:any;
  appointment:any;
  user_id:any;
  myid:any;
  username:any;
  Sms: any =[];

  constructor(
	  private sms: SMS,
    private smsService: SmsService,
    private aptService: AppointmentService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private auth: Auth,
    public fb: FormBuilder
  ) {

	  this.user=this.auth.currentUser;
	  if (this.user){
	  this.myid=this.user.uid;
	  }
	  this.user_id = this.actRoute.snapshot.paramMap.get('user_id');
	  console.log(this.user_id);
	                                                          this.aptService.getBooking(this.user_id).valueChanges().subscribe(res => {
									  console.log(res,"hello !!!");
									                                                                        this.username=res.name;
									                                                                        this.appointment=res;
																		                                                                          });
 
  }

  ngOnInit() {
    var mydate=new Date();
    this.smsForm = this.fb.group({
      user_id: [this.myid],
      appointment_id: [this.user_id],
      draft: [1],
      sent: [0],
      content: [''],
      date: [mydate],
    });
        this.fetchSms();
	    let smsRes = this.smsService.getSmsList();
	        smsRes.snapshotChanges().subscribe((res) => {
			      this.Sms = [];
			            res.forEach((item) => {
					            let a: any = item.payload.toJSON();
						            a['$key'] = item.key;
							    if (a.user_id===this.myid && a.appointment_id === this.user_id){
							            this.Sms.push(a as Sms);
							    }
								          });
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
          this.router.navigate(['/mysms']);
        })
        .catch((error) => console.log(error));
    }
  }
  sendSms() {
    if (!this.smsForm.valid) {
      return false;
    } else {
	    this.myvalue=this.smsForm.value;
	    this.myvalue.draft=0;
	    this.myvalue.sent=this.smsService.sendSms(this.myvalue.mobile, this.myvalue.content);

      return this.smsService
        .createSms(this.myvalue)
        .then((res) => {
          console.log(res);
          this.smsForm.reset();
          this.router.navigate(['/home']);
        })
        .catch((error) => console.log(error));
    }
  }

    fetchSms() {
	        this.smsService
		      .getSmsList()
		            .valueChanges()
			          .subscribe((res: any) => {
					          console.log(res);
						        });
							  }

}
