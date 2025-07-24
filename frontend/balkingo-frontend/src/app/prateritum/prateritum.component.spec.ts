import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrateritumComponent } from './prateritum.component';

describe('PrateritumComponent', () => {
  let component: PrateritumComponent;
  let fixture: ComponentFixture<PrateritumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrateritumComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrateritumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
