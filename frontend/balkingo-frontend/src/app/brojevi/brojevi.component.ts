// TypeScript + Template logic for showing all wrong answers at end
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-brojevi',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brojevi.component.html',
  styleUrls: ['./brojevi.component.css']
})
export class  BrojeviComponent {
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
      name: 'Brojevi 1-10',
      lessons: [
        { id: 'eins', title: 'Eins = Jedan', description: '“Eins” znači “jedan” na njemačkom jeziku.', question: 'Što znači “eins”?', correct: 'Jedan', answers: ['Pet', 'Tri', 'Jedan', 'Dva'] },
        { id: 'zwei', title: 'Zwei = Dva', description: '“Zwei” znači “dva”.', question: 'Što znači “zwei”?', correct: 'Dva', answers: ['Tri', 'Jedan', 'Pet', 'Dva'] },
        { id: 'drei', title: 'Drei = Tri', description: '“Drei” znači “tri”.', question: 'Što znači “drei”?', correct: 'Tri', answers: ['Četiri', 'Tri', 'Pet', 'Dva'] },
        { id: 'vier', title: 'Vier = Četiri', description: '“Vier” znači “četiri”.', question: 'Što znači “vier”?', correct: 'Četiri', answers: ['Pet', 'Tri', 'Četiri', 'Jedan'] },
        { id: 'fuenf', title: 'Fünf = Pet', description: '“Fünf” znači “pet”.', question: 'Kako se kaže "pet" na njemačkom?', correct: 'fünf', answers: ['vier', 'fünf', 'sechs', 'acht'] },
        { id: 'sechs', title: 'Sechs = Šest', description: '“Sechs” znači “šest”.', question: 'Što znači “sechs”?', correct: 'Šest', answers: ['Pet', 'Sedam', 'Šest', 'Deset'] },
        { id: 'sieben', title: 'Sieben = Sedam', description: '“Sieben” znači “sedam”.', question: 'Što znači “sieben”?', correct: 'Sedam', answers: ['Osam', 'Devet', 'Sedam', 'Šest'] },
        { id: 'acht', title: 'Acht = Osam', description: '“Acht” znači “osam”.', question: 'Što znači “acht”?', correct: 'Osam', answers: ['Osam', 'Devet', 'Pet', 'Jedan'] },
        { id: 'neun', title: 'Neun = Devet', description: '“Neun” znači “devet”.', question: 'Što znači “neun”?', correct: 'Devet', answers: ['Devet', 'Deset', 'Osam', 'Sedam'] },
        { id: 'zehn', title: 'Zehn = Deset', description: '“Zehn” znači “deset”.', question: 'Što znači “zehn”?', correct: 'Deset', answers: ['Jedanaest', 'Devet', 'Deset', 'Osam'] }
      ]
    },
    {
      name: 'Miješani brojevi – kombinacije',
      lessons: [
        { id: 'dreizehn', title: 'Dreizehn = Trinaest', description: '“Drei” (tri) + “zehn” (deset) = “Dreizehn” (trinaest)', question: 'Kako se kaže “trinaest” na njemačkom?', correct: 'dreizehn', answers: ['dreizehn', 'zehn', 'drei', 'fünfzehn'] },
        { id: 'fuenfzehn', title: 'Fünfzehn = Petnaest', description: '“Fünf” (pet) + “zehn” (deset) = “Fünfzehn” (petnaest)', question: 'Što znači “fünfzehn”?', correct: 'Petnaest', answers: ['Petnaest', 'Četrnaest', 'Sedamnaest', 'Dvanaest'] },
        { id: 'einundzwanzig', title: 'Einundzwanzig = Dvadeset i jedan', description: 'Njemački kaže "jedan i dvadeset" → “Ein + und + zwanzig” = 21', question: 'Kako se kaže "21" na njemačkom?', correct: 'einundzwanzig', answers: ['einundzwanzig', 'zwanzigeins', 'zwanzigein', 'einzwanzig'] },
        { id: 'siebenundzwanzig', title: 'Siebenundzwanzig = Dvadeset i sedam', description: '“Sieben” (7) + “und” + “zwanzig” = 27', question: 'Kako se kaže “27” na njemačkom?', correct: 'siebenundzwanzig', answers: ['siebenundzwanzig', 'zwanzigsieben', 'siebzehn', 'achtundzwanzig'] },
        { id: 'neunzehn', title: 'Neunzehn = Devetnaest', description: '“Neun” (devet) + “zehn” (deset) = “Neunzehn” (devetnaest)', question: 'Što znači “neunzehn”?', correct: 'Devetnaest', answers: ['Devetnaest', 'Osamnaest', 'Dvanaest', 'Trinaest'] }
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

  shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
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
    const lectionName = 'brojevi';
    const completedLections = JSON.parse(localStorage.getItem('completedLections') || '[]');

    if (!completedLections.includes(lectionName)) {
      completedLections.push(lectionName);
      localStorage.setItem('completedLections', JSON.stringify(completedLections));
    }

    this.router.navigate(['/lektion']);
  }
}
