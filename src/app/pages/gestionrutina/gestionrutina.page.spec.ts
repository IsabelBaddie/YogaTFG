import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GestionrutinaPage } from './gestionrutina.page';

describe('GestionrutinaPage', () => {
  let component: GestionrutinaPage;
  let fixture: ComponentFixture<GestionrutinaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionrutinaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
