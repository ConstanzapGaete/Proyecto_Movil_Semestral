import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PassPage } from './pass.page';

describe('PassPage', () => {
  let component: PassPage;
  let fixture: ComponentFixture<PassPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
