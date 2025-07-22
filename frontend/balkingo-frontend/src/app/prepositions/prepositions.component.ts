// TypeScript + Template logic for showing all wrong answers at end
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prepositions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prepositions.component.html',
  styleUrls: ['./prepositions.component.css']
})
export class PrepositionsComponent {
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
      name: 'Prijedlozi',
      lessons: [
        {
          id: 'lokalni-prijedlozi',
          title: 'Prijedlozi mjesta',
          description: 'Prijedlozi koji pokazuju gdje se nešto nalazi (npr. auf, unter, in, neben).',
          question: 'Kako kažeš "Knjiga je na stolu"?',
          correct: 'Das Buch liegt auf dem Tisch.',
          answers: [
            'Das Buch ist neben dem Tisch.',
            'Das Buch liegt auf dem Tisch.',
            'Das Buch ist unter dem Bett.'
          ],
          funFact: 'Njemački prijedlozi često određuju padež – lokalni prijedlozi obično traže akuzativ ili dativ.'
        },
        {
          id: 'temporalni-prijedlozi',
          title: 'Prijedlozi vremena',
          description: 'Prijedlozi koji se odnose na vrijeme (npr. um, am, im).',
          question: 'Kako kažeš "Film počinje u 8 sati"?',
          correct: 'Der Film beginnt um 20 Uhr.',
          answers: [
            'Der Film beginnt am Montag.',
            'Der Film beginnt im Juli.',
            'Der Film beginnt um 20 Uhr.'
          ],
          funFact: 'Za izražavanje vremena koristi se: "um" za sate, "am" za dane, "im" za mjesece/godine.'
        },
        {
          id: 'prijedlozi-kretanja',
          title: 'Prijedlozi kretanja',
          description: 'Prijedlozi koji označavaju smjer ili kretanje (npr. nach, zu, aus, in).',
          question: 'Kako kažeš "Idem u školu"?',
          correct: 'Ich gehe in die Schule.',
          answers: [
            'Ich komme aus Spanien.',
            'Ich gehe in die Schule.',
            'Ich fahre nach Deutschland.'
          ],
          funFact: 'Prijedlozi kretanja često koriste akuzativ i mogu mijenjati značenje u kombinaciji s glagolom.'
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
    const lectionName = 'prijedlozi';
    const completedLections = JSON.parse(localStorage.getItem('completedLections') || '[]');

    if (!completedLections.includes(lectionName)) {
      completedLections.push(lectionName);
      localStorage.setItem('completedLections', JSON.stringify(completedLections));
    }

    this.router.navigate(['/lektion']);
  }
}
