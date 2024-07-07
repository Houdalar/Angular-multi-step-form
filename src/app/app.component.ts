import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MultiStepFormComponent } from './multi-step-form/multi-step-form.component';
import { CommonModule } from '@angular/common';
import { StepIndicatorComponent } from "./multi-step-form/components/step-indicator/step-indicator.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, MultiStepFormComponent, CommonModule, StepIndicatorComponent]
})
export class AppComponent {
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
