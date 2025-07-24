// TypeScript + Template logic for showing all wrong answers at end
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-futur1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './futur1.component.html',
  styleUrls: ['./futur1.component.css']
})
export class Futur1Component {
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
      name: 'FUTUR I',
      lessons: [
        {
          id: 'futur-uvod',
          title: 'Što je Futur I?',
          description:
            'Futur I se koristi za izražavanje budućih radnji, namjera ili pretpostavki o sadašnjosti ili budućnosti.',
          question: 'Koja je osnovna pomoćna riječ koja se koristi za Futur I?',
          correct: 'werden',
          answers: ['haben', 'sein', 'werden'],
          funFact:
            'U svakodnevnom govoru, mnogi govornici koriste Präsens za budućnost ako je kontekst jasan, ali Futur I je precizniji.'
        },
        {
          id: 'futur-forma',
          title: 'Kako se gradi Futur I?',
          description:
            'Formula: werden (konjugirano) + infinitiv glavnog glagola na kraju rečenice.',
          question: 'Koja je ispravna Futur I rečenica?',
          correct: 'Ich werde morgen lernen.',
          answers: [
            'Ich werde morgen lernen.',
            'Ich morgen werde lernen.',
            'Ich habe morgen gelernt.'
          ],
          funFact:
            '„werden“ je nepravilni glagol: ich werde, du wirst, er/sie/es wird, wir werden, ihr werdet, sie/Sie werden.'
        },
        {
          id: 'futur-pretpostavka',
          title: 'Futur I kao pretpostavka',
          description:
            'Futur I se često koristi i za izražavanje pretpostavke o sadašnjosti ili budućnosti.',
          question: 'Koja rečenica koristi Futur I kao pretpostavku?',
          correct: 'Er wird jetzt zu Hause sein.',
          answers: [
            'Er ist jetzt zu Hause.',
            'Er wird jetzt zu Hause sein.',
            'Er war zu Hause.'
          ],
          funFact:
            'Kada želiš zvučati pristojno ili nesigurno, Futur I je odličan izbor za izražavanje pretpostavki.'
        },
        {
          id: 'futur-recap',
          title: 'Futur I – završni kviz',
          description:
            'Provjerimo tvoje znanje o formiranju i upotrebi vremena Futur I.',
          question: 'Kako ćeš reći: „Mi ćemo putovati u Njemačku.“?',
          correct: 'Wir werden nach Deutschland reisen.',
          answers: [
            'Wir werden nach Deutschland reisen.',
            'Wir sind nach Deutschland gereist.',
            'Wir reisen nach Deutschland gewesen.'
          ],
          funFact:
            'Futur I je vrlo transparentan za formiranje – jednom kad znaš „werden“, sve je jednostavno!'
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
    const lectionName = 'futur 1';
    const completedLections = JSON.parse(localStorage.getItem('completedLections') || '[]');

    if (!completedLections.includes(lectionName)) {
      completedLections.push(lectionName);
      localStorage.setItem('completedLections', JSON.stringify(completedLections));
    }

    this.router.navigate(['/lektion']);
  }
}
