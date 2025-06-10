import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LektionComponent } from './lektion.component';

describe('LektionComponent', () => {
  let component: LektionComponent;
  let fixture: ComponentFixture<LektionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LektionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LektionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
