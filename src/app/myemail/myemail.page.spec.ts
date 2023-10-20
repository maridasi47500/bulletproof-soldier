import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyemailPage } from './myemail.page';

describe('MyemailPage', () => {
  let component: MyemailPage;
  let fixture: ComponentFixture<MyemailPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MyemailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
