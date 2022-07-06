import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLangueFormComponent } from './add-langue-form.component';

describe('AddLangueFormComponent', () => {
  let component: AddLangueFormComponent;
  let fixture: ComponentFixture<AddLangueFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLangueFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLangueFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
