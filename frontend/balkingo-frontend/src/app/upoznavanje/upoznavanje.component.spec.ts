import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpoznavanjeComponent } from './upoznavanje.component';

describe('UpoznavanjeComponent', () => {
  let component: UpoznavanjeComponent;
  let fixture: ComponentFixture<UpoznavanjeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpoznavanjeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpoznavanjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
