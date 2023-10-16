import { Component, OnInit } from '@angular/core';
import { Sms } from '../shared/Sms';
import { SmsService } from './../shared/sms.service';

@Component({
  selector: 'app-mysms',
  templateUrl: 'mysms.page.html',
  styleUrls: ['mysms.page.scss'],
})
export class MysmsPage implements OnInit {
  Sms: any = [];

  constructor(private aptService: SmsService) { }

  ngOnInit() {
    this.fetchSms();
    let smsRes = this.aptService.getSmsList();
    smsRes.snapshotChanges().subscribe((res) => {
      this.Sms = [];
      res.forEach((item) => {
        let a: any = item.payload.toJSON();
        a['$key'] = item.key;
        this.Sms.push(a as Sms);
      });
    });
  }

  fetchSms() {
    this.aptService
      .getSmsList()
      .valueChanges()
      .subscribe((res) => {
        console.log(res);
      });
  }

  deleteSms(id: any) {
    console.log(id);
    if (window.confirm('Do you really want to delete?')) {
      this.aptService.deleteSms(id);
    }
  }
}
