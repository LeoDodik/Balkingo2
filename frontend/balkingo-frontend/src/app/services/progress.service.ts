import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ProgressService {
  private storageKey = 'balkingo_progress';

  getCompletedLections(): string[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  markLectionAsCompleted(name: string) {
    const completed = this.getCompletedLections();
    if (!completed.includes(name)) {
      completed.push(name);
      localStorage.setItem(this.storageKey, JSON.stringify(completed));
    }
  }

  isLectionCompleted(name: string): boolean {
    return this.getCompletedLections().includes(name);
  }
}
