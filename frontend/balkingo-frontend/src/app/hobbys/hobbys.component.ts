// TypeScript + Template logic for showing all wrong answers at end
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hobbys',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hobbys.component.html',
  styleUrls: ['./hobbys.component.css']
})
export class HobbysComponent  {
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
      name: 'Hobbys',
      lessons: [
        {
          id: 'lesen',
          title: 'Lesen',
          description: 'Lesen znači čitanje. / Lesen bedeutet Bücher oder Texte zu lesen.',
          question: 'Kako se kaže "čitanje" na njemačkom?',
          correct: 'Lesen',
          answers: ['Schwimmen', 'Lesen', 'Kochen', 'Spielen'],
          funFact: 'U Njemačkoj postoji mnogo čitalačkih klubova – čitanje je jako popularno!'
        },
        {
          id: 'schwimmen',
          title: 'Schwimmen',
          description: 'Schwimmen znači plivanje. / Schwimmen bedeutet, sich im Wasser fortzubewegen.',
          question: 'Kako se kaže "plivanje" na njemačkom?',
          correct: 'Schwimmen',
          answers: ['Schwimmen', 'Zeichnen', 'Wandern', 'Lesen'],
          funFact: 'Plivanje je omiljeni sport u Njemačkoj, posebno ljeti.'
        },
        {
          id: 'musik-hoeren',
          title: 'Musik hören',
          description: 'Musik hören znači slušati muziku. / Musik hören bedeutet, Musik mit den Ohren genießen.',
          question: 'Kako se kaže "slušati muziku" na njemačkom?',
          correct: 'Musik hören',
          answers: ['Musik hören', 'Tanzen', 'Singen', 'Lesen'],
          funFact: 'Njemačka ima bogatu muzičku kulturu – od Beethovena do Rammstein!'
        },
        {
          id: 'kochen',
          title: 'Kochen',
          description: 'Kochen znači kuhanje. / Kochen bedeutet, Essen zuzubereiten.',
          question: 'Kako se kaže "kuhanje" na njemačkom?',
          correct: 'Kochen',
          answers: ['Kochen', 'Backen', 'Essen', 'Trinken'],
          funFact: 'Njemačka kuhinja uključuje jela kao što su Bratwurst i Sauerkraut.'
        },
        {
          id: 'spielen',
          title: 'Spielen',
          description: 'Spielen znači igrati. / Spielen bedeutet, ein Spiel oder Instrument zu spielen.',
          question: 'Kako se kaže "igrati" na njemačkom?',
          correct: 'Spielen',
          answers: ['Spielen', 'Laufen', 'Zeichnen', 'Sitzen'],
          funFact: 'Djeca u Njemačkoj često igraju društvene igre sa porodicom.'
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
    const lectionName = 'aktivnosti';
    const completedLections = JSON.parse(localStorage.getItem('completedLections') || '[]');

    if (!completedLections.includes(lectionName)) {
      completedLections.push(lectionName);
      localStorage.setItem('completedLections', JSON.stringify(completedLections));
    }

    this.router.navigate(['/lektion']);
  }
}
