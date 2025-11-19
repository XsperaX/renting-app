import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CochesPage } from './coches.page';

describe('CochesPage', () => {
  let component: CochesPage;
  let fixture: ComponentFixture<CochesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CochesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
