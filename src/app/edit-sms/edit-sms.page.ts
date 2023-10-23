import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";
import { SmsService } from './../shared/sms.service';
import { Auth } from '@angular/fire/auth';
@Component({
  selector: 'app-edit-sms',
  templateUrl: './edit-sms.page.html',
  styleUrls: ['./edit-sms.page.scss'],
})
export class EditSmsPage implements OnInit {
  updateSmsForm: FormGroup;
  id: any;
  constructor(
    private aptService: SmsService,
    private actRoute: ActivatedRoute,
    private router: Router,
    public fb: FormBuilder
  ) {
    this.id = this.actRoute.snapshot.paramMap.get('id');
    this.aptService.getSms(this.id).valueChanges().subscribe((res:any) => {
      this.updateSmsForm.setValue(res);
    });
  }
  ngOnInit() {
    this.updateSmsForm = this.fb.group({
      date: [''],
      content: [''],
      user_id: [''],
      appointment_id: [''],
      draft: [''],
      sent: ['']
    })
    console.log(this.updateSmsForm.value)
  }
  updateForm() {
    this.aptService.updateSms(this.id, this.updateSmsForm.value)
      .then(() => {
        this.router.navigate(['/home']);
      })
      .catch((error:any) => console.log(error));
  }
}
