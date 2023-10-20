import { Component, OnInit } from '@angular/core';
import { Sms } from '../shared/Sms';
import { SmsService } from './../shared/sms.service';
import { AppointmentService } from './../shared/appointment.service';

@Component({
  selector: 'app-mysms',
  templateUrl: 'mysms.page.html',
  styleUrls: ['mysms.page.scss'],
})
export class MysmsPage implements OnInit {
  Sms: any = [];
  myvalue:any;

  constructor(private smsService: SmsService,private aptService: AppointmentService) { }

  ngOnInit() {
    this.fetchSms();
    let smsRes = this.smsService.getSmsList();
    smsRes.snapshotChanges().subscribe((res) => {
      this.Sms = [];
      res.forEach((item) => {
        let a: any = item.payload.toJSON();
        a['$key'] = item.key;
	   this.smsService.getSms(item.key).valueChanges().subscribe(urres => {
	   this.aptService.getBooking(urres.appointment_id).valueChanges().subscribe(myres => {
		   a["mobile"]=myres.mobile;
																																															                                                                });

											     

																																															                                                                });
        this.Sms.push(a as Sms);
      });
    });
  }

  fetchSms() {
    this.smsService
      .getSmsList()
      .valueChanges()
      .subscribe((res) => {
        console.log(res);
      });
  }
    sendSms($ev) {
					              this.myvalue={mobile: $ev.target.dataset.mobile, content:$ev.target.dataset.content};
						                  this.myvalue.draft=0;
								              this.sms.send(this.appointment.mobile, myvalue.content).then((x)=>{
										                          console.log(x);
													                      this.myvalue.sent=1;
															                  })
																	              .catch(error => window.alert("oops! le sms n'a pas été envoyé!"));

																		            return this.smsService
																			            .createSms(this.myvalue)
																				            .then((res) => {
																						              console.log(res);
																							                this.smsForm.reset();
																									          this.router.navigate(['/home']);
																										          })
																											          .catch((error) => console.log(error));
																												        }


  deleteSms(id: any) {
    console.log(id);
    if (window.confirm('Do you really want to delete?')) {
      this.smsService.deleteSms(id);
    }
  }
}
