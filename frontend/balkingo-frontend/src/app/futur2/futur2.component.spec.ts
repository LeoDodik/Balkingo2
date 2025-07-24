import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Futur2Component } from './futur2.component';

describe('Futur2Component', () => {
  let component: Futur2Component;
  let fixture: ComponentFixture<Futur2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Futur2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Futur2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
