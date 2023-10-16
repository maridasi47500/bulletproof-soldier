import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditSmsPage } from './edit-sms.page';

describe('EditSmsPage', () => {
  let component: EditSmsPage;
  let fixture: ComponentFixture<EditSmsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditSmsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
