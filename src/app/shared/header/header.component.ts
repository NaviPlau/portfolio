import { Component, ElementRef, Renderer2, OnInit, OnDestroy } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
/**
 * Manages the header section of the application, including the navigation menu and language selection.
 */
export class HeaderComponent implements OnInit, OnDestroy {
  selectedLanguage: string = 'EN';
  private documentClickListener: any;

  /**
   * Constructs a HeaderComponent instance.
   * Subscribes to the LanguageService to update the selectedLanguage property.
   * @param languageService The service for managing language selection.
   * @param renderer The Angular Renderer2 service for DOM manipulation.
   * @param elementRef The Angular ElementRef service for accessing the component's DOM element.
   */
  constructor(
    private languageService: LanguageService,
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {
    this.languageService.selectedLanguage$.subscribe(language => {
      this.selectedLanguage = language;
    });
  }

  /**
   * Initializes the component, setting up a click listener on the document
   * to close the navigation menu when clicking outside of the header element.
   */
  ngOnInit() {
    this.documentClickListener = this.renderer.listen('document', 'click', (event: Event) => {
      const targetElement = event.target as HTMLElement;
      if (!this.elementRef.nativeElement.contains(targetElement) && this.isNavVisible) {
        this.isNavVisible = false;
      }
    });
  }

  isNavVisible = false; 

  /**
   * Toggles the visibility of the navigation menu.
   */
  toggleNav() {
    this.isNavVisible = !this.isNavVisible; 
  }

  /**
   * Handles menu click events to stop event propagation and toggle the navigation menu visibility.
   * @param event The click event object.
   */
  onMenuClick(event: MouseEvent) {
    event.stopPropagation();
    this.toggleNav(); 
  }

  /**
   * Toggles the application language between 'EN' and 'DE'.
   */
  toggleLanguage() {
    this.languageService.toggleLanguage();
  }

  /**
   * Cleans up the document click listener when the component is destroyed.
   */
  ngOnDestroy() {
    if (this.documentClickListener) {
      this.documentClickListener();
    }
  }
}
