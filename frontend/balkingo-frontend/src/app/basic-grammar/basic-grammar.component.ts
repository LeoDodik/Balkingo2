// TypeScript + Template logic for showing all wrong answers at end
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basic-grammar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './basic-grammar.component.html',
  styleUrls: ['./basic-grammar.component.css']
})
export class BasicGrammarComponent {
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
      name: 'GRAMMATIK GRUNDLAGEN / OSNOVE GRAMATIKE',
      lessons: [
        {
          id: 'artikel',
          title: 'der / die / das',
          description: 'U njemačkom jeziku imenice imaju rod. Koriste se članovi: der (muški), die (ženski), das (srednji).',
          question: 'Koji je ispravan član za riječ "Frau"?',
          correct: 'die Frau',
          answers: ['der Frau', 'die Frau', 'das Frau'],
          funFact: 'Svaka imenica u njemačkom jeziku piše se velikim slovom!'
        },
        {
          id: 'licni-zamjenici',  // changed from 'pronomen' to 'licni-zamjenici'
          title: 'Lični zamjenici',
          description: 'Lični zamjenici su: ich, du, er, sie, es, wir, ihr, sie.',
          question: 'Kako se kaže "oni" na njemačkom?',
          correct: 'sie',
          answers: ['wir', 'ihr', 'sie'],
          funFact: 'Zamjenica „sie“ može značiti i „ona“ i „oni“ – zavisi od konteksta.'
        },
        {
          id: 'sein',
          title: 'Glagol "sein"',
          description: '„sein“ znači „biti“. Na primjer: Ich bin müde. – Ja sam umoran.',
          question: 'Kako se kaže "Ja sam umoran" na njemačkom?',
          correct: 'Ich bin müde',
          answers: ['Ich habe müde', 'Ich bin müde', 'Du bist müde'],
          funFact: '„sein“ je nepravilni glagol – mora se naučiti napamet!'
        },
        {
          id: 'haben',
          title: 'Glagol "haben"',
          description: '„haben“ znači „imati“. Na primjer: Du hast ein Buch. – Imaš knjigu.',
          question: 'Kako se kaže "Ja imam knjigu"?',
          correct: 'Ich habe ein Buch',
          answers: ['Ich bin ein Buch', 'Ich habe ein Buch', 'Du hast ein Buch'],
          funFact: 'Glagol „haben“ koristi se često u svakodnevnom govoru.'
        },
        {
          id: 'red-rijeci',  // changed from 'wortstellung' to 'red-rijeci'
          title: 'Red riječi',
          description: 'Tipičan red riječi u njemačkom: subjekt + glagol + ostatak.',
          question: 'Koja je pravilna rečenica?',
          correct: 'Ich gehe ins Kino.',
          answers: ['Ins Kino ich gehe.', 'Ich gehe ins Kino.', 'Gehe ich Kino ins.'],
          funFact: 'U njemačkom rečenica često počinje s drugom riječi ako je prva vremenska oznaka, ali glagol ide na drugo mjesto!'
        },
        {
          id: 'negation',
          title: 'Negacija: nicht / kein',
          description: '„nicht“ negira glagole i prideve, „kein“ se koristi sa imenicom u značenju "nijedan".',
          question: 'Kako se kaže "Nemam auto"?',
          correct: 'Ich habe kein Auto',
          answers: ['Ich habe nicht Auto', 'Ich habe kein Auto', 'Ich kein habe Auto'],
          funFact: '„kein“ se mijenja prema rodu imenice – npr. „keine Frau“, „kein Kind“'
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
    const lectionName = 'osnovna gramatika';
    const completedLections = JSON.parse(localStorage.getItem('completedLections') || '[]');

    if (!completedLections.includes(lectionName)) {
      completedLections.push(lectionName);
      localStorage.setItem('completedLections', JSON.stringify(completedLections));
    }

    this.router.navigate(['/lektion']);
  }
}
