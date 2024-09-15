import { Component } from '@angular/core';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [],
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
/**
 * PrivacyPolicyComponent displays the privacy policy information.
 * It includes functionality for managing and displaying content based on the selected language.
 */
export class PrivacyPolicyComponent {
  /**
   * The currently selected language.
   * 
   * @type {string}
   */
  selectedLanguage: string = 'EN';

  /**
   * Initializes the PrivacyPolicyComponent and subscribes to the language service to update the selected language.
   * 
   * @param {LanguageService} languageService - Service for handling language selection.
   */
  constructor(private languageService: LanguageService) {
    this.languageService.selectedLanguage$.subscribe(language => {
      this.selectedLanguage = language;
    });
  }
}
