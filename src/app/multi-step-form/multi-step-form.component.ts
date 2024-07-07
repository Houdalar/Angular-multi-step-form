import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { StepIndicatorComponent } from './components/step-indicator/step-indicator.component';
import { StepOneComponent } from './components/steps/step-one/step-one.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { StepTwoComponent } from './components/steps/step-two/step-two.component';

@Component({
  selector: 'app-multi-step-form',
  standalone: true,
  imports: [CommonModule, StepOneComponent, ReactiveFormsModule, StepTwoComponent],
  templateUrl: './multi-step-form.component.html',
  styleUrl: './multi-step-form.component.scss'
})
export class MultiStepFormComponent {
  form = new FormGroup({});
  submit() {
    console.log(this.form.value);
    this.form.reset();
  }
}
