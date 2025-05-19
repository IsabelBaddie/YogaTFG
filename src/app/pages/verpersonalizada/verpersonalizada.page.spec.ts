import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerpersonalizadaPage } from './verpersonalizada.page';

describe('VerpersonalizadaPage', () => {
  let component: VerpersonalizadaPage;
  let fixture: ComponentFixture<VerpersonalizadaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VerpersonalizadaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
