// TypeScript + Template logic for showing all wrong answers at end
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-futur2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './futur2.component.html',
  styleUrls: ['./futur2.component.css']
})
export class Futur2Component {
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
      name: 'FUTUR II',
      lessons: [
        {
          id: 'futur2-uvod',
          title: 'Što je Futur II?',
          description:
            'Futur II se koristi za radnje koje će biti završene u budućnosti ili za pretpostavke o prošlim događajima.',
          question: 'Koji glagol se koristi kao pomoćni u Futur II?',
          correct: 'werden',
          answers: ['haben', 'werden', 'sein'],
          funFact:
            'Futur II kombinuje „werden“ i perfektni oblik glavnog glagola.'
        },
        {
          id: 'futur2-forma',
          title: 'Kako se gradi Futur II?',
          description:
            'Formula: werden (konjugirano) + perfekt particip glavnog glagola + „haben/sein“ u infinitivu.',
          question: 'Koja rečenica je ispravna u Futur II?',
          correct: 'Ich werde gegessen haben.',
          answers: [
            'Ich werde gegessen haben.',
            'Ich gegessen werde haben.',
            'Ich werde haben gegessen.'
          ],
          funFact:
            'Za glagole kretanja koristiš „sein“: „Ich werde gegangen sein.“'
        },
        {
          id: 'futur2-upotreba',
          title: 'Kada koristiti Futur II?',
          description:
            'Futur II opisuje radnju koja će biti završena do određenog trenutka u budućnosti ili izražava nagađanje o prošlosti.',
          question: 'Koja rečenica izražava završetak radnje u budućnosti?',
          correct: 'Bis morgen werde ich es erledigt haben.',
          answers: [
            'Bis morgen werde ich es erledigt haben.',
            'Ich habe es gestern erledigt.',
            'Ich werde es erledigen.'
          ],
          funFact:
            'Futur II je rjeđe korišten u svakodnevnom govoru, ali često u pisanoj formi i formalnim situacijama.'
        },
        {
          id: 'futur2-recap',
          title: 'Futur II – završni kviz',
          description: 'Provjerimo tvoje znanje o vremenu Futur II.',
          question: 'Kako ćeš reći: „Oni će već otići.“?',
          correct: 'Sie werden schon gegangen sein.',
          answers: [
            'Sie werden schon gegangen sein.',
            'Sie sind schon gegangen.',
            'Sie werden gehen schon sein.'
          ],
          funFact:
            'Kombinacija perfekt participa i „haben/sein“ je ključ za Futur II.'
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
    const lectionName = 'futur 2';
    const completedLections = JSON.parse(localStorage.getItem('completedLections') || '[]');

    if (!completedLections.includes(lectionName)) {
      completedLections.push(lectionName);
      localStorage.setItem('completedLections', JSON.stringify(completedLections));
    }

    this.router.navigate(['/lektion']);
  }
}
