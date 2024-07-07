import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { ControlContainer, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-step-one',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './step-one.component.html',
  styleUrl: './step-one.component.scss',
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true })
    }
  ],
})
export class StepOneComponent {
  @Input({ required: true }) controlKey = '';
  parentContainer = inject(ControlContainer);
  fieldLabels = ['Name', 'Email Address', 'Phone Number'];
  placeholders = ['e.g. Stephen King', 'e.g. stephenking@lorem.com', 'e.g. +1 234 567 890'];
  get parentFormGroup() {
    return this.parentContainer.control as FormGroup;
  }
  ngOnInit() {
    this.parentFormGroup.addControl(this.controlKey, new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^\+?1?\d{9,15}$/)])
    }));
  }
  ngOnDestroy() {
    this.parentFormGroup.removeControl(this.controlKey);
  }

  shouldShowError(controlName: string): boolean {
    const control = this.parentFormGroup.get(`${this.controlKey}.${controlName}`);
    return control?.touched && control?.invalid ? true : false;
  }

  getErrorMessage(controlName: string): string | null {
    const control = this.parentFormGroup.get(`${this.controlKey}.${controlName}`);
    if (control && control.touched) {
      if (control.errors?.['required']) {
        return 'This field is required';
      } else if (control.errors?.['minlength']) {
        return `Minimum length is ${control.errors['minlength'].requiredLength}`;
      } else if (control.errors?.['email']) {
        return 'Please enter a valid email';
      } else if (control.errors?.['pattern']) {
        return 'Please enter a valid phone number';
      }
    }
    return null;
  }
}
