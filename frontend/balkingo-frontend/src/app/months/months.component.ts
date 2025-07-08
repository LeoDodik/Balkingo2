import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-months',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './months.component.html',
  styleUrls: ['./months.component.css']
})
export class MonthsComponent {
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
      name: 'Mjeseci u godini',
      lessons: [
        {
          id: 'months-table',
          title: 'Tablica mjeseci',
          description: '',
          question: '',
          answers: [],
          correct: '',
          funFact: 'Imena mjeseci u njemačkom jeziku pišu se velikim slovom.'
        },
        {
          id: 'january',
          title: 'Januar',
          description: 'Januar je prvi mjesec u godini.',
          question: 'Kako se kaže "Siječanj" na njemačkom?',
          correct: 'Januar',
          answers: ['Januar', 'Februar', 'März', 'April'],
          funFact: 'Januar dolazi od rimskog boga Janusa – boga početaka.'
        },
        {
          id: 'august',
          title: 'Kolovoz',
          description: 'Osmi mjesec u godini.',
          question: 'Kako se kaže "Kolovoz" na njemačkom?',
          correct: 'August',
          answers: ['August', 'Juni', 'Juli', 'Oktober'],
          funFact: 'Nazvan po rimskom caru Augustu.'
        }
      ]
    },
    {
      name: 'Godišnja doba',
      lessons: [
        {
          id: 'seasons',
          title: 'Godišnja doba',
          description: 'U njemačkom jeziku postoje četiri godišnja doba: der Frühling (proljeće), der Sommer (ljeto), der Herbst (jesen), der Winter (zima).',
          question: 'Kako se kaže "proljeće" na njemačkom?',
          answers: ['der Frühling', 'der Sommer', 'der Herbst', 'der Winter'],
          correct: 'der Frühling',
          funFact: 'Riječ "Herbst" dolazi od staronjemačke riječi "herbist", što znači berba.'
        }
      ]
    }
  ];

  get currentLesson() {
    return this.sections[this.currentSectionIndex]?.lessons[this.currentLessonIndex];
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
    const lessonId = this.currentLesson?.id;
    if (lessonId && !this.completedLessonsList.includes(lessonId)) {
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
      localStorage.setItem('monthsProgress', 'completed');
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
    localStorage.removeItem('monthsProgress');
  }

  goToLection() {
    const lectionName = 'months';
    const completedLections = JSON.parse(localStorage.getItem('completedLections') || '[]');

    if (!completedLections.includes(lectionName)) {
      completedLections.push(lectionName);
      localStorage.setItem('completedLections', JSON.stringify(completedLections));
    }

    this.router.navigate(['/progress']);
  }
}
