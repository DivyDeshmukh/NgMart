import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  scrollToTop(event: Event) {
    event.preventDefault();
    console.log('Scrolling to top'); // Confirm method execution
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
