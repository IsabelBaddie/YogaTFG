import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SobrenosotrosPage } from './sobrenosotros.page';

describe('SobrenosotrosPage', () => {
  let component: SobrenosotrosPage;
  let fixture: ComponentFixture<SobrenosotrosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SobrenosotrosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
