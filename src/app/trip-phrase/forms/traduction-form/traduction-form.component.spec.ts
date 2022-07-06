import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraductionFormComponent } from './traduction-form.component';

describe('TraductionFormComponent', () => {
  let component: TraductionFormComponent;
  let fixture: ComponentFixture<TraductionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TraductionFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TraductionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
