import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { StepIndicatorComponent } from './components/step-indicator/step-indicator.component';

@Component({
  selector: 'app-multi-step-form',
  standalone: true,
  imports: [StepIndicatorComponent, CommonModule],
  templateUrl: './multi-step-form.component.html',
  styleUrl: './multi-step-form.component.scss'
})
export class MultiStepFormComponent {
  steps = [
    { number: 1, desc: 'Your Info' },
    { number: 2, desc: 'Select Plan' },
    { number: 3, desc: 'Add-ons' },
    { number: 4, desc: 'Summary' }
  ];
  activeStep: number = 1;

  nextStep() {
    if (this.activeStep < this.steps.length) {
      this.activeStep++;
    }
  }

  previousStep() {
    if (this.activeStep > 1) {
      this.activeStep--;
    }
  }
}
