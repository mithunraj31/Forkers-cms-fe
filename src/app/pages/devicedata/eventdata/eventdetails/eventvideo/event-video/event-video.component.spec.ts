import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventVideoComponent } from './event-video.component';

describe('EventVideoComponent', () => {
  let component: EventVideoComponent;
  let fixture: ComponentFixture<EventVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
