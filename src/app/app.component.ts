import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { LanguageService } from './services/language.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FooterComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
/**
 * Main application component that handles global application functionality
 * such as cursor shadow positioning, menu positioning, and screen orientation checking.
 */
export class AppComponent implements OnInit {
  title = 'portfolio';
  isLandscape: boolean = false;
  isTouchDevice: boolean = false;

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
   * Updates the cursor shadow position based on mouse movement.
   * @param event The MouseEvent containing the cursor's current position.
   */
  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    const cursorShadow = document.querySelector('.cursor-shadow') as HTMLElement;
    if (cursorShadow) {
      cursorShadow.style.left = `${event.clientX}px`;
      cursorShadow.style.top = `${event.clientY}px`;
    }
  }

  /**
   * Initializes the component by checking the screen orientation,
   * updating the menu position, and starting an interval to periodically update the menu position.
   */
  ngOnInit(): void {
    this.checkOrientation();
    this.updateMenuPosition();
    this.startScrollInterval();
  }

  /**
   * Starts an interval that updates the menu position every 5 milliseconds.
   */
  startScrollInterval() {
    setInterval(() => {
      this.updateMenuPosition();
    }, 5);
  }

  /**
   * Updates the position of the menu and the visible navigation based on the current scroll position.
   */
  updateMenuPosition() {
    const menu = document.querySelector('.menu');
    const visNav = document.querySelector('.visible-nav');
    if (menu) {
      visNav?.setAttribute('style', `top:${window.scrollY + 80}px`);
      menu.setAttribute('style', `top: ${window.scrollY + 20}px`);
    }
  }

  /**
   * Listens for window resize events and checks the screen orientation.
   * @param event The resize event.
   */
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkOrientation();
  }

  /**
   * Checks if the current screen orientation is landscape and updates the isLandscape property.
   */
  checkOrientation() {
    this.isLandscape = window.innerHeight < 590;
  }
}

