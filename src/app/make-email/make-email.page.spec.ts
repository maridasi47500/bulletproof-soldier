import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MakeEmailPage } from './make-email.page';

describe('MakeEmailPage', () => {
  let component: MakeEmailPage;
  let fixture: ComponentFixture<MakeEmailPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MakeEmailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
