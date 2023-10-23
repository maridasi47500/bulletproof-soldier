import { Injectable } from '@angular/core';
import { Email } from '../shared/Email';
import { AppointmentService } from '../shared/appointment.service';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { EmailComposer } from '@ionic-native/email-composer';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})

export class EmailService {
  emailListRef: AngularFireList<any>;
  emailRef: AngularFireObject<any>;
    to:any="";
    cc:any="";
    bcc:any="";
    attachment:any="";
    subject:any="";
    mybody:any="";
    user:any={};

  constructor(private aptService: AppointmentService,private auth: Auth,private db: AngularFireDatabase, private emailComposer: EmailComposer) {
	  this.user=this.auth.currentUser;

 
  }

  // Create
  createEmail(apt: Email) {
    return this.emailListRef.push({
      user_id: apt.user_id,
      appointment_id: apt.appointment_id,
      draft: apt.draft,
      sent: apt.sent,
      subject: apt.subject,
      content: apt.content,
      date: apt.date,
    });
  }
  sendEmail(appointment_id:any, user_id:any, subject:any, content:any): void {
    // Use the plugin isAvailable method to check whether
	  this.aptService.getBooking(appointment_id).valueChanges().subscribe(res => {
		  this.to=res.email;
		  this.cc=res.email;
		  this.bcc=res.email;
	  });
	  this.subject=subject;
	  this.mybody=subject;
	  this.attachment="";
    // the user has configured an email account
    this.emailComposer.isAvailable()
      .then((available: boolean) => {

        // Check that plugin has been granted access permissions to 
        // user's e-mail account
        this.emailComposer.hasPermission()
          .then((isPermitted: boolean) => {

            // Define an object containing the 
            // keys/values for populating the device 
            // default mail fields when a new message 
            // is created
            let email: any = {
              app: 'mailto',
              to: this.to,
              cc: this.cc,
              bcc: this.bcc,
              attachments: [
                this.attachment
              ],
              subject: this.subject,
              body: this.mybody
            };

            // Open the device e-mail client and create 
            // a new e-mail message populated with the 
            // object containing our message data
            this.emailComposer.open(email);
          })
          .catch((error: any) => {
            console.log('No access permission granted');
            console.dir(error);
          });
      })
      .catch((error: any) => {
        console.log('User does not appear to have device e-mail account');
        console.dir(error);
      });
  }

  // Get Single
  getEmail(id: string) {
    this.emailRef = this.db.object('/email/' + id);
    return this.emailRef;
  }

  // Get List
  getEmailList() {
    this.emailListRef = this.db.list('/email');
    return this.emailListRef;
  }

  // Update
  updateEmail(id: any, apt: Email) {
    return this.emailRef.update({
      user_id: apt.user_id,
      appointment_id: apt.appointment_id,
      draft: apt.draft,
      sent: apt.sent,
      subject: apt.subject,
      content: apt.content,
      date: apt.date,
    });
  }

  // Delete
  deleteEmail(id: string) {
    this.emailRef = this.db.object('/email/' + id);
    this.emailRef.remove();
  }
}
