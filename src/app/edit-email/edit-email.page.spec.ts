import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditEmailPage } from './edit-email.page';

describe('EditEmailPage', () => {
  let component: EditEmailPage;
  let fixture: ComponentFixture<EditEmailPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditEmailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
