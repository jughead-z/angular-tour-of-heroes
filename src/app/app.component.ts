import { Component, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
declare var anime: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'angular-tour-of-heroes';
  
  // Array of dynamic texts to be animated
  texts: string[] = ['hamid', 'koko'];
  
  // Current index of the text array
  currentIndex: number = 0;

  ngAfterViewInit(): void {
    // Start the infinite loop for text animations
    this.loopTexts();
  }

  // Function to loop through texts infinitely
  loopTexts(): void {
    this.animateText(this.texts[this.currentIndex], () => {
      // Move to the next text, or reset to the first one if we reach the end
      this.currentIndex = (this.currentIndex + 1) % this.texts.length;
      // Repeat the animation for the next text
      this.loopTexts();
    });
  }

  // Function to animate text with anime.js
  animateText(text: string, callback: () => void): void {
    const element = document.getElementById('title');
    if (element) {
      // Replace text and split into spans
      element.innerHTML = text.split('').map(letter => `<span>${letter}</span>`).join('');

      // Total animation duration set to 4500ms (including reveal and fade-out)
      const totalDuration = 5500;

      anime.timeline({loop: false})
        .add({
          targets: '#title span',
          opacity: [0, 1],
          easing: 'easeInOutQuad',
          duration: 60, // Speed for each letter reveal (50ms)
          delay: (el: any, i: number) => 60 * i, // Delay between letters
        })
        .add({
          targets: '#title span',
          opacity: [1, 0],
          easing: 'easeInOutQuad',
          duration: 50, // Speed for each letter fade-out (50ms)
          delay: (el: any, i: number) => totalDuration / text.length + 60 * i, // Control the total time before fading out
          complete: callback // Trigger the next text animation when fade-out is complete
        });
    }
  }
}
