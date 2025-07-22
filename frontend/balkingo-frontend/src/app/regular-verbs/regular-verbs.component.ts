// TypeScript + Template logic for showing all wrong answers at end
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-regular-verbs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './regular-verbs.component.html',
  styleUrls: ['./regular-verbs.component.css']
})
export class RegularVerbsComponent{
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
      name: 'Pravilni glagoli',
      lessons: [
        {
          id: 'pravilni-uvod',
          title: 'Šta su pravilni glagoli?',
          description: 'Pravilni glagoli u njemačkom jeziku se konjugiraju prema pravilnim obrascima.',
          question: 'Kako glasi "ja igram" na njemačkom?',
          correct: 'Ich spiele',
          answers: ['Ich spiel', 'Ich spiele', 'Ich spielst'],
          funFact: 'Većina glagola u njemačkom jeziku su pravilni – odlična vijest za početnike!'
        },
        {
          id: 'spielen',
          title: 'Konjugacija: spielen (igrati)',
          description: 'Glagol "spielen" se konjugira pravilno. Pogledaj tabelu!',
          question: 'Kako kažeš "oni igraju"?',
          correct: 'sie spielen',
          answers: ['sie spielt', 'sie spielst', 'sie spielen'],
          funFact: 'Za glagol "spielen", završetci su standardni: -e, -st, -t, -en, -t, -en.'
        },
        {
          id: 'machen',
          title: 'Konjugacija: machen (raditi)',
          description: 'Još jedan primjer pravilnog glagola – machen.',
          question: 'Kako kažeš "ti radiš"?',
          correct: 'du machst',
          answers: ['du macht', 'du machst', 'du mache'],
          funFact: 'Glagoli koji završavaju na -en u infinitivu obično su pravilni.'
        },
        {
          id: 'leben',
          title: 'Konjugacija: leben (živjeti)',
          description: 'Glagol "leben" se konjugira po istom obrascu.',
          question: 'Kako kažeš "mi živimo"?',
          correct: 'wir leben',
          answers: ['wir lebt', 'wir leben', 'wir lebe'],
          funFact: 'Za "wir" se uvijek koristi ista forma kao infinitiv: leben.'
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
    const lectionName = 'pravilni glagoli';
    const completedLections = JSON.parse(localStorage.getItem('completedLections') || '[]');

    if (!completedLections.includes(lectionName)) {
      completedLections.push(lectionName);
      localStorage.setItem('completedLections', JSON.stringify(completedLections));
    }

    this.router.navigate(['/lektion']);
  }
}
