// TypeScript + Template logic for showing all wrong answers at end
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clothes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clothes.component.html',
  styleUrls: ['./clothes.component.css']
})
export class ClothesComponent {
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
      name: 'Odjeća i obuća',
      lessons: [
        {
          id: 'hemd',
          title: 'Hemd',
          description: 'Hemd znači košulja. / Hemd ist ein Kleidungsstück für den Oberkörper.',
          question: 'Kako se kaže "košulja" na njemačkom?',
          correct: 'Hemd',
          answers: ['Hemd', 'Kleid', 'Schuh', 'Hose'],
          funFact: 'Njemačka riječ "Hemd" dolazi od staronjemačke "hemeti".'
        },
        {
          id: 'kleid',
          title: 'Kleid',
          description: 'Kleid znači haljina. / Kleid ist ein langes Kleidungsstück für Frauen.',
          question: 'Kako se kaže "haljina" na njemačkom?',
          correct: 'Kleid',
          answers: ['Kleid', 'Jacke', 'Rock', 'Hemd'],
          funFact: 'U Njemačkoj su "Sommerkleider" popularne ljeti.'
        },
        {
          id: 'hose',
          title: 'Hose',
          description: 'Hose znači hlače. / Hose ist ein Kleidungsstück für die Beine.',
          question: 'Kako se kaže "hlače" na njemačkom?',
          correct: 'Hose',
          answers: ['Hose', 'Mantel', 'Tasche', 'Kleid'],
          funFact: 'Traperice se na njemačkom kažu "Jeanshose".'
        },
        {
          id: 'rock',
          title: 'Rock',
          description: 'Rock znači suknja. / Rock ist ein Kleidungsstück für Frauen.',
          question: 'Kako se kaže "suknja" na njemačkom?',
          correct: 'Rock',
          answers: ['Rock', 'Schal', 'Jacke', 'Hose'],
          funFact: 'Riječ "Rock" se koristi i za glazbeni žanr!'
        },
        {
          id: 'jacke',
          title: 'Jacke',
          description: 'Jacke znači jakna. / Jacke ist ein Kleidungsstück für draußen.',
          question: 'Kako se kaže "jakna" na njemačkom?',
          correct: 'Jacke',
          answers: ['Jacke', 'Hemd', 'Tasche', 'Pullover'],
          funFact: 'Zimi se često koristi "Winterjacke".'
        },
        {
          id: 'schuhe',
          title: 'Schuhe',
          description: 'Schuhe znači cipele. / Schuhe trägt man an den Füßen.',
          question: 'Kako se kaže "cipele" na njemačkom?',
          correct: 'Schuhe',
          answers: ['Schuhe', 'Socken', 'Jacke', 'Mütze'],
          funFact: 'U Njemačkoj je uobičajeno izuvati se kod ulaska u stan.'
        },
        {
          id: 'stiefel',
          title: 'Stiefel',
          description: 'Stiefel znači čizme. / Stiefel sind hohe Schuhe für den Winter.',
          question: 'Kako se kaže "čizme" na njemačkom?',
          correct: 'Stiefel',
          answers: ['Stiefel', 'Schuhe', 'Sandalen', 'Hose'],
          funFact: 'U zimskoj sezoni su "Winterstiefel" jako tražene.'
        },
        {
          id: 'socken',
          title: 'Socken',
          description: 'Socken znači čarape. / Socken trägt man unter den Schuhen.',
          question: 'Kako se kaže "čarape" na njemačkom?',
          correct: 'Socken',
          answers: ['Socken', 'Handschuhe', 'Schuhe', 'Mütze'],
          funFact: 'U Njemačkoj postoje i "bunte Socken" kao modni dodatak.'
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

  shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  goToLection() {
    const lectionName = 'odjeća/obuća';
    const completedLections = JSON.parse(localStorage.getItem('completedLections') || '[]');

    if (!completedLections.includes(lectionName)) {
      completedLections.push(lectionName);
      localStorage.setItem('completedLections', JSON.stringify(completedLections));
    }

    this.router.navigate(['/lektion']);
  }
}
