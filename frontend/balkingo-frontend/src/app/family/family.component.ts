import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-family',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.css']
})
export class FamilyComponent {
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
      name: 'Familie und Beziehungen',
      lessons: [
        {
          id: 'mutter',
          title: 'Mutter',
          description: 'Mutter znači majka. / Mutter bedeutet "majka".',
          question: 'Kako se kaže "majka" na njemačkom?',
          correct: 'Mutter',
          answers: ['Mutter', 'Vater', 'Oma', 'Tante'],
          funFact: 'U svakodnevnom govoru djeca često kažu "Mutti" za majku.'
        },
        {
          id: 'vater',
          title: 'Vater',
          description: 'Vater znači otac. / Vater bedeutet "otac".',
          question: 'Kako se kaže "otac" na njemačkom?',
          correct: 'Vater',
          answers: ['Vater', 'Bruder', 'Onkel', 'Opa'],
          funFact: 'Kao i za majku, i za oca postoji umanjenica: "Papi".'
        },
        {
          id: 'bruder',
          title: 'Bruder',
          description: 'Bruder znači brat. / Bruder bedeutet "brat".',
          question: 'Kako se kaže "brat" na njemačkom?',
          correct: 'Bruder',
          answers: ['Bruder', 'Schwester', 'Cousin', 'Vater'],
          funFact: 'U Njemačkoj se često koristi izraz "kleiner Bruder" ili "großer Bruder".'
        },
        {
          id: 'schwester',
          title: 'Schwester',
          description: 'Schwester znači sestra. / Schwester bedeutet "sestra".',
          question: 'Kako se kaže "sestra" na njemačkom?',
          correct: 'Schwester',
          answers: ['Schwester', 'Mutter', 'Tante', 'Cousine'],
          funFact: 'Postoji i riječ "Halbschwester" za polusestru.'
        },
        {
          id: 'oma',
          title: 'Oma',
          description: 'Oma znači baka. / Oma bedeutet "baka".',
          question: 'Kako se kaže "baka" na njemačkom?',
          correct: 'Oma',
          answers: ['Oma', 'Opa', 'Tante', 'Mutter'],
          funFact: 'Oma je skraćenica za Großmutter, što doslovno znači "velika majka".'
        },
        {
          id: 'opa',
          title: 'Opa',
          description: 'Opa znači djed. / Opa bedeutet "djed".',
          question: 'Kako se kaže "djed" na njemačkom?',
          correct: 'Opa',
          answers: ['Opa', 'Vater', 'Bruder', 'Onkel'],
          funFact: 'Opa dolazi od "Großvater" – velika riječ za velikog čovjeka!'
        },
        {
          id: 'onkel',
          title: 'Onkel',
          description: 'Onkel znači ujak, stric ili tetak. / Onkel bedeutet "ujak/stric/tetak".',
          question: 'Kako se kaže "ujak" ili "stric" na njemačkom?',
          correct: 'Onkel',
          answers: ['Onkel', 'Tante', 'Bruder', 'Opa'],
          funFact: 'Na njemačkom se ista riječ "Onkel" koristi za oba — i očeva i majčina brata.'
        },
        {
          id: 'tante',
          title: 'Tante',
          description: 'Tante znači tetka. / Tante bedeutet "tetka".',
          question: 'Kako se kaže "tetka" na njemačkom?',
          correct: 'Tante',
          answers: ['Tante', 'Schwester', 'Oma', 'Mutter'],
          funFact: 'U svakodnevnom govoru djeca često kažu "Tantchen" kao umanjenicu od Tante.'
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
      : `❌ Netočno. Tačan odgovor je: ${correct}`;
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
    this.showIntro = false;
    this.showQuiz = false;
    this.answered = false;
    this.resultMessage = '';
    this.showWelcome = true;
    localStorage.removeItem('');
  }

  goToLection() {
    const lectionName = 'familija';
    const completedLections = JSON.parse(localStorage.getItem('completedLections') || '[]');

    if (!completedLections.includes(lectionName)) {
      completedLections.push(lectionName);
      localStorage.setItem('completedLections', JSON.stringify(completedLections));
    }

    this.router.navigate(['/lektion']);
  }
}
