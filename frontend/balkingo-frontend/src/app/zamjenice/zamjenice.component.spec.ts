import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZamjeniceComponent } from './zamjenice.component';

describe('ZamjeniceComponent', () => {
  let component: ZamjeniceComponent;
  let fixture: ComponentFixture<ZamjeniceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZamjeniceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZamjeniceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
