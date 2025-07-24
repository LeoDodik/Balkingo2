import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProslostComponent } from './proslost.component';

describe('ProslostComponent', () => {
  let component: ProslostComponent;
  let fixture: ComponentFixture<ProslostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProslostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProslostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
