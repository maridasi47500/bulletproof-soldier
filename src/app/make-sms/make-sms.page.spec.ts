import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MakeSmsPage } from './make-sms.page';

describe('MakeSmsPage', () => {
  let component: MakeSmsPage;
  let fixture: ComponentFixture<MakeSmsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MakeSmsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
