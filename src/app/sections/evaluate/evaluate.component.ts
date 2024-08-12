import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { HttpClient } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ContactFormControls } from './evaluate.enums';
import { KButtonComponent } from '../../components/k-button/k-button.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-evaluate',
  standalone: true,
  imports: [
    CommonModule,
    InputGroupModule,
    InputGroupAddonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    RippleModule,
    KButtonComponent,
    ToastModule,
  ],
  templateUrl: './evaluate.component.html',
  styleUrl: './evaluate.component.scss',
})
export class EvaluateComponent implements OnInit {
  private url =
    'https://script.google.com/macros/s/AKfycby6SCYqcMWwzZLkjOXy1Ygoed682jw6z1-YNsK-Zd1oY-N1fWt9OhNTrW0oVGBco_6PHQ/exec';

  loading = false;
  alreadySubmitted = false;

  constructor(
    private readonly http: HttpClient,
    private readonly formBuilder: FormBuilder,
    private readonly messageService: MessageService,
  ) {}

  contactFormControls = ContactFormControls;
  contactForm!: FormGroup;

  private getFormData(): any {
    const formData: any = {};
    const formControls = this.contactForm.controls;

    Object.keys(formControls).forEach((key) => {
      const control = formControls[key];
      formData[key] = control.value;

      if (control instanceof FormGroup) {
        const nestedGroup = this.getFormDataNested(control);
        formData[key] = nestedGroup;
      }
    });

    formData.formDataNameOrder = JSON.stringify(Object.keys(formData));
    formData.formGoogleSheetName = 'responses'; // Default sheet name
    formData.formGoogleSendEmail = ''; // Default email value

    return formData;
  }

  private getFormDataNested(formGroup: FormGroup): any {
    const nestedData: any = {};
    const controls = formGroup.controls;

    Object.keys(controls).forEach((key) => {
      nestedData[key] = controls[key].value;
    });

    return nestedData;
  }

  submitForm(): void {
    if (this.contactForm.valid) {
      const formattedData = this.getFormData();
      const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
      const body = new URLSearchParams(formattedData).toString();

      this.loading = true;
      this.http.post(this.url, body, { headers }).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Your message has been sent.',
          });
          this.contactForm.reset();
          this.loading = false;
          this.alreadySubmitted = true;
        },
        error: (e) => {
          console.log(e);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'An error occurred while sending your message.',
          });
          this.loading = false;
        },
      });
    }
  }
  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      [ContactFormControls.FIRST_NAME]: [
        '',
        { validators: [Validators.required] },
      ],
      [ContactFormControls.LAST_NAME]: [
        '',
        { validators: [Validators.required] },
      ],
      [ContactFormControls.PHONE]: ['', { validators: [Validators.required] }],
      [ContactFormControls.EMAIL]: ['', { validators: [Validators.required] }],
      [ContactFormControls.DETAILS]: [
        '',
        { validators: [Validators.required] },
      ],
    });
  }
}
