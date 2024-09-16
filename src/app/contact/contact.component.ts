import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LanguageService } from '../services/language.service';
import { HttpClient } from '@angular/common/http';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
/**
 * ContactComponent handles the contact form submission process and manages language changes.
 */
export class ContactComponent {

  contactForm: FormGroup;
  currentLanguage: string = 'EN';
  showSuccessMessage: boolean = false;
  formVisible: boolean = true;
  mailTest: boolean = false;

  /**
   * Initializes the ContactComponent.
   * Sets up the contact form and subscribes to the language service for language changes.
   * 
   * @param {FormBuilder} fb - Service to build the form controls and validators.
   * @param {LanguageService} languageService - Service for handling language selection.
   * @param {HttpClient} http - HTTP client for sending form data to the backend.
   */
  constructor(private fb: FormBuilder, private languageService: LanguageService, private http: HttpClient) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
      privacyPolicy: [false, Validators.requiredTrue]
    });
    
    this.languageService.selectedLanguage$.subscribe(language => {
      this.currentLanguage = language;
    });
  }

  /**
   * Submits the contact form if valid, handles form visibility, and sends the data.
   */
  onSubmit(): void {
    if (this.isFormValid()) {
      this.handleFormVisibility();
      this.sendFormData();
    }
  }
  
  /**
   * Checks if the contact form is valid.
   * @returns {boolean} Returns true if the form is valid, false otherwise.
   */
  isFormValid(): boolean {
    return this.contactForm.valid;
  }
  
  /**
   * Toggles the visibility of the form and displays the success message.
   */
  handleFormVisibility(): void {
    this.formVisible = false;
    this.showSuccessMessage = true;
  }
  
  /**
   * Sends the contact form data to the server.
   */
  sendFormData(): void {
    this.http.post(this.post.endPoint, this.getRequestBody(), this.post.options)
      .subscribe({
        next: () => this.handleSuccessResponse(),
        complete: () => this.handleComplete(),
      });
  }
  
  /**
   * Prepares the request body by converting the form data into JSON format.
   * @returns {string} The stringified contact form data.
   */
  getRequestBody(): string {
    return this.post.body(this.contactForm.value);
  }
  
  /**
   * Handles the success response after the form is submitted, resetting the form after a delay.
   */
  handleSuccessResponse(): void {
    setTimeout(() => {
      this.resetFormAndVisibility();
    }, 5500);
  }
  
  /**
   * Resets the form and restores the visibility after form submission.
   */
  resetFormAndVisibility(): void {
    this.formVisible = true;
    this.showSuccessMessage = false;
    this.contactForm.reset();
  }
  
  /**
   * Handles completion of the form submission process. Currently, no specific actions are taken.
   */
  handleComplete(): void {
    // No additional actions on completion
  }
  
  /**
   * Configuration object for the HTTP POST request, defining the endpoint, request body, and headers.
   */
  post = {
    endPoint: 'https://paul-ivan.com/sendMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'application/json',
        responseType: 'text',
      },
    },
  };

}