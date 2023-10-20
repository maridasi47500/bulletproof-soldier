import { Injectable } from '@angular/core';
import { Email } from '../shared/Email';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { EmailComposer } from '@ionic-native/email-composer';

@Injectable({
  providedIn: 'root',
})

export class EmailService {
  emailListRef: AngularFireList<any>;
  emailRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase,private _EMAIL: EmailComposer) { }

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
     sendEmail(to         : string, 
	                    cc         : string, 
			                 bcc        : string, 
					              attachment : string,
						                   subject    : string,
								                body       : string) : void
										   {
											         // Use the plugin isAvailable method to check whether
											          // the user has configured an email account
											                this._EMAIL.isAvailable()
											                      .then((available: boolean) =>
											                            {
											   
											                                     // Check that plugin has been granted access permissions to 
											                                              // user's e-mail account
											                                                       this._EMAIL.hasPermission()
											                                                                .then((isPermitted : boolean) =>
											                                                                         {
											   
											                                                                                     // Define an object containing the 
											                                                                                                 // keys/values for populating the device 
											                                                                                                             // default mail fields when a new message 
											                                                                                                                         // is created
											                                                                                                                                     let email : any = {
											                                                                                                                                                    app          : 'mailto',
											                                                                                                                                                                   to           : to,
											                                                                                                                                                                                  cc           : cc,
											                                                                                                                                                                                                 bcc          : bcc,
											                                                                                                                                                                                                                attachments  : [
											                                                                                                                                                                                                                                 attachment
											                                                                                                                                                                                                                                                ],
											                                                                                                                                                                                                                                                               subject      : subject,
											                                                                                                                                                                                                                                                                              body         : body
											                                                                                                                                                                                                                                                                                          };
											   
											                                                                                                                                                                                                                                                                                                      // Open the device e-mail client and create 
											                                                                                                                                                                                                                                                                                                                  // a new e-mail message populated with the 
											                                                                                                                                                                                                                                                                                                                              // object containing our message data
											                                                                                                                                                                                                                                                                                                                                          this._EMAIL.open(email);
											                                                                                                                                                                                                                                                                                                                                                   })
											                                                                                                                                                                                                                                                                                                                                                            .catch((error : any) =>
											                                                                                                                                                                                                                                                                                                                                                                     {
											                                                                                                                                                                                                                                                                                                                                                                                 console.log('No access permission granted');
											                                                                                                                                                                                                                                                                                                                                                                                             console.dir(error);
											                                                                                                                                                                                                                                                                                                                                                                                                      });
											                                                                                                                                                                                                                                                                                                                                                                                                            })
											                                                                                                                                                                                                                                                                                                                                                                                                                  .catch((error : any) =>
											                                                                                                                                                                                                                                                                                                                                                                                                                        {
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
