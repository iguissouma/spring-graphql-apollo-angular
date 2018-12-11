import { FormsModule } from '@angular/forms';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CovalentDialogsModule } from '@covalent/core';

import { GraphQLModule } from '../../graphql.module';
import { MaterialModule } from '../../material.module';

import { CarEditComponent } from './car-edit.component';

describe('CarEditComponent', () => {
  let component: CarEditComponent;
  let fixture: ComponentFixture<CarEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CarEditComponent],
      imports: [
        FormsModule,
        RouterTestingModule,

        CovalentDialogsModule,
        GraphQLModule,
        MaterialModule,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
