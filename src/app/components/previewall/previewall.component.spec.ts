import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewallComponent } from './previewall.component';

describe('PreviewallComponent', () => {
  let component: PreviewallComponent;
  let fixture: ComponentFixture<PreviewallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
