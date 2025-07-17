import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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
  completedLessonsList: string[] = [];
  selectedAnswer: string | null = null;  // <-- Track selected answer

  constructor(private router: Router) {}

  sections = [
    {
      name: 'Sekcija 1',
      lessons: [
        {
          id: 'pozdrav-guten-tag',
          title: 'Pozdrav “Guten Tag”',
          description: '“Guten Tag” znači “Dobar dan” i koristi se u formalnim situacijama tokom dana.',
          question: 'Što znači “Guten Tag”?',
          correct: 'Dobar dan',
          answers: ['Zdravo', 'Dobar dan', 'Doviđenja', 'Kako se zoveš?'],
          funFact: '“Guten Tag” se doslovno prevodi kao “Dobar dan” i često se koristi do kasnog popodneva.'
        }
      ]
    },
    {
      name: 'Sekcija 2',
      lessons: [
        {
          id: 'pitanje-wie-heisst-du',
          title: 'Pitanje “Wie heißt du?”',
          description: '“Wie heißt du?” znači “Kako se zoveš?” i koristi se kada želiš upoznati nekoga.',
          question: 'Što znači “Wie heißt du?”',
          correct: 'Kako se zoveš?',
          answers: ['Koliko imaš godina?', 'Kako se zoveš?', 'Gdje živiš?', 'Kako si?'],
          funFact: 'U Njemačkoj je uobičajeno pitati ime vrlo brzo prilikom upoznavanja.'
        },
        {
          id: 'pitanje-woher-kommst-du',
          title: 'Pitanje “Woher kommst du?”',
          description: '“Woher kommst du?” znači “Odakle dolaziš?” i koristi se kada želiš znati nečije porijeklo.',
          question: 'Što znači “Woher kommst du?”',
          correct: 'Odakle dolaziš?',
          answers: ['Odakle dolaziš?', 'Koliko imaš godina?', 'Kako se zoveš?', 'Gdje živiš?'],
          funFact: 'Njemačka je zemlja mnogih imigranata, pa je ovo pitanje često u svakodnevnom govoru.'
        },
        {
          id: 'pitanje-wie-alt-bist-du',
          title: 'Pitanje “Wie alt bist du?”',
          description: '“Wie alt bist du?” znači “Koliko imaš godina?”.',
          question: 'Što znači “Wie alt bist du?”',
          correct: 'Koliko imaš godina?',
          answers: ['Koliko imaš godina?', 'Gdje si?', 'Kako si?', 'Gdje živiš?'],
          funFact: 'Ovo pitanje može biti osobno, pa ga nemojte postavljati odmah svakome!'
        },
        {
          id: 'pozdrav-guten-abend',
          title: 'Pozdrav “Guten Abend”',
          description: '“Guten Abend” znači “Dobro veče” i koristi se u večernjim satima.',
          question: 'Kada se koristi “Guten Abend”?',
          correct: 'U večernjim satima',
          answers: ['Ujutro', 'U večernjim satima', 'Tokom ručka', 'Kad se pozdravljaš s nekim'],
          funFact: '“Guten Abend” se najčešće koristi od zalaska sunca pa nadalje.'
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
    this.selectedAnswer = null;  // reset selected answer
  }

  checkAnswer(selected: string) {
    if (this.answered) return; // Prevent multiple clicks

    this.selectedAnswer = selected;
    this.answered = true;
    const correct = this.currentLesson.correct;
    this.resultMessage = selected === correct
      ? '✅ Bravo! Točan odgovor.'
      : `❌ Netočno. Tačan odgovor je: ${correct}`;
  }

  nextLesson() {
    const lessonId = this.currentLesson.id;
    if (!this.completedLessonsList.includes(lessonId)) {
      this.completedLessonsList.push(lessonId);
    }

    this.answered = false;
    this.resultMessage = '';
    this.showQuiz = false;
    this.selectedAnswer = null;

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
      localStorage.setItem('upoznavanjeProgress', 'completed');
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
    this.selectedAnswer = null;
    this.showWelcome = true;
    localStorage.removeItem('upoznavanjeProgress');
  }

  goToLection() {
    const lectionName = 'upoznavanje';
    const completedLections = JSON.parse(localStorage.getItem('completedLections') || '[]');

    if (!completedLections.includes(lectionName)) {
      completedLections.push(lectionName);
      localStorage.setItem('completedLections', JSON.stringify(completedLections));
    }

    this.router.navigate(['/lektion']);
  }
}
