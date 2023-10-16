import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MysmsPage } from './mysms.page';

describe('MysmsPage', () => {
  let component: MysmsPage;
  let fixture: ComponentFixture<MysmsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MysmsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
