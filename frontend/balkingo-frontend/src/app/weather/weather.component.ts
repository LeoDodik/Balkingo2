// TypeScript + Template logic for showing all wrong answers at end
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent {
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
      name: 'Vrijeme',
      lessons: [
        {
          id: 'sonnig',
          title: 'Sonnig',
          description: 'Sonnig znači sunčano. / Sonnig bedeutet, dass die Sonne scheint.',
          question: 'Kako se kaže "sunčano" na njemačkom?',
          correct: 'Sonnig',
          answers: ['Sonnig', 'Regnerisch', 'Bewölkt', 'Schneit'],
          funFact: 'Riječ "sonnig" dolazi od riječi Sonne, što znači sunce.'
        },
        {
          id: 'regnerisch',
          title: 'Regnerisch',
          description: 'Regnerisch znači kišovito. / Regnerisch bedeutet, dass es regnet.',
          question: 'Kako se kaže "kišovito" na njemačkom?',
          correct: 'Regnerisch',
          answers: ['Schneit', 'Sonnig', 'Regnerisch', 'Windig'],
          funFact: 'U Hamburgu često bude regnerisch čak i ljeti.'
        },
        {
          id: 'bewoelkt',
          title: 'Bewölkt',
          description: 'Bewölkt znači oblačno. / Bewölkt bedeutet, dass der Himmel mit Wolken bedeckt ist.',
          question: 'Kako se kaže "oblačno" na njemačkom?',
          correct: 'Bewölkt',
          answers: ['Kalt', 'Bewölkt', 'Heiß', 'Regnerisch'],
          funFact: 'U Njemačkoj je jesen često bewölkt i hladna.'
        },
        {
          id: 'windig',
          title: 'Windig',
          description: 'Windig znači vjetrovito. / Windig bedeutet, dass es viel Wind gibt.',
          question: 'Kako se kaže "vjetrovito" na njemačkom?',
          correct: 'Windig',
          answers: ['Windig', 'Sonnig', 'Regnerisch', 'Schneit'],
          funFact: 'Bregenz u Austriji često ima windige dane zbog planinskog vjetra.'
        },
        {
          id: 'schneit',
          title: 'Schneit',
          description: 'Schneit znači pada snijeg. / Schneit bedeutet, dass Schnee fällt.',
          question: 'Kako se kaže "pada snijeg" na njemačkom?',
          correct: 'Schneit',
          answers: ['Schneit', 'Regnet', 'Windig', 'Heiß'],
          funFact: 'U Bavarskoj često schneit tokom zime.'
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


    if (this.currentLesson) {
      this.currentLesson.answers = this.shuffleArray([...this.currentLesson.answers]);
    }
  }

  shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
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
    const lectionName = 'vrijeme';
    const completedLections = JSON.parse(localStorage.getItem('completedLections') || '[]');

    if (!completedLections.includes(lectionName)) {
      completedLections.push(lectionName);
      localStorage.setItem('completedLections', JSON.stringify(completedLections));
    }

    this.router.navigate(['/lektion']);
  }
}
