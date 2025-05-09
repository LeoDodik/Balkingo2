import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http'; // <-- Add HttpClient here
import { RouterOutlet } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule, RouterOutlet, LandingPageComponent], // Correct imports
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'balkingo-frontend';
  message = 'Loading...';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('http://localhost:8080/api/hello', { responseType: 'text' })
     .subscribe((response: any) => {
       this.message = response;
     });
  }
}
