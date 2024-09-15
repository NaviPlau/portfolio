import { Component } from '@angular/core';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-inprint',
  standalone: true,
  imports: [],
  templateUrl: './inprint.component.html',
  styleUrl: './inprint.component.scss'
})
/**
 * InprintComponent displays the in-print section of the application and manages the language selection.
 */
export class InprintComponent {
  
  /**
   * The currently selected language, defaulting to 'EN'.
   * @type {string}
   */
  selectedLanguage: string = 'EN';

  /**
   * Initializes the InprintComponent.
   * Subscribes to the language service to update the selected language.
   * 
   * @param {LanguageService} languageService - Service for handling language selection.
   */
  constructor(private languageService: LanguageService) {
    this.languageService.selectedLanguage$.subscribe(language => {
      this.selectedLanguage = language;
    });
  }
}

