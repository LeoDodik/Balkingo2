// TypeScript + Template logic for showing all wrong answers at end
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-animals',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.css']
})
export class AnimalsComponent {
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
      name: 'TIERE / ŽIVOTINJE',
      lessons: [
        {
          id: 'hund',
          title: 'der Hund',
          description: '„der Hund“ znači pas.',
          question: 'Kako se kaže "pas" na njemačkom?',
          correct: 'der Hund',
          answers: ['der Hund', 'die Katze', 'der Fisch'],
          funFact: 'Psi su najpopularnije kućne životinje u Njemačkoj.'
        },
        {
          id: 'katze',
          title: 'die Katze',
          description: '„die Katze“ znači mačka.',
          question: 'Kako se kaže "mačka" na njemačkom?',
          correct: 'die Katze',
          answers: ['die Katze', 'der Hund', 'das Pferd'],
          funFact: 'U Njemačkoj živi više od 16 miliona domaćih mačaka.'
        },
        {
          id: 'vogel',
          title: 'der Vogel',
          description: '„der Vogel“ znači ptica.',
          question: 'Kako se kaže "ptica" na njemačkom?',
          correct: 'der Vogel',
          answers: ['der Vogel', 'die Ente', 'die Kuh'],
          funFact: 'Njemačka ima mnogo vrsta ptica kao što su „Spatz“ (vrapčić) i „Amsel“ (kos).'
        },
        {
          id: 'pferd',
          title: 'das Pferd',
          description: '„das Pferd“ znači konj.',
          question: 'Kako se kaže "konj" na njemačkom?',
          correct: 'das Pferd',
          answers: ['das Pferd', 'die Kuh', 'der Fisch'],
          funFact: 'Njemačka je poznata po pasminama konja poput „Hannoveraner“.'
        },
        {
          id: 'fisch',
          title: 'der Fisch',
          description: '„der Fisch“ znači riba.',
          question: 'Kako se kaže "riba" na njemačkom?',
          correct: 'der Fisch',
          answers: ['der Fisch', 'die Katze', 'der Hund'],
          funFact: 'Riba je česta kućna životinja, ali i omiljena hrana u Njemačkoj.'
        },
        {
          id: 'kuh',
          title: 'die Kuh',
          description: '„die Kuh“ znači krava.',
          question: 'Kako se kaže "krava" na njemačkom?',
          correct: 'die Kuh',
          answers: ['die Kuh', 'das Pferd', 'der Vogel'],
          funFact: 'Krave su važne za proizvodnju mlijeka i sireva.'
        },
        {
          id: 'schaf',
          title: 'das Schaf',
          description: '„das Schaf“ znači ovca.',
          question: 'Kako se kaže "ovca" na njemačkom?',
          correct: 'das Schaf',
          answers: ['das Schaf', 'die Ziege', 'die Ente'],
          funFact: 'U Njemačkoj ima više od 1 miliona ovaca.'
        },
        {
          id: 'ente',
          title: 'die Ente',
          description: '„die Ente“ znači patka.',
          question: 'Kako se kaže "patka" na njemačkom?',
          correct: 'die Ente',
          answers: ['die Ente', 'der Vogel', 'die Kuh'],
          funFact: 'Patke su česte u njemačkim parkovima i rijekama.'
        },
        {
          id: 'ziege',
          title: 'die Ziege',
          description: '„die Ziege“ znači koza.',
          question: 'Kako se kaže "koza" na njemačkom?',
          correct: 'die Ziege',
          answers: ['die Ziege', 'das Schaf', 'das Pferd'],
          funFact: 'Koze su pametne životinje i često se drže na farmama.'
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
    const lectionName = 'životinje';
    const completedLections = JSON.parse(localStorage.getItem('completedLections') || '[]');

    if (!completedLections.includes(lectionName)) {
      completedLections.push(lectionName);
      localStorage.setItem('completedLections', JSON.stringify(completedLections));
    }

    this.router.navigate(['/lektion']);
  }
}
