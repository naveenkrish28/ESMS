import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesetupComponent } from './pagesetup.component';

describe('PagesetupComponent', () => {
  let component: PagesetupComponent;
  let fixture: ComponentFixture<PagesetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagesetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
