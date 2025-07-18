// TypeScript + Template logic for showing all wrong answers at end
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
  wrongAnswersList: { question: string; selected: string; correct: string }[] = [];

  constructor(private router: Router) {}

  sections = [
    {
      name: 'Dani u tjednu',
      lessons: [
        {
          id: 'monday',
          title: 'Ponedjeljak',
          description: 'Ponedjeljak je prvi dan u tjednu.',
          question: 'Kako se kaže "Ponedjeljak" na njemačkom?',
          correct: 'Montag',
          answers: ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag'],
          funFact: 'Ponedjeljak na njemačkom znači "Montag", što dolazi od Mjeseca (Moon Day).'
        },
        {
          id: 'tuesday',
          title: 'Utorak',
          description: 'Utorak je drugi dan u tjednu.',
          question: 'Kako se kaže "Utorak" na njemačkom?',
          correct: 'Dienstag',
          answers: ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag'],
          funFact: 'Dienstag potječe od boga rata Tiw, slično engleskom "Tuesday".'
        },
        {
          id: 'wednesday',
          title: 'Srijeda',
          description: 'Srijeda je sredina tjedna.',
          question: 'Kako se kaže "Srijeda" na njemačkom?',
          correct: 'Mittwoch',
          answers: ['Mittwoch', 'Freitag', 'Samstag', 'Sonntag'],
          funFact: 'Mittwoch znači "sredina tjedna".'
        },
        {
          id: 'thursday',
          title: 'Četvrtak',
          description: 'Četvrtak je četvrti dan u tjednu.',
          question: 'Kako se kaže "Četvrtak" na njemačkom?',
          correct: 'Donnerstag',
          answers: ['Dienstag', 'Donnerstag', 'Freitag', 'Samstag'],
          funFact: 'Donnerstag znači "Dan groma", od boga groma Donara.'
        },
        {
          id: 'friday',
          title: 'Petak',
          description: 'Petak je peti dan u tjednu.',
          question: 'Kako se kaže "Petak" na njemačkom?',
          correct: 'Freitag',
          answers: ['Donnerstag', 'Freitag', 'Samstag', 'Sonntag'],
          funFact: 'Freitag dolazi od božice ljubavi Freje.'
        },
        {
          id: 'saturday',
          title: 'Subota',
          description: 'Subota je šesti dan u tjednu.',
          question: 'Kako se kaže "Subota" na njemačkom?',
          correct: 'Samstag',
          answers: ['Samstag', 'Sonntag', 'Montag', 'Dienstag'],
          funFact: 'Samstag je njemačka verzija "Sabbath", dan odmora.'
        },
        {
          id: 'sunday',
          title: 'Nedjelja',
          description: 'Nedjelja je sedmi dan u tjednu.',
          question: 'Kako se kaže "Nedjelja" na njemačkom?',
          correct: 'Sonntag',
          answers: ['Samstag', 'Sonntag', 'Freitag', 'Mittwoch'],
          funFact: 'Sonntag znači "dan sunca".'
        }
      ]
    }
  ];

  shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

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

    if (this.currentLesson) {
      this.currentLesson.answers = this.shuffleArray([...this.currentLesson.answers]);
    }
  }

  checkAnswer(selected: string) {
    this.answered = true;
    const correct = this.currentLesson.correct;

    if (selected === correct) {
      this.resultMessage = '✅ Bravo! Točan odgovor.';
    } else {
      this.resultMessage = `❌ Netočno. Tačan odgovor je: ${correct}`;
      this.wrongAnswersList.push({
        question: this.currentLesson.question,
        selected,
        correct
      });
    }
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
      localStorage.setItem('', 'completed');
    }
  }

  restart() {
    this.currentSectionIndex = 0;
    this.currentLessonIndex = 0;
    this.completedLessonsList = [];
    this.wrongAnswersList = [];
    this.showIntro = false;
    this.showQuiz = false;
    this.answered = false;
    this.resultMessage = '';
    this.showWelcome = true;
    localStorage.removeItem('');
  }

  goToLection() {
    const lectionName = 'dani u tjednu';
    const completedLections = JSON.parse(localStorage.getItem('completedLections') || '[]');

    if (!completedLections.includes(lectionName)) {
      completedLections.push(lectionName);
      localStorage.setItem('completedLections', JSON.stringify(completedLections));
    }

    this.router.navigate(['/lektion']);
  }
}
