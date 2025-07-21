// TypeScript + Template logic for showing all wrong answers at end
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-verbs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-verbs.component.html',
  styleUrls: ['./modal-verbs.component.css']
})
export class ModalVerbsComponent {
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
    // ... your existing sections here ...,

    {
      name: 'MODALNE RADNJE / MODALNI GLAGOLI',
      lessons: [
        {
          id: 'modal-muessen',
          title: 'Glagol "müssen"',
          description: '„müssen“ znači „morati“ ili „biti primoran“. Koristi se za izražavanje obaveze.',
          question: 'Kako se kaže "Ja moram učiti" na njemačkom?',
          correct: 'Ich muss lernen',
          answers: ['Ich will lernen', 'Ich darf lernen', 'Ich muss lernen', 'Ich kann lernen'],
          funFact: 'Glagol „müssen“ koristi se kada nešto nije izbor, već nužnost.'
        },
        {
          id: 'modal-wollen',
          title: 'Glagol "wollen"',
          description: '„wollen“ znači „htjeti“ ili „želeti“. Koristi se za izražavanje želje ili namjere.',
          question: 'Kako se kaže "Ti želiš jesti" na njemačkom?',
          correct: 'Du willst essen',
          answers: ['Du musst essen', 'Du willst essen', 'Du darfst essen', 'Du kannst essen'],
          funFact: '„wollen“ je vrlo važan za izražavanje namjere i želje u njemačkom jeziku.'
        },
        {
          id: 'modal-duerfen',
          title: 'Glagol "dürfen"',
          description: '„dürfen“ znači „smjeti“ ili „imati dozvolu“. Koristi se za izražavanje dopuštenja.',
          question: 'Kako se kaže "On smije ići" na njemačkom?',
          correct: 'Er darf gehen',
          answers: ['Er muss gehen', 'Er darf gehen', 'Er will gehen', 'Er kann gehen'],
          funFact: '„dürfen“ često koristimo kada pitamo za dozvolu ili dajemo dozvolu.'
        },
        {
          id: 'modal-koennen',
          title: 'Glagol "können"',
          description: '„können“ znači „moći“ ili „biti u stanju“. Koristi se za izražavanje sposobnosti ili mogućnosti.',
          question: 'Kako se kaže "Mi možemo plivati" na njemačkom?',
          correct: 'Wir können schwimmen',
          answers: ['Wir wollen schwimmen', 'Wir müssen schwimmen', 'Wir können schwimmen', 'Wir dürfen schwimmen'],
          funFact: '„können“ je važan za izražavanje sposobnosti i mogućnosti.'
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
    const lectionName = 'modalni glagoli';
    const completedLections = JSON.parse(localStorage.getItem('completedLections') || '[]');

    if (!completedLections.includes(lectionName)) {
      completedLections.push(lectionName);
      localStorage.setItem('completedLections', JSON.stringify(completedLections));
    }

    this.router.navigate(['/lektion']);
  }
}
