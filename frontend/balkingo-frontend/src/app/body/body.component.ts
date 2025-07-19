// TypeScript + Template logic for showing all wrong answers at end
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent {
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
      name: 'KÖRPER / TIJELO',
      lessons: [
        {
          id: 'kopf',
          title: 'der Kopf',
          description: '„der Kopf“ znači glava.',
          question: 'Kako se kaže "glava" na njemačkom?',
          correct: 'der Kopf',
          answers: ['der Kopf', 'die Hand', 'das Bein'],
          funFact: 'Glava na njemačkom je „Kopf“ – kao u izrazu „Kopf hoch!“ (Glavu gore!).'
        },
        {
          id: 'auge',
          title: 'das Auge',
          description: '„das Auge“ znači oko.',
          question: 'Kako se kaže "oko" na njemačkom?',
          correct: 'das Auge',
          answers: ['das Auge', 'das Ohr', 'die Nase'],
          funFact: '„Augenblick“ doslovno znači treptaj oka, a koristi se kao „trenutak“.'
        },
        {
          id: 'ohr',
          title: 'das Ohr',
          description: '„das Ohr“ znači uho.',
          question: 'Kako se kaže "uho" na njemačkom?',
          correct: 'das Ohr',
          answers: ['das Ohr', 'die Nase', 'der Mund'],
          funFact: 'Izraz „ein Ohr haben für etwas“ znači imati smisla za nešto.'
        },
        {
          id: 'mund',
          title: 'der Mund',
          description: '„der Mund“ znači usta.',
          question: 'Kako se kaže "usta" na njemačkom?',
          correct: 'der Mund',
          answers: ['der Mund', 'das Auge', 'der Bauch'],
          funFact: 'Izraz „den Mund halten“ znači – biti tiho.'
        },
        {
          id: 'hand',
          title: 'die Hand',
          description: '„die Hand“ znači ruka (šaka).',
          question: 'Kako se kaže "ruka" (šaka) na njemačkom?',
          correct: 'die Hand',
          answers: ['die Hand', 'der Arm', 'das Bein'],
          funFact: '„Hand in Hand“ znači zajedno, u harmoniji.'
        },
        {
          id: 'arm',
          title: 'der Arm',
          description: '„der Arm“ znači ruka (nadlaktica).',
          question: 'Kako se kaže "ruka" (gornji dio) na njemačkom?',
          correct: 'der Arm',
          answers: ['der Arm', 'die Hand', 'das Bein'],
          funFact: '„Arme verschränken“ znači prekrstiti ruke – često kao znak otpora.'
        },
        {
          id: 'bein',
          title: 'das Bein',
          description: '„das Bein“ znači noga.',
          question: 'Kako se kaže "noga" na njemačkom?',
          correct: 'das Bein',
          answers: ['das Bein', 'der Fuß', 'der Arm'],
          funFact: '„Sich ein Bein brechen“ – izraz za lošu sreću (doslovno: slomiti nogu).'
        },
        {
          id: 'bauch',
          title: 'der Bauch',
          description: '„der Bauch“ znači trbuh.',
          question: 'Kako se kaže "trbuh" na njemačkom?',
          correct: 'der Bauch',
          answers: ['der Bauch', 'die Brust', 'der Rücken'],
          funFact: '„Bauchgefühl“ je poznat izraz – znači imati dobar „osjećaj u stomaku“ za nešto.'
        },
        {
          id: 'rücken',
          title: 'der Rücken',
          description: '„der Rücken“ znači leđa.',
          question: 'Kako se kaže "leđa" na njemačkom?',
          correct: 'der Rücken',
          answers: ['der Rücken', 'der Kopf', 'der Bauch'],
          funFact: '„Jemandem den Rücken kehren“ znači okrenuti nekome leđa.'
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
    const lectionName = 'tijelo';
    const completedLections = JSON.parse(localStorage.getItem('completedLections') || '[]');

    if (!completedLections.includes(lectionName)) {
      completedLections.push(lectionName);
      localStorage.setItem('completedLections', JSON.stringify(completedLections));
    }

    this.router.navigate(['/lektion']);
  }
}
