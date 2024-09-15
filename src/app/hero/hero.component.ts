import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from "../shared/header/header.component";
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
/**
 * HeroComponent displays the hero section of the application and manages the language selection.
 */
export class HeroComponent {

  /**
   * The currently selected language, defaulting to 'EN'.
   * @type {string}
   */
  selectedLanguage: string = 'EN';

  /**
   * Initializes the HeroComponent.
   * Subscribes to the language service to update the selected language.
   * 
   * @param {LanguageService} languageService - Service for handling language selection.
   */
  constructor(private languageService: LanguageService) {
    this.languageService.selectedLanguage$.subscribe(language => {
      this.selectedLanguage = language;
    });
  }
  
  /**
   * Opens the default email client with a pre-filled email.
   * The email has a predefined recipient, subject, and body.
   */
  mailTo(): void {
    const email = "naviplau@outlook.com";
    const subject = "Portfolio contact";
    const body = "This email was sent from an Angular app built by Ivan Paul.";
    const mailtoUrl = `mailto:${email}?&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  }
}
