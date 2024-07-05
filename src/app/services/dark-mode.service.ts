import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DarkModeService {
  private darkModeEnabled: boolean = false;

  constructor() {
    this.darkModeEnabled = localStorage.getItem('darkMode') === 'true';
    this.applyDarkMode();
  }

  toggleDarkMode(): void {
    this.darkModeEnabled = !this.darkModeEnabled;
    localStorage.setItem('darkMode', this.darkModeEnabled.toString());
    this.applyDarkMode();
  }

  isDarkModeEnabled(): boolean {
    return this.darkModeEnabled;
  }

  private applyDarkMode(): void {
    if (this.darkModeEnabled) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }
}
