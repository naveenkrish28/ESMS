import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderviewComponent } from './renderview.component';

describe('RenderviewComponent', () => {
  let component: RenderviewComponent;
  let fixture: ComponentFixture<RenderviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenderviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
