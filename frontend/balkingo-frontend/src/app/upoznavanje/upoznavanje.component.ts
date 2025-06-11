import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upoznavanje',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upoznavanje.component.html',
  styleUrls: ['./upoznavanje.component.css']
})
export class UpoznavanjeComponent {
  currentSectionIndex = 0;
  currentLessonIndex = 0;
  showIntro = false;
  showQuiz = false;
  showWelcome = true;
  answered = false;
  resultMessage = '';

  sections = [
    {
      name: 'Sekcija 1',
      lessons: [
        {
          title: 'Pozdrav “Guten Tag”',
          description: '“Guten Tag” znači “Dobar dan” i koristi se u formalnim situacijama tokom dana.',
          question: 'Što znači “Guten Tag”?',
          correct: 'Dobar dan',
          answers: ['Zdravo', 'Dobar dan', 'Doviđenja', 'Kako se zoveš?']
        }
      ]
    },
    {
      name: 'Sekcija 2',
      lessons: [
        {
          title: 'Pitanje “Wie heißt du?”',
          description: '“Wie heißt du?” znači “Kako se zoveš?” i koristi se kada želiš upoznati nekoga.',
          question: 'Što znači “Wie heißt du?”',
          correct: 'Kako se zoveš?',
          answers: ['Koliko imaš godina?', 'Kako se zoveš?', 'Gdje živiš?', 'Kako si?']
        },
        {
          title: 'Pitanje “Woher kommst du?”',
          description: '“Woher kommst du?” znači “Odakle dolaziš?” i koristi se kada želiš znati nečije porijeklo.',
          question: 'Što znači “Woher kommst du?”',
          correct: 'Odakle dolaziš?',
          answers: ['Odakle dolaziš?', 'Koliko imaš godina?', 'Kako se zoveš?', 'Gdje živiš?']
        },
        {
          title: 'Pitanje “Wie alt bist du?”',
          description: '“Wie alt bist du?” znači “Koliko imaš godina?”.',
          question: 'Što znači “Wie alt bist du?”',
          correct: 'Koliko imaš godina?',
          answers: ['Koliko imaš godina?', 'Gdje si?', 'Kako si?', 'Gdje živiš?']
        },
        {
          title: 'Pozdrav “Guten Abend”',
          description: '“Guten Abend” znači “Dobro veče” i koristi se u večernjim satima.',
          question: 'Kada se koristi “Guten Abend”?',
          correct: 'U večernjim satima',
          answers: ['Ujutro', 'U večernjim satima', 'Tokom ručka', 'Kad se pozdravljaš s nekim']
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
    return this.sections
      .slice(0, this.currentSectionIndex)
      .reduce((total, section) => total + section.lessons.length, 0) + this.currentLessonIndex;
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
    if (selected === correct) {
      this.resultMessage = '✅ Bravo! Točan odgovor.';
    } else {
      this.resultMessage = `❌ Netočno. Tačan odgovor je: ${correct}`;
    }
  }

  nextLesson() {
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
  }

  restart() {
    this.currentSectionIndex = 0;
    this.currentLessonIndex = 0;
    this.showIntro = false;
    this.showQuiz = false;
    this.answered = false;
    this.resultMessage = '';
    this.showWelcome = true;
  }
}
