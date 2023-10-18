import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SmsService } from './../shared/sms.service';
import { Sms } from './../shared/Sms';
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
  user:any;
  user_id:any;
  myid:any;
  username:any;
  Sms: any =[];

  constructor(
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

    fetchSms() {
	        this.smsService
		      .getSmsList()
		            .valueChanges()
			          .subscribe((res: any) => {
					          console.log(res);
						        });
							  }

}
