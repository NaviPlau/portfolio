import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/**
 * Service for managing and providing the current language selection in the application.
 * It uses a BehaviorSubject to keep track of the selected language and provides
 * methods to toggle and retrieve the current language.
 */
export class LanguageService {
  private languageSubject = new BehaviorSubject<string>('EN');
  selectedLanguage$ = this.languageSubject.asObservable();

  /**
   * Constructs a LanguageService instance.
   */
  constructor() {}

  /**
   * Toggles the current language between 'EN' and 'DE'.
   * Updates the languageSubject with the new language.
   */
  toggleLanguage() {
    const currentLanguage = this.languageSubject.getValue();
    const newLanguage = currentLanguage === 'EN' ? 'DE' : 'EN';
    this.languageSubject.next(newLanguage);
  }

  /**
   * Retrieves the currently selected language.
   * @returns The current language ('EN' or 'DE').
   */
  getSelectedLanguage(): string {
    return this.languageSubject.getValue();
  }
}
