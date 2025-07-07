import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-days',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './days.component.html',
  styleUrls: ['./days.component.css']
})
export class DaysComponent {
  currentSectionIndex = 0;
  currentLessonIndex = 0;
  showIntro = false;
  showQuiz = false;
  showWelcome = true;
  answered = false;
  resultMessage = '';
  completedLessonsList: string[] = [];

  constructor(private router: Router) {}

  sections = [
    {
      name: 'Dani u tjednu',
      lessons: [
        {
          id: 'monday',
          title: 'Ponedjeljak',
          description: 'Ponedjeljak je prvi dan u tjednu.',
          question: 'Kako se kaže "Monday" na njemačkom?',
          correct: 'Montag',
          answers: ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag'],
          funFact: 'Ponedjeljak na njemačkom znači "Montag", što dolazi od Mjeseca (Moon Day).'
        },
        {
          id: 'tuesday',
          title: 'Utorak',
          description: 'Utorak je drugi dan u tjednu.',
          question: 'Kako se kaže "Tuesday" na njemačkom?',
          correct: 'Dienstag',
          answers: ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag'],
          funFact: 'Dienstag potječe od boga rata Tiw, slično engleskom "Tuesday".'
        },
        {
          id: 'wednesday',
          title: 'Srijeda',
          description: 'Srijeda je sredina tjedna.',
          question: 'Kako se kaže "Wednesday" na njemačkom?',
          correct: 'Mittwoch',
          answers: ['Mittwoch', 'Freitag', 'Samstag', 'Sonntag'],
          funFact: 'Mittwoch znači "sredina tjedna".'
        },
        {
          id: 'thursday',
          title: 'Četvrtak',
          description: 'Četvrtak je četvrti dan u tjednu.',
          question: 'Kako se kaže "Thursday" na njemačkom?',
          correct: 'Donnerstag',
          answers: ['Dienstag', 'Donnerstag', 'Freitag', 'Samstag'],
          funFact: 'Donnerstag znači "Dan groma", od boga groma Donara.'
        },
        {
          id: 'friday',
          title: 'Petak',
          description: 'Petak je peti dan u tjednu.',
          question: 'Kako se kaže "Friday" na njemačkom?',
          correct: 'Freitag',
          answers: ['Donnerstag', 'Freitag', 'Samstag', 'Sonntag'],
          funFact: 'Freitag dolazi od božice ljubavi Freje.'
        },
        {
          id: 'saturday',
          title: 'Subota',
          description: 'Subota je šesti dan u tjednu.',
          question: 'Kako se kaže "Saturday" na njemačkom?',
          correct: 'Samstag',
          answers: ['Samstag', 'Sonntag', 'Montag', 'Dienstag'],
          funFact: 'Samstag je njemačka verzija "Sabbath", dan odmora.'
        },
        {
          id: 'sunday',
          title: 'Nedjelja',
          description: 'Nedjelja je sedmi dan u tjednu.',
          question: 'Kako se kaže "Sunday" na njemačkom?',
          correct: 'Sonntag',
          answers: ['Samstag', 'Sonntag', 'Freitag', 'Mittwoch'],
          funFact: 'Sonntag znači "dan sunca".'
        }
      ]
    }
  ];

  get currentLesson() {
    return this.sections[this.currentSectionIndex].lessons[this.currentLessonIndex];
  }

  get totalLessons(): number {
    return this.sections.reduce((total, section) => total + section.lessons.length, 0);
  }

  get completedLessons(): number {
    return this.completedLessonsList.length;
  }

  get progress(): number {
    return Math.floor((this.completedLessons / this.totalLessons) * 100);
  }

  startCourse() {
    this.showWelcome = false;
    this.showIntro = true;
    this.currentSectionIndex = 0;
    this.currentLessonIndex = 0;
  }

  startQuiz() {
    this.showQuiz = true;
    this.showIntro = false;
    this.answered = false;
    this.resultMessage = '';
  }

  checkAnswer(selected: string) {
    this.answered = true;
    const correct = this.currentLesson.correct;
    this.resultMessage = selected === correct
      ? '✅ Bravo! Točan odgovor.'
      : `❌ Netočno. Točan odgovor je: ${correct}`;
  }

  nextLesson() {
    const lessonId = this.currentLesson.id;
    if (!this.completedLessonsList.includes(lessonId)) {
      this.completedLessonsList.push(lessonId);
    }

    this.answered = false;
    this.resultMessage = '';
    this.showQuiz = false;

    const currentSection = this.sections[this.currentSectionIndex];
    this.currentLessonIndex++;

    if (this.currentLessonIndex >= currentSection.lessons.length) {
      this.currentLessonIndex = 0;
      this.currentSectionIndex++;
    }

    if (this.currentSectionIndex < this.sections.length) {
      this.showIntro = true;
    }

    if (this.progress === 100) {
      localStorage.setItem('daysProgress', 'completed');
    }
  }

  restart() {
    this.currentSectionIndex = 0;
    this.currentLessonIndex = 0;
    this.completedLessonsList = [];
    this.showIntro = false;
    this.showQuiz = false;
    this.answered = false;
    this.resultMessage = '';
    this.showWelcome = true;
    localStorage.removeItem('daysProgress');
  }

  goToLection() {
    const lectionName = 'days';
    const completedLections = JSON.parse(localStorage.getItem('completedLections') || '[]');

    if (!completedLections.includes(lectionName)) {
      completedLections.push(lectionName);
      localStorage.setItem('completedLections', JSON.stringify(completedLections));
    }

    this.router.navigate(['/progress']);
  }
}
