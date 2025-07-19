// TypeScript + Template logic for showing all wrong answers at end
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-furniture',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './furniture.component.html',
  styleUrls: ['./furniture.component.css']
})
export class FurnitureComponent {
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
      name: 'MÖBEL / NAMJEŠTAJ',
      lessons: [
        {
          id: 'stuhl',
          title: 'der Stuhl',
          description: '„der Stuhl“ znači stolica.',
          question: 'Kako se kaže "stolica" na njemačkom?',
          correct: 'der Stuhl',
          answers: ['der Stuhl', 'das Bett', 'der Tisch'],
          funFact: 'U njemačkom jeziku „Stuhl“ ima i značenje „stolica“ kao u medicinskom smislu.'
        },
        {
          id: 'tisch',
          title: 'der Tisch',
          description: '„der Tisch“ znači stol.',
          question: 'Kako se kaže "stol" na njemačkom?',
          correct: 'der Tisch',
          answers: ['der Tisch', 'das Sofa', 'der Schrank'],
          funFact: 'U mnogim njemačkim domovima stol se koristi i kao radna površina.'
        },
        {
          id: 'bett',
          title: 'das Bett',
          description: '„das Bett“ znači krevet.',
          question: 'Kako se kaže "krevet" na njemačkom?',
          correct: 'das Bett',
          answers: ['das Bett', 'der Stuhl', 'die Lampe'],
          funFact: '„Bett“ dolazi od staronjemačke riječi „betti“ što znači mjesto za ležanje.'
        },
        {
          id: 'schrank',
          title: 'der Schrank',
          description: '„der Schrank“ znači ormar.',
          question: 'Kako se kaže "ormar" na njemačkom?',
          correct: 'der Schrank',
          answers: ['der Schrank', 'der Tisch', 'das Sofa'],
          funFact: 'Tipičan „Kleiderschrank“ koristi se za odjeću i često ima ogledalo.'
        },
        {
          id: 'sofa',
          title: 'das Sofa',
          description: '„das Sofa“ znači kauč.',
          question: 'Kako se kaže "kauč" na njemačkom?',
          correct: 'das Sofa',
          answers: ['das Sofa', 'der Stuhl', 'das Bett'],
          funFact: '„Sofa“ i „Couch“ znače isto — oba su uobičajena u govoru.'
        },
        {
          id: 'lampe',
          title: 'die Lampe',
          description: '„die Lampe“ znači lampa.',
          question: 'Kako se kaže "lampa" na njemačkom?',
          correct: 'die Lampe',
          answers: ['die Lampe', 'der Spiegel', 'der Schrank'],
          funFact: '„Lampe“ se koristi i za stolne i za stropne lampe.'
        },
        {
          id: 'spiegel',
          title: 'der Spiegel',
          description: '„der Spiegel“ znači ogledalo.',
          question: 'Kako se kaže "ogledalo" na njemačkom?',
          correct: 'der Spiegel',
          answers: ['der Spiegel', 'das Bett', 'die Lampe'],
          funFact: '„Spiegel“ je i ime poznatog njemačkog magazina.'
        },
        {
          id: 'kommode',
          title: 'die Kommode',
          description: '„die Kommode“ znači komoda.',
          question: 'Kako se kaže "komoda" na njemačkom?',
          correct: 'die Kommode',
          answers: ['die Kommode', 'der Schrank', 'der Stuhl'],
          funFact: 'Komoda je često korištena za odlaganje donjeg rublja i čarapa.'
        },
        {
          id: 'teppich',
          title: 'der Teppich',
          description: '„der Teppich“ znači tepih.',
          question: 'Kako se kaže "tepih" na njemačkom?',
          correct: 'der Teppich',
          answers: ['der Teppich', 'das Sofa', 'der Tisch'],
          funFact: 'Tepisi su česti u dnevnim sobama i spavaćim sobama u Njemačkoj.'
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
    const lectionName = 'namještaj';
    const completedLections = JSON.parse(localStorage.getItem('completedLections') || '[]');

    if (!completedLections.includes(lectionName)) {
      completedLections.push(lectionName);
      localStorage.setItem('completedLections', JSON.stringify(completedLections));
    }

    this.router.navigate(['/lektion']);
  }
}
