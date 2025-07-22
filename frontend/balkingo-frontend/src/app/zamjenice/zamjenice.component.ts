import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-zamjenice',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './zamjenice.component.html',
  styleUrls: ['./zamjenice.component.css']
})
export class ZamjeniceComponent {
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
      name: 'Zamjenice',
      lessons: [
        {
          id: 'zamjenice-uvod',
          title: 'Šta su zamjenice?',
          description: 'Zamjenice zamjenjuju imenice i koriste se da bi govorili preciznije i jasnije.',
          question: 'Kako se na njemačkom kaže "ja"?',
          correct: 'ich',
          answers: ['ich', 'du', 'er'],
          funFact: 'Njemačke zamjenice razlikuju se po padežima i rodu.'
        },
        {
          id: 'personal',
          title: 'Vrsta: personal (lične zamjenice)',
          description: 'Lične zamjenice su najčešće i koriste se za označavanje osoba.',
          question: 'Koja je njemačka zamjenica za "mi"?',
          correct: 'wir',
          answers: ['wir', 'ihr', 'sie'],
          funFact: 'Personalne zamjenice mijenjaju oblik ovisno o padežu.'
        },
        {
          id: 'possessive',
          title: 'Vrsta: possessive (posvojne zamjenice)',
          description: 'Posvojne zamjenice pokazuju pripadnost nečemu ili nekome.',
          question: 'Kako se kaže "moj" na njemačkom?',
          correct: 'mein',
          answers: ['mein', 'dein', 'sein'],
          funFact: 'Posvojne zamjenice se slažu s rodom i brojem imenice koju zamjenjuju.'
        },
        {
          id: 'reflexive',
          title: 'Vrsta: reflexive (povratne zamjenice)',
          description: 'Povratne zamjenice koriste se kada subjekt vrši radnju na sebi.',
          question: 'Kako se kaže "sebe (ja)" na njemačkom?',
          correct: 'mich',
          answers: ['mich', 'dich', 'uns'],
          funFact: 'Povratne zamjenice su ključne u svakodnevnom govoru i refleksivnim glagolima.'
        }
      ]
    }
  ];

  get currentLesson() {
    return this.sections[this.currentSectionIndex]?.lessons[this.currentLessonIndex];
  }

  shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
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
      localStorage.setItem('pronounsCompleted', 'true');
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
    localStorage.removeItem('pronounsCompleted');
  }

  goToLection() {
    const lectionName = 'zamjenice';
    const completedLections = JSON.parse(localStorage.getItem('completedLections') || '[]');

    if (!completedLections.includes(lectionName)) {
      completedLections.push(lectionName);
      localStorage.setItem('completedLections', JSON.stringify(completedLections));
    }

    this.router.navigate(['/lektion']);
  }
}
