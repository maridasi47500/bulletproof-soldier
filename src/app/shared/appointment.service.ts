import { Injectable } from '@angular/core';
import { Appointment } from '../shared/Appointment';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  bookingListRef: AngularFireList<any>;
  bookingRef: AngularFireObject<any>;
  constructor(private db: AngularFireDatabase) { }
  // Create
  createBooking(apt: Appointment) {
	  console.log(apt);
    console.log(this.bookingListRef);
    return this.bookingListRef.push({
      name: apt.name,
      email: apt.email,
      user_id: apt.user_id,
      mobile: apt.mobile
    });
  }
  // Get Single
  getBooking(id: string) {
    this.bookingRef = this.db.object('/appointment/' + id);
    return this.bookingRef;
  }
  // Get List
  getBookingList() {
    this.bookingListRef = this.db.list('/appointment');
    return this.bookingListRef;
  }
  // Update
  updateBooking(id: any, apt: Appointment) {
    return this.bookingRef.update({
      name: apt.name,
      email: apt.email,
      user_id: apt.user_id,
      mobile: apt.mobile
    });
  }
  // Delete
  deleteBooking(id: string) {
    this.bookingRef = this.db.object('/appointment/' + id);
    this.bookingRef.remove();
  }
}
