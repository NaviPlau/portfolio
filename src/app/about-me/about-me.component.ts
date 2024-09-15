import { Component } from '@angular/core';
import { LanguageService } from '../services/language.service';
@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss'
})
/**
 * This component displays information about the user in the "About Me" section.
 * It also listens for language changes using the LanguageService.
 */
export class AboutMeComponent {

  /**
   * Stores the currently selected language. Defaults to 'EN'.
   * @type {string}
   */
  currentLanguage: string = 'EN';

  /**
   * Creates an instance of AboutMeComponent.
   * Subscribes to the LanguageService to update the current language dynamically.
   * 
   * @param {LanguageService} languageService - The service that provides the selected language.
   */
  constructor(private languageService: LanguageService) {
    this.languageService.selectedLanguage$.subscribe(language => {
      this.currentLanguage = language;
    });
  }
}
