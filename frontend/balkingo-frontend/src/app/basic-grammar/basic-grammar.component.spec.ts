import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicGrammarComponent } from './basic-grammar.component';

describe('BasicGrammarComponent', () => {
  let component: BasicGrammarComponent;
  let fixture: ComponentFixture<BasicGrammarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicGrammarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicGrammarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
