import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upoznavanje',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upoznavanje.component.html',
  styleUrls: ['./upoznavanje.component.css']
})
export class UpoznavanjeComponent {
  showIntro = true;
  answered = false;
  correctAnswer = 'Guten Tag';
  resultMessage = '';

  startLesson() {
    this.showIntro = false;
  }

  checkAnswer(answer: string) {
    this.answered = true;
    if (answer === this.correctAnswer) {
      this.resultMessage = 'Bravo! Točan odgovor.';
    } else {
      this.resultMessage = 'Pokušaj ponovno.';
    }
  }

  resetQuiz() {
    this.answered = false;
    this.resultMessage = '';
  }
}
