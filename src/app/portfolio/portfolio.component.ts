import { CommonModule } from '@angular/common';
import { Component, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { LanguageService } from '../services/language.service';
import { Project } from '../interfaces/project';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
/**
 * PortfolioComponent displays and manages project details in the portfolio section.
 * It includes functionality for selecting and navigating between projects, handling overlay visibility, and managing language changes.
 */
export class PortfolioComponent {
  hoveredProject: string = '';
  selectedProject: string | null = null;
  currentLanguage: string = 'EN';

  /**
   * Data for projects in different languages.
   * @type {Object}
   */
  projectsData: { [key: string]: Project } = {
    join: {
      EN: {
        number: '01',
        title: 'Join',
        description: 'Task manager inspired by the Kanban System. Create and organize tasks using drag and drop functions, assign users and categories.',
        icons: ['CSS', 'HTML', 'Firebase', 'Angular', 'TypeScript'],
        image: 'assets/img/projects/join.png',
        githubLink: 'https://github.com/NaviPlau/join',
        liveLink: 'https://join.paul-ivan.com/index.html'
      },
      DE: {
        number: '01',
        title: 'Join',
        description: 'Task-Manager inspiriert vom Kanban-System. Erstelle und organisiere Aufgaben mit Drag-and-Drop-Funktionen, weise Benutzern und Kategorien zu.',
        icons: ['CSS', 'HTML', 'Firebase', 'Angular', 'TypeScript'],
        image: 'assets/img/projects/join.png',
        githubLink: 'https://github.com/NaviPlau/join',
        liveLink: 'https://join.paul-ivan.com/index.html'
      }
    },
    elPolloloco: {
      EN: {
        number: '02',
        title: 'El PolloLoco',
        description: 'A fun JavaScript game that challenges players to navigate through obstacles and enemies.',
        icons: ['JavaScript', 'HTML', 'CSS'],
        image: 'assets/img/projects/elpolloloco.png',
        githubLink: 'https://github.com/NaviPlau/ElPolloLoco',
        liveLink: 'https://el-pollo-loco.paul-ivan.com/index.html'
      },
      DE: {
        number: '02',
        title: 'El PolloLoco',
        description: 'Ein lustiges JavaScript-Spiel, das Spieler herausfordert, Hindernisse und Feinde zu überwinden.',
        icons: ['JavaScript', 'HTML', 'CSS'],
        image: 'assets/img/projects/elpolloloco.png',
        githubLink: 'https://github.com/NaviPlau/ElPolloLoco',
        liveLink: 'https://el-pollo-loco.paul-ivan.com/index.html'
      }
    },
    daBubble: {
      EN: {
        number: '03',
        title: 'DA Bubble',
        description: 'A social platform built with Angular and Firebase that allows users to communicate in real-time.',
        icons: ['Angular', 'Firebase', 'TypeScript'],
        image: 'assets/img/projects/dabubble.png',
        githubLink: 'https://da-bubble.paul-ivan.com/index.htm',
        liveLink: 'https://da-bubble.paul-ivan.com/index.htm'
      },
      DE: {
        number: '03',
        title: 'DA Bubble',
        description: 'Eine soziale Plattform, die mit Angular und Firebase gebaut wurde und es Benutzern ermöglicht, in Echtzeit zu kommunizieren.',
        icons: ['Angular', 'Firebase', 'TypeScript'],
        image: 'assets/img/projects/dabubble.png',
        githubLink: 'https://da-bubble.paul-ivan.com/index.htm',
        liveLink: 'https://da-bubble.paul-ivan.com/index.htm'
      }
    }
  };

  /**
   * Initializes the PortfolioComponent and subscribes to the language service to update the selected language.
   * 
   * @param {Document} document - The document object to interact with the DOM.
   * @param {LanguageService} languageService - Service for handling language selection.
   */
  constructor(@Inject(DOCUMENT) private document: Document, private languageService: LanguageService) {
    this.languageService.selectedLanguage$.subscribe(language => {
      this.currentLanguage = language;
    });
  }

  /**
   * Returns the image URL for a given icon.
   * 
   * @param {string} icon - The name of the icon.
   * @returns {string} The URL of the icon image.
   */
  getIconImage(icon: string): string {
    switch (icon.toLowerCase()) {
      case 'css':
        return 'assets/img/projects/overlay/overlayCSS.png';
      case 'html':
        return 'assets/img/projects/overlay/overlayHTML.png';
      case 'firebase':
        return 'assets/img/projects/overlay/overlayFB.png';
      case 'angular':
        return 'assets/img/projects/overlay/overlayAngular.png';
      case 'typescript':
        return 'assets/img/projects/overlay/overlayTS.png';
      case 'javascript':
        return 'assets/img/projects/overlay/overlayJS.png';
      default:
        return '';
    }
  }

  /**
   * Returns an array of project keys.
   * 
   * @returns {string[]} An array of project keys.
   */
  get projectKeys(): string[] {
    return Object.keys(this.projectsData);
  }

  /**
   * Calculates the index of the next project in the list.
   * 
   * @returns {number} The index of the next project.
   */
  get nextProjectIndex(): number {
    const currentIndex = this.projectKeys.indexOf(this.selectedProject || '');
    return (currentIndex + 1) % this.projectKeys.length;
  }

  /**
   * Returns the ID of the next project.
   * 
   * @returns {string} The ID of the next project.
   */
  get nextProject(): string {
    return this.projectKeys[this.nextProjectIndex];
  }

  /**
   * Sets the selected project to the given project ID.
   * 
   * @param {string} project - The ID of the project to select.
   */
  selectProject(project: string) {
    this.selectedProject = project;
  }

  /**
   * Selects the next project in the list.
   */
  goToNextProject() {
    this.selectedProject = this.nextProject;
  }

  /**
   * Closes the overlay if a click is detected outside of it.
   * 
   * @param {MouseEvent} event - The click event.
   */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const overlay = this.document.querySelector('.overlay');

    if (this.selectedProject && overlay && !overlay.contains(target)) {
      this.closeOverlay();
    }
  }

  /**
   * Prevents click events from propagating when clicking on the overlay itself.
   * 
   * @param {MouseEvent} event - The click event.
   */
  onOverlayClick(event: MouseEvent) {
    event.stopPropagation();
  }

  /**
   * Closes the overlay by deselecting the current project.
   */
  closeOverlay() {
    this.selectedProject = null;
  }
}

