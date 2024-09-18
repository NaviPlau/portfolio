import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
/**
 * FooterComponent displays the footer section of the application.
 * It retrieves the current language setting from the LanguageService
 * and provides a method to open the default email client with pre-filled
 * contact details.
 */
export class FooterComponent {
  currentLanguage: string = 'EN';

  /**
   * Constructs a FooterComponent instance.
   * Subscribes to the LanguageService to update the currentLanguage property
   * whenever the selected language changes.
   * @param languageService The service used to manage language selection.
   */
  constructor(private languageService: LanguageService) {
    this.languageService.selectedLanguage$.subscribe(language => {
      this.currentLanguage = language;
    });
  }

  /**
   * Opens the default email client with a pre-filled email.
   * The email includes a subject and body with predefined text.
   */
  mailTo() {
    const email = "naviplau@outlook.com";
    const subject = "Portfolio contact";
    const body = "This email was sent from an Angular app built by Ivan Paul.";
    const mailtoUrl = `mailto:${email}?&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  }
}
