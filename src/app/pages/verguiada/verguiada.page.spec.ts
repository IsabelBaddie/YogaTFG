import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerguiadaPage } from './verguiada.page';

describe('VerguiadaPage', () => {
  let component: VerguiadaPage;
  let fixture: ComponentFixture<VerguiadaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VerguiadaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
