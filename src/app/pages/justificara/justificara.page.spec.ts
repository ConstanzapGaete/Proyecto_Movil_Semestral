import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JustificaraPage } from './justificara.page';

describe('JustificaraPage', () => {
  let component: JustificaraPage;
  let fixture: ComponentFixture<JustificaraPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(JustificaraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
