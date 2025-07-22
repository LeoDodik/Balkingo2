import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularVerbsComponent } from './regular-verbs.component';

describe('RegularVerbsComponent', () => {
  let component: RegularVerbsComponent;
  let fixture: ComponentFixture<RegularVerbsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegularVerbsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegularVerbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
