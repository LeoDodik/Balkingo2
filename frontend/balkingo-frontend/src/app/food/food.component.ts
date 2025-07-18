// TypeScript + Template logic for showing all wrong answers at end
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-food',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class  FoodComponent {
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
      name: 'HRANA I PIĆE',
      lessons: [
        {
          id: 'brot',
          title: 'Brot',
          description: 'Brot znači kruh. / Brot ist ein Grundnahrungsmittel aus Mehl.',
          question: 'Kako se kaže "kruh" na njemačkom?',
          correct: 'Brot',
          answers: ['Brot', 'Milch', 'Käse', 'Wasser'],
          funFact: 'Njemačka ima više od 300 vrsta hljeba — pravi raj za ljubitelje kruha!'
        },
        {
          id: 'kaese',
          title: 'Käse',
          description: 'Käse znači sir. / Käse wird aus Milch hergestellt.',
          question: 'Kako se kaže "sir" na njemačkom?',
          correct: 'Käse',
          answers: ['Käse', 'Wurst', 'Eier', 'Apfel'],
          funFact: 'U Njemačkoj postoji više od 600 vrsta sira!'
        },
        {
          id: 'wasser',
          title: 'Wasser',
          description: 'Wasser znači voda. / Wasser ist lebensnotwendig.',
          question: 'Kako se kaže "voda" na njemačkom?',
          correct: 'Wasser',
          answers: ['Wasser', 'Milch', 'Saft', 'Bier'],
          funFact: 'U Njemačkoj se često pije gazirana voda (Sprudelwasser).'
        },
        {
          id: 'apfel',
          title: 'Apfel',
          description: 'Apfel znači jabuka. / Der Apfel ist eine beliebte Frucht.',
          question: 'Kako se kaže "jabuka" na njemačkom?',
          correct: 'Apfel',
          answers: ['Apfel', 'Birne', 'Traube', 'Orange'],
          funFact: 'Njemačka je jedna od najvećih proizvođača jabuka u Evropi.'
        },
        {
          id: 'saft',
          title: 'Saft',
          description: 'Saft znači sok. / Saft ist ein Getränk aus Obst.',
          question: 'Kako se kaže "sok" na njemačkom?',
          correct: 'Saft',
          answers: ['Wasser', 'Saft', 'Käse', 'Brot'],
          funFact: 'Najpopularniji sok u Njemačkoj je Apfelsaft – sok od jabuke.'
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
    const lectionName = 'hrana/piće';
    const completedLections = JSON.parse(localStorage.getItem('completedLections') || '[]');

    if (!completedLections.includes(lectionName)) {
      completedLections.push(lectionName);
      localStorage.setItem('completedLections', JSON.stringify(completedLections));
    }

    this.router.navigate(['/lektion']);
  }
}
