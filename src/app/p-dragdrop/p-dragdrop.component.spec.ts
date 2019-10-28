import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PDragdropComponent } from './p-dragdrop.component';

describe('PDragdropComponent', () => {
  let component: PDragdropComponent;
  let fixture: ComponentFixture<PDragdropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PDragdropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PDragdropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
