import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { ControlContainer, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';


@Component({
  selector: 'app-step-two',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,MatSlideToggleModule,FormsModule ],
  templateUrl: './step-two.component.html',
  styleUrl: './step-two.component.scss',
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true })
    }
  ],
})
export class StepTwoComponent {
  @Input({ required: true }) controlKey = '';
  parentContainer = inject(ControlContainer);
  plans = [
    { id: 'arcade', name: 'Arcade', monthly: '$10/mo', yearly: '$90/yr', perks: '2 months free', icon: '/assets/images/icon-arcade.svg' },
    { id: 'advanced', name: 'Advanced', monthly: '$15/mo', yearly: '$120/yr', perks: '2 months free', icon: '/assets/images/icon-advanced.svg'  },
    { id: 'pro', name: 'Pro', monthly: '$20/mo', yearly: '$150/yr', perks: '2 months free', icon: '/assets/images/icon-pro.svg' }
  ];
  billingType = 'Monthly';
  isYearly: boolean = false;
  get parentFormGroup() {
    return this.parentContainer.control as FormGroup;
  }

  ngOnInit() {
    this.parentFormGroup.addControl(this.controlKey, new FormGroup({
        selectedPlan: new FormControl(''), 
        billingCycleControl: new FormControl(this.billingType === 'Yearly')
    }));
    
    this.parentContainer.control?.get(this.controlKey)?.get('billingCycleControl')?.valueChanges.subscribe(value => {
      this.isYearly = value;
    });
}


  ngOnDestroy() {
    this.parentFormGroup.removeControl(this.controlKey);
  }

  get currentPlan() {
    return this.plans.find(plan => plan.id === this.parentFormGroup.get('selectedPlan')?.value);
  }

  updateBillingType() {
    const isYearly = this.parentContainer.control!.get(this.controlKey)?.get('billingCycleControl')?.value;
    this.billingType = isYearly ? 'Yearly' : 'Monthly';
    this.parentContainer.control!.get(this.controlKey)?.get('selectedPlan')?.setValue(this.billingType);
  }

  onBillingTypeChange() {
    const toggleControl = this.parentContainer.control!.get(this.controlKey)?.get('billingCycleControl');
    toggleControl?.setValue(!toggleControl.value);
    this.updateBillingType();
  }
}
