// TypeScript + Template logic for showing all wrong answers at end
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prateritum',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prateritum.component.html',
  styleUrls: ['./prateritum.component.css']
})
export class PrateritumComponent{
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
      name: 'PROŠLOST (PRÄTERITUM)',
      lessons: [
        {
          id: 'prae-uvod',
          title: 'Što je Präteritum?',
          description:
            'Präteritum (jednostavno prošlo vrijeme) najčešće se koristi u pisanju (knjige, članci, izvještaji). U govoru se uglavnom koristi Perfekt.',
          question: 'Koje se prošlo vrijeme češće koristi u govoru?',
          correct: 'Perfekt',
          answers: ['Perfekt', 'Präteritum', 'Plusquamperfekt'],
          funFact:
            'Glagoli „sein“, „haben“, „können“, „müssen“ i slični često se koriste u Präteritumu i u govoru.'
        },
        {
          id: 'prae-pravilni',
          title: 'Präteritum pravilnih glagola',
          description:
            'Pravilni glagoli u Präteritumu dobijaju nastavke: -te, -test, -te, -ten, -tet, -ten.',
          question: 'Kako glasi Präteritum oblika „wir“ od glagola „machen“?',
          correct: 'wir machten',
          answers: ['wir machen', 'wir machten', 'wir machteten'],
          funFact:
            'Ako je korijen glagola završavao na -t ili -d, često se umeće dodatno „e“ (npr. „arbeiten“ → „ich arbeitete“).'
        },
        {
          id: 'prae-nepravilni',
          title: 'Nepravilni glagoli u Präteritumu',
          description:
            'Nepravilni glagoli mijenjaju korijen (npr. sein → war-, haben → hatt-, gehen → ging-).',
          question: 'Kako glasi oblik za „ich“ od glagola „sein“ u Präteritumu?',
          correct: 'ich war',
          answers: ['ich war', 'ich bin', 'ich gewesen'],
          funFact:
            'Najčešći nepravilni glagoli u Präteritumu: sein (war), haben (hatte), gehen (ging), kommen (kam), sehen (sah).'
        },
        {
          id: 'prae-recap',
          title: 'Präteritum – završni kviz',
          description:
            'Ponovimo najvažnije iz Präterituma pravilnih i nepravilnih glagola.',
          question: 'Koji je tačan Präteritum oblik rečenice „On je imao auto“?',
          correct: 'Er hatte ein Auto.',
          answers: [
            'Er hat ein Auto gehabt.',
            'Er hatte ein Auto.',
            'Er gewesen ein Auto.'
          ],
          funFact:
            'U narativnim tekstovima (priče, romani), gotovo uvijek ćeš vidjeti Präteritum umjesto Perfekta.'
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
    const lectionName = 'präteritum';
    const completedLections = JSON.parse(localStorage.getItem('completedLections') || '[]');

    if (!completedLections.includes(lectionName)) {
      completedLections.push(lectionName);
      localStorage.setItem('completedLections', JSON.stringify(completedLections));
    }

    this.router.navigate(['/lektion']);
  }
}
