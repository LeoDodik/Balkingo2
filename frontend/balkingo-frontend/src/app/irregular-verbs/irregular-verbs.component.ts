import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-irregular-verbs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './irregular-verbs.component.html',
  styleUrls: ['./irregular-verbs.component.css']
})
export class IrregularVerbsComponent {
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
      name: 'Nepravilni glagoli',
      lessons: [
        {
          id: 'nepravilni-uvod',
          title: 'Šta su nepravilni glagoli?',
          description: 'Nepravilni glagoli u njemačkom jeziku mijenjaju korijen prilikom konjugacije.',
          question: 'Kako glasi "ja sam" na njemačkom?',
          correct: 'ich bin',
          answers: ['ich bin', 'ich bist', 'ich ist'],
          funFact: 'Glagol "sein" je jedan od najvažnijih nepravilnih glagola u jeziku!'
        },
        {
          id: 'sein',
          title: 'Konjugacija: sein (biti)',
          description: 'Nepravilni glagol "sein" je vrlo čest. Pogledaj tabelu!',
          question: 'Kako glasi "ti si"?',
          correct: 'du bist',
          answers: ['du bist', 'du bin', 'du ist'],
          funFact: 'Oblici glagola "sein" potpuno su nepravilni i moraju se naučiti napamet.'
        },
        {
          id: 'haben',
          title: 'Konjugacija: haben (imati)',
          description: 'Još jedan čest nepravilni glagol – haben.',
          question: 'Kako se kaže "on ima"?',
          correct: 'er hat',
          answers: ['er hat', 'er haben', 'er hast'],
          funFact: 'Za "haben" također postoji nepravilna promjena kod "du" i "er".'
        },
        {
          id: 'gehen',
          title: 'Konjugacija: gehen (ići)',
          description: 'Glagol "gehen" znači "ići", iako izgleda pravilno, ima nepravilnosti u prošlim vremenima.',
          question: 'Kako glasi "mi idemo"?',
          correct: 'wir gehen',
          answers: ['wir gehen', 'wir geht', 'wir gehst'],
          funFact: 'U perfektu "gehen" koristi glagol "sein" kao pomoćni glagol: Ich bin gegangen.'
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
      localStorage.setItem('irregularCompleted', 'true');
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
    localStorage.removeItem('irregularCompleted');
  }

  goToLection() {
    const lectionName = 'nepravilni glagoli';
    const completedLections = JSON.parse(localStorage.getItem('completedLections') || '[]');

    if (!completedLections.includes(lectionName)) {
      completedLections.push(lectionName);
      localStorage.setItem('completedLections', JSON.stringify(completedLections));
    }

    this.router.navigate(['/lektion']);
  }
}
