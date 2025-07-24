import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Futur1Component } from './futur1.component';

describe('Futur1Component', () => {
  let component: Futur1Component;
  let fixture: ComponentFixture<Futur1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Futur1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Futur1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
