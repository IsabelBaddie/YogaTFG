import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GuiadasPage } from './guiadas.page';

describe('GuiadasPage', () => {
  let component: GuiadasPage;
  let fixture: ComponentFixture<GuiadasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GuiadasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
