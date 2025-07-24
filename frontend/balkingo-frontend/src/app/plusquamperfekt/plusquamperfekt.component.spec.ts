import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlusquamperfektComponent } from './plusquamperfekt.component';

describe('PlusquamperfektComponent', () => {
  let component: PlusquamperfektComponent;
  let fixture: ComponentFixture<PlusquamperfektComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlusquamperfektComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlusquamperfektComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
