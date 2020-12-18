import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-fa-input',
  templateUrl: './fa-input.component.html',
  styleUrls: ['./fa-input.component.scss'],
})
export class FaInputComponent {

  @Input() icon: string;

}
