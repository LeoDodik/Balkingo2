// TypeScript + Template logic for showing all wrong answers at end
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-colors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.css']
})
export class ColorsComponent  {
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
      name: 'BOJE',
      lessons: [
        {
          id: 'rot',
          title: 'Rot',
          description: 'Rot znači crvena. / Rot ist die Farbe des Feuers und der Liebe.',
          question: 'Kako se kaže "crvena" na njemačkom?',
          correct: 'Rot',
          answers: ['Blau', 'Grün', 'Rot', 'Gelb'],
          funFact: 'Boja "rot" često se koristi za znakove upozorenja.'
        },
        {
          id: 'blau',
          title: 'Blau',
          description: 'Blau znači plava. / Blau erinnert an den Himmel und das Meer.',
          question: 'Kako se kaže "plava" na njemačkom?',
          correct: 'Blau',
          answers: ['Blau', 'Schwarz', 'Braun', 'Weiß'],
          funFact: 'Plava se u Njemačkoj često povezuje s mirom i pouzdanošću.'
        },
        {
          id: 'gruen',
          title: 'Grün',
          description: 'Grün znači zelena. / Grün steht für Natur und Frische.',
          question: 'Kako se kaže "zelena" na njemačkom?',
          correct: 'Grün',
          answers: ['Grün', 'Gelb', 'Rot', 'Pink'],
          funFact: 'Zelena je boja semafora koja označava "idi".'
        },
        {
          id: 'gelb',
          title: 'Gelb',
          description: 'Gelb znači žuta. / Gelb ist die Farbe der Sonne.',
          question: 'Kako se kaže "žuta" na njemačkom?',
          correct: 'Gelb',
          answers: ['Orange', 'Gelb', 'Blau', 'Schwarz'],
          funFact: 'U Njemačkoj se boja žuta često koristi u poštanskim službama (Deutsche Post).'
        },
        {
          id: 'schwarz',
          title: 'Schwarz',
          description: 'Schwarz znači crna. / Schwarz ist die Farbe der Dunkelheit.',
          question: 'Kako se kaže "crna" na njemačkom?',
          correct: 'Schwarz',
          answers: ['Schwarz', 'Weiß', 'Grün', 'Braun'],
          funFact: 'Schwarz je često povezana s elegancijom, ali i misterijom.'
        },
        {
          id: 'weiss',
          title: 'Weiß',
          description: 'Weiß znači bijela. / Weiß steht für Reinheit und Frieden.',
          question: 'Kako se kaže "bijela" na njemačkom?',
          correct: 'Weiß',
          answers: ['Weiß', 'Schwarz', 'Gelb', 'Rot'],
          funFact: 'Nevjeste u Njemačkoj često nose bijelo jer simbolizira čistoću.'
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
    const lectionName = 'boje';
    const completedLections = JSON.parse(localStorage.getItem('completedLections') || '[]');

    if (!completedLections.includes(lectionName)) {
      completedLections.push(lectionName);
      localStorage.setItem('completedLections', JSON.stringify(completedLections));
    }

    this.router.navigate(['/lektion']);
  }
}
