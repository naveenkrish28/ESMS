import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicsectionComponent } from './dynamicsection.component';

describe('DynamicsectionComponent', () => {
  let component: DynamicsectionComponent;
  let fixture: ComponentFixture<DynamicsectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicsectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicsectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
