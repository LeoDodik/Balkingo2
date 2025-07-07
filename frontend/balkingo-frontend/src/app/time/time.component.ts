import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-time',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css']
})
export class TimeComponent {
  currentSectionIndex = 0;
  currentLessonIndex = 0;
  showIntro = false;
  showQuiz = false;
  showWelcome = true;
  answered = false;
  resultMessage = '';
  completedLessonsList: string[] = [];

  constructor(private router: Router) {}

  sections = [
    {
      name: 'Sekcija 1',
      lessons: [
        {
          id: 'koliko-je-sati',
          title: 'Wie spät ist es?',
          description: 'Osnovno pitanje za vrijeme je “Wie spät ist es?” što znači “Koliko je sati?”.',
          question: 'Što znači “Wie spät ist es?”',
          correct: 'Koliko je sati?',
          answers: ['Koliko imaš godina?', 'Gdje si?', 'Koliko je sati?', 'Koji je dan?'],
          funFact: 'U njemačkom jeziku često se koristi "Wie spät ist es?" kada želimo pitati koliko je sati – doslovno "Koliko je kasno?".'
        },
        {
          id: 'viertel-nach',
          title: 'Viertel nach – Četvrt nakon',
          description: '“Viertel nach drei” znači “četvrt nakon tri” ili 3:15.',
          question: 'Što znači “Viertel nach drei”?',
          correct: '3:15',
          answers: ['3:45', '2:45', '3:15', '2:15'],
          funFact: 'U njemačkom se koristi izraz "Viertel nach" (četvrt nakon), dok u hrvatskom češće kažemo "petnaest nakon".'
        },
        {
          id: 'viertel-vor',
          title: 'Viertel vor – Četvrt do',
          description: '“Viertel vor vier” znači “četvrt do četiri” ili 3:45.',
          question: 'Što znači “Viertel vor vier”?',
          correct: '3:45',
          answers: ['4:15', '3:45', '3:15', '4:45'],
          funFact: 'Ovdje "Viertel vor" znači doslovno "četvrt prije". Dakle, 15 minuta prije punog sata.'
        },
        {
          id: 'halb',
          title: 'Halb – Pola sata prije',
          description: '“Halb vier” znači “pola četiri”, što zapravo znači 3:30.',
          question: 'Što znači “Halb vier”?',
          correct: '3:30',
          answers: ['3:00', '3:30', '4:30', '4:00'],
          funFact: 'Za razliku od hrvatskog gdje kažemo "pola četiri" i mislimo 3:30, u njemačkom to isto znači "pol sata do četiri".'
        },
        {
          id: 'točan-sat',
          title: 'Es ist drei Uhr',
          description: '“Es ist drei Uhr” znači “Tri je sata” ili 3:00.',
          question: 'Što znači “Es ist drei Uhr”?',
          correct: '3:00',
          answers: ['3:00', '4:00', '2:00', '3:30'],
          funFact: 'Dodavanjem “Uhr” nakon broja pokazujemo da se radi o točnom satu. "Drei Uhr" = 3:00.'
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
  }

  checkAnswer(selected: string) {
    this.answered = true;
    const correct = this.currentLesson.correct;
    this.resultMessage = selected === correct
      ? '✅ Bravo! Točan odgovor.'
      : `❌ Netočno. Točan odgovor je: ${correct}`;
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
      localStorage.setItem('timeProgress', 'completed');
    }
  }

  restart() {
    this.currentSectionIndex = 0;
    this.currentLessonIndex = 0;
    this.completedLessonsList = [];
    this.showIntro = false;
    this.showQuiz = false;
    this.answered = false;
    this.resultMessage = '';
    this.showWelcome = true;
    localStorage.removeItem('timeProgress');
  }

  goToLection() {
    const lectionName = 'time';
    const completedLections = JSON.parse(localStorage.getItem('completedLections') || '[]');

    if (!completedLections.includes(lectionName)) {
      completedLections.push(lectionName);
      localStorage.setItem('completedLections', JSON.stringify(completedLections));
    }

    this.router.navigate(['/progress']);
  }
}
