import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MultiStepFormComponent } from './multi-step-form/components/multi-step-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MultiStepFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Multi-step-form';
}
