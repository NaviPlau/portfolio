import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
/**
 * Displays a list of skills with their corresponding images and text.
 * Manages language selection updates through LanguageService.
 */
export class SkillsComponent {
  currentLanguage: string = 'EN';

  /**
   * Constructs a SkillsComponent instance.
   * Subscribes to the LanguageService to update the currentLanguage property.
   * @param languageService The service for managing language selection.
   */
  constructor(private languageService: LanguageService) {
    this.languageService.selectedLanguage$.subscribe(language => {
      this.currentLanguage = language;
    });
  }

  /**
   * Array of skill objects, each containing an image source and text description.
   */
  skills = [
    { src: 'assets/img/skills/skill3.png', text: 'HTML' },
    { src: 'assets/img/skills/skill4.png', text: 'CSS' },
    { src: 'assets/img/skills/skill5.png', text: 'Firebase' },
    { src: 'assets/img/skills/skill6.png', text: 'GIT' },
    { src: 'assets/img/skills/skill0.png', text: 'Angular' },
    { src: 'assets/img/skills/skill1.png', text: 'Typescript' },
    { src: 'assets/img/skills/skill2.png', text: 'JavaScript' },
    { src: 'assets/img/skills/skill7.png', text: 'Rest-Api' },
    { src: 'assets/img/skills/skill8.png', text: 'Scrum' },
    { src: 'assets/img/skills/skill9.png', text: 'Material Design' },
  ];
}
