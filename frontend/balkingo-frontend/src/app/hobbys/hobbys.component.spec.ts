import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HobbysComponent } from './hobbys.component';

describe('HobbysComponent', () => {
  let component: HobbysComponent;
  let fixture: ComponentFixture<HobbysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HobbysComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HobbysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
