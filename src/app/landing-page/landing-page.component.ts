import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { AboutMeComponent } from '../about-me/about-me.component';
import { SkillsComponent } from '../skills/skills.component';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { ReferencesComponent } from '../references/references.component';
import { ContactComponent } from '../contact/contact.component';
import { LanguageService } from '../services/language.service';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, HeroComponent, AboutMeComponent, SkillsComponent, PortfolioComponent, ReferencesComponent, ContactComponent, RouterOutlet, RouterModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
/**
 * LandingPageComponent serves as the main landing page of the application.
 * It integrates various components and manages the language selection.
 */
export class LandingPageComponent {

  /**
   * The currently selected language, defaulting to 'EN'.
   * @type {string}
   */
  selectedLanguage: string = 'EN';

  /**
   * Initializes the LandingPageComponent.
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

