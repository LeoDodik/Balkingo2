import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrojeviComponent } from './brojevi.component';

describe('BrojeviComponent', () => {
  let component: BrojeviComponent;
  let fixture: ComponentFixture<BrojeviComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrojeviComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrojeviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
