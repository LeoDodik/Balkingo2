import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVerbsComponent } from './modal-verbs.component';

describe('ModalVerbsComponent', () => {
  let component: ModalVerbsComponent;
  let fixture: ComponentFixture<ModalVerbsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalVerbsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalVerbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
