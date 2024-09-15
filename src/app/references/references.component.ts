import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { Subscription } from 'rxjs';

interface Reference {
  text: string;
  author: string;
  position: string;
}

@Component({
  selector: 'app-references',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './references.component.html',
  styleUrls: ['./references.component.scss']
})
/**
 * Component for displaying a carousel of references or testimonials.
 * Allows navigation through references using 'Next' and 'Previous' buttons.
 * Updates the display based on the selected language and handles animations.
 */
export class ReferencesComponent implements OnInit, OnDestroy {
  currentIndex = 0;
  isPrevHovered: boolean = false;
  isMovingRight: boolean = false;
  isMovingLeft: boolean = false;
  languageSubscription!: Subscription;
  currentLanguage: 'EN' | 'DE' = 'EN';

  references: Record<'EN' | 'DE', Reference[]> = {
    EN: [
      {
        text: "Paul is an excellent team player and highly committed. Working with Paul has been very beneficial for me personally. He always has a solution at hand and never gives up. He was able to solve every problem quickly. Paul is a kind and helpful person.",
        author: "Tristan S.",
        position: "Team Partner"
      },
      {
        text: "Paul works extremely quickly and efficiently. He is always ready to help and shows a high level of commitment when it comes to providing support. His quick grasp of the topics dealt with is particularly impressive - he understands new issues in a very short time and puts them into practice immediately.",
        author: "David P.",
        position: "Team-Partner"
      },
      {
        text: "Working with Paul Ivan was an outstanding experience. Paul not only brought a high level of expertise and technical knowledge to the development of our project, but also an incredible passion for innovation and usability. His structured and goal-oriented work was instrumental in enabling us to achieve the project's milestones efficiently and on time with two people, even though this task was intended for three.",
        author: "Samuel S.",
        position: "Team-Partner"
      }
    ],
    DE: [
      {
        text: "Paul ist ein ausgezeichneter Teamplayer und sehr engagiert. Die Zusammenarbeit mit Paul hat sich für mich persönlich als sehr nützlich erwiesen. Er hat immer eine Lösung parat und gibt nie auf. Er konnte jedes Problem schnell lösen. Paul ist ein freundlicher und hilfsbereiter Mensch.",
        author: "Tristan S.",
        position: "Team-Partner"
      },
      {
        text: "Paul arbeitet äußerst schnell und effizient. Er ist immer hilfsbereit und zeigt ein hohes Maß an Engagement, wenn es darum geht, Unterstützung zu leisten. Besonders beeindruckend ist seine schnelle Auffassungsgabe für die behandelten Themen – er versteht neue Sachverhalte in kürzester Zeit und setzt sie sofort in die Praxis um.",
        author: "David P.",
        position: "Team-Partner"
      },
      {
        text: "Die Zusammenarbeit mit Paul Ivan war eine herausragende Erfahrung. Paul brachte nicht nur ein hohes Maß an Fachkompetenz und technischem Wissen in die Entwicklung unserem Projekt ein, sondern auch eine unglaubliche Leidenschaft für Innovation und Nutzerfreundlichkeit. Sein strukturiertes und zielorientiertes Arbeiten war maßgeblich dafür verantwortlich, dass wir die Meilensteine des Projekts zu zweit, effizient und termingerecht erreichen konnten, obwohl diese Aufgabe für drei Personen vorgesehen war.",
        author: "Samuel Z.",
        position: "Team-Partner"
      }
    ]
  };

  /**
   * Constructs a ReferencesComponent instance.
   * @param languageService - The service used for handling language changes.
   */
  constructor(private languageService: LanguageService) {}

  /**
   * Initializes the component by subscribing to language changes and updating the slider.
   */
  ngOnInit(): void {
    this.languageSubscription = this.languageService.selectedLanguage$.subscribe(language => {
      if (language === 'EN' || language === 'DE') {
        this.currentLanguage = language;
        this.updateSlider(); 
      }
    });
    this.updateSlider();
  }

  /**
   * Cleans up resources by unsubscribing from language changes when the component is destroyed.
   */
  ngOnDestroy(): void {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }

  /**
   * Moves to the next reference in the slider.
   * Updates the current index and triggers the transition animation.
   */
  goToNext() {
    this.isMovingRight = true;
    setTimeout(() => {
      this.isMovingRight = false;
      this.currentIndex = (this.currentIndex + 1) % this.getCurrentReferences().length;
    }, 700);
  }

  /**
   * Moves to the previous reference in the slider.
   * Updates the current index and triggers the transition animation.
   */
  goToPrevious() {
    this.isMovingLeft = true;
    setTimeout(() => {
      this.isMovingLeft = false;
      this.currentIndex = (this.currentIndex - 1 + this.getCurrentReferences().length) % this.getCurrentReferences().length;
    }, 700);
  }

  /**
   * Retrieves the current list of references based on the selected language.
   * @returns The array of references for the current language.
   */
  getCurrentReferences(): Reference[] {
    return this.references[this.currentLanguage];
  }

  /**
   * Updates the slider by applying the active class to the appropriate item.
   */
  updateSlider() {
    this.updateActiveItem();
  }

  /**
   * Updates the active item in the slider by toggling the 'active' class.
   */
  updateActiveItem() {
    const items = document.querySelectorAll('.slider-item');
    items.forEach((item, index) => {
      item.classList.toggle('active', index === 1); 
    });
  }

  /**
   * Adds a box shadow effect when hovering over the previous button.
   */
  addBoxShadow() {
    this.isPrevHovered = true;
  }

  /**
   * Removes the box shadow effect when not hovering over the previous button.
   */
  removeBoxShadow() {
    this.isPrevHovered = false;
  }
}