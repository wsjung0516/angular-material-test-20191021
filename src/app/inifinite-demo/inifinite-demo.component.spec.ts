import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InifiniteDemoComponent } from './inifinite-demo.component';

describe('InifiniteDemoComponent', () => {
  let component: InifiniteDemoComponent;
  let fixture: ComponentFixture<InifiniteDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InifiniteDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InifiniteDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
