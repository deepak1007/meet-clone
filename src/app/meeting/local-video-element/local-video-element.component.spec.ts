import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalVideoElementComponent } from './local-video-element.component';

describe('LocalVideoElementComponent', () => {
  let component: LocalVideoElementComponent;
  let fixture: ComponentFixture<LocalVideoElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalVideoElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalVideoElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
