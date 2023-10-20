import { Injectable } from '@angular/core';
import { Sms } from '../shared/Sms';
import { SMS } from '@awesome-cordova-plugins/sms/ngx';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})

export class SmsService {
  smsListRef: AngularFireList<any>;
  smsRef: AngularFireObject<any>;
  smsSent=0;

  constructor(private sms: SMS, private db: AngularFireDatabase) { }

  // Create
  createSms(apt: Sms) {
    return this.smsListRef.push({
      user_id: apt.user_id,
      appointment_id: apt.appointment_id,
      draft: apt.draft,
      sent: apt.sent,
      content: apt.content,
      date: apt.date,
    });
  }

  // Get Single
  getSms(id: string) {
    this.smsRef = this.db.object('/sms/' + id);
    return this.smsRef;
  }

  // Get List
  getSmsList() {
    this.smsListRef = this.db.list('/sms');
    return this.smsListRef;
  }

  // Update
  updateSms(id: any, apt: Sms) {
    return this.smsRef.update({
      user_id: apt.user_id,
      appointment_id: apt.appointment_id,
      draft: apt.draft,
      sent: apt.sent,
      content: apt.content,
      date: apt.date,
    });
  }
  sendSms(mobile:any, content: any){
	  var smsSent=0;
  this.sms.send(mobile, content).then((x)=>{
	                      console.log(x);
			                          smsSent=1;
						              })
							                  .catch(error => window.alert("oops! le sms n'a pas été envoyé!"));
									  return smsSent;

  }

  // Delete
  deleteSms(id: string) {
    this.smsRef = this.db.object('/sms/' + id);
    this.smsRef.remove();
  }
}
