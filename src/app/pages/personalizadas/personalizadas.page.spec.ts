import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonalizadasPage } from './personalizadas.page';

describe('PersonalizadasPage', () => {
  let component: PersonalizadasPage;
  let fixture: ComponentFixture<PersonalizadasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalizadasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
