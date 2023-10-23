import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";
import { EmailService } from './../shared/email.service';
import { Auth } from '@angular/fire/auth';
@Component({
  selector: 'app-edit-email',
  templateUrl: './edit-email.page.html',
  styleUrls: ['./edit-email.page.scss'],
})
export class EditEmailPage implements OnInit {
  updateEmailForm: FormGroup;
  id: any;
  constructor(
    private aptService: EmailService,
    private actRoute: ActivatedRoute,
    private router: Router,
    public fb: FormBuilder
  ) {
    this.id = this.actRoute.snapshot.paramMap.get('id');
    this.aptService.getEmail(this.id).valueChanges().subscribe((res:any) => {
      this.updateEmailForm.setValue(res);
    });
  }
  ngOnInit() {
    this.updateEmailForm = this.fb.group({
      date: [''],
      content: [''],
      user_id: [''],
      appointment_id: [''],
      draft: [''],
      subject: [''],
      sent: ['']
    })
    console.log(this.updateEmailForm.value)
  }
  updateForm() {
    this.aptService.updateEmail(this.id, this.updateEmailForm.value)
      .then(() => {
        this.router.navigate(['/home']);
      })
      .catch((error:any) => console.log(error));
  }
}
