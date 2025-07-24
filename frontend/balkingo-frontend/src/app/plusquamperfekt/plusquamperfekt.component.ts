// TypeScript + Template logic for showing all wrong answers at end
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plusquamperfekt',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plusquamperfekt.component.html',
  styleUrls: ['./plusquamperfekt.component.css']
})
export class PlusquamperfektComponent {
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
      name: 'PLUSQUAMPERFEKT',
      lessons: [
        {
          id: 'plusq-uvod',
          title: 'Što je Plusquamperfekt?',
          description:
            'Plusquamperfekt se koristi za opisivanje radnje koja se dogodila prije neke druge prošle radnje. Sastoji se od Präteritum oblika glagola „haben“ ili „sein“ + perfekt particip glagola.',
          question: 'Koja je glavna funkcija Plusquamperfekta?',
          correct: 'Opis radnje prije druge prošle radnje',
          answers: [
            'Opis radnje koja se događa sada',
            'Opis radnje prije druge prošle radnje',
            'Opis buduće radnje'
          ],
          funFact:
            'Plusquamperfekt se često koristi zajedno s Präteritumom da bi se jasno označio redoslijed prošlih događaja.'
        },
        {
          id: 'plusq-forma',
          title: 'Kako se gradi Plusquamperfekt?',
          description:
            'Formula: [haben/sein u Präteritumu] + [Perfekt particip]. Primjer: „Ich hatte gegessen“ (Ja sam bio jeo / Pojeo sam).',
          question: 'Koja je ispravna rečenica u Plusquamperfektu?',
          correct: 'Wir waren gegangen.',
          answers: ['Wir waren gegangen.', 'Wir sind gegangen.', 'Wir gehen.'],
          funFact:
            '„Sein“ se koristi s glagolima kretanja ili promjene stanja (gehen, kommen, werden itd.), dok se „haben“ koristi sa većinom drugih glagola.'
        },
        {
          id: 'plusq-primjeri',
          title: 'Primjeri Plusquamperfekta',
          description:
            'Primjer kombinacije: „Als ich ankam, war er schon gegangen.“ (Kad sam stigao, on je već bio otišao.)',
          question: 'Koja rečenica je u Plusquamperfektu?',
          correct: 'Ich hatte das Buch gelesen.',
          answers: [
            'Ich habe das Buch gelesen.',
            'Ich hatte das Buch gelesen.',
            'Ich lese das Buch.'
          ],
          funFact:
            'Plusquamperfekt se rijetko koristi samostalno – često dolazi uz drugu rečenicu u Präteritumu.'
        },
        {
          id: 'plusq-recap',
          title: 'Plusquamperfekt – završni kviz',
          description:
            'Provjerimo tvoje znanje o formiranju i korištenju Plusquamperfekta.',
          question:
            'Koja je pravilna verzija: „Kad sam došao, ona je već bila otišla“?',
          correct: 'Als ich kam, war sie schon gegangen.',
          answers: [
            'Als ich komme, ist sie schon gegangen.',
            'Als ich kam, war sie schon gegangen.',
            'Als ich gekommen bin, sie ist gegangen.'
          ],
          funFact:
            'Kombinacija Präterituma i Plusquamperfekta pomaže da jasno prikažeš kronološki slijed prošlih događaja.'
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
    const lectionName = 'plusquamperfekt';
    const completedLections = JSON.parse(localStorage.getItem('completedLections') || '[]');

    if (!completedLections.includes(lectionName)) {
      completedLections.push(lectionName);
      localStorage.setItem('completedLections', JSON.stringify(completedLections));
    }

    this.router.navigate(['/lektion']);
  }
}
