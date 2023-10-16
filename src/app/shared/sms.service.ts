import { Injectable } from '@angular/core';
import { Sms } from '../shared/Sms';
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

  constructor(private db: AngularFireDatabase) { }

  // Create
  createSms(apt: Sms) {
    return this.smsListRef.push({
      user_id: apt.user_id,
      appointment_id: apt.appointment_id,
      draft: apt.draft,
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
      content: apt.content,
      date: apt.date,
    });
  }

  // Delete
  deleteSms(id: string) {
    this.smsRef = this.db.object('/sms/' + id);
    this.smsRef.remove();
  }
}
