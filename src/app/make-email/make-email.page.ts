import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EmailService } from './../shared/email.service';
import { Email } from './../shared/Email';
import { AppointmentService } from './../shared/email.service';
import { ActivatedRoute, Router } from "@angular/router";
import { Auth } from '@angular/fire/auth';
import { SMS } from '@awesome-cordova-plugins/email/ngx';


@Component({
  selector: 'app-make-email',
  templateUrl: './make-email.page.html',
  styleUrls: ['./make-email.page.scss'],
})
export class MakeEmailPage implements OnInit {
 user emailForm: FormGroup;
 myvalue:any;
  user:any;
  email:any;
  user_id:any;
  myid:any;
  username:any;
  Email: any =[];

  constructor(
	  private email: SMS,
    private emailService: EmailService,
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
									                                                                        this.email=res;
																		                                                                          });
 
  }

  ngOnInit() {
    var mydate=new Date();
    this.emailForm = this.fb.group({
      user_id: [this.myid],
      email_id: [this.user_id],
      draft: [1],
      sent: [0],
      subject: [''],
      content: [''],
      date: [mydate],
    });
        this.fetchEmail();
	    let emailRes = this.emailService.getEmailList();
	        emailRes.snapshotChanges().subscribe((res) => {
			      this.Email = [];
			            res.forEach((item) => {
					            let a: any = item.payload.toJSON();
						            a['$key'] = item.key;
							    if (a.user_id===this.myid && a.email_id === this.user_id){
							            this.Email.push(a as Email);
							    }
								          });
									      });
  }
  formSubmit() {
    if (!this.emailForm.valid) {
      return false;
    } else {
      return this.emailService
        .createEmail(this.emailForm.value)
        .then((res) => {
          console.log(res);
          this.emailForm.reset();
          this.router.navigate(['/myemail']);
        })
        .catch((error) => console.log(error));
    }
  }
  sendEmail() {
    if (!this.emailForm.valid) {
      return false;
    } else {
	    this.myvalue=this.emailForm.value;
	    this.myvalue.draft=0;


	    this.myvalue.sent=this.emailService.sendEmail(this.myvalue.appointment_id, this.myid, this.myvalue.subject, this.myvalue.content);

      return this.emailService
        .createEmail(this.myvalue)
        .then((res) => {
          console.log(res);
          this.emailForm.reset();
          this.router.navigate(['/home']);
        })
        .catch((error) => console.log(error));
    }
  }

    fetchEmail() {
	        this.emailService
		      .getEmailList()
		            .valueChanges()
			          .subscribe((res: any) => {
					          console.log(res);
						        });
							  }

}
