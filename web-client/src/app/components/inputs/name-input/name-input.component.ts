import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'gp-name-input',
  templateUrl: './name-input.component.html',
  styleUrls: ['./name-input.component.css']
})
export class NameInputComponent {
  @Output() nameChange = new EventEmitter<string>();
  @Input() name: string;

  setName(name: string): void {
    this.name = name;
    this.nameChange.emit(this.name);
  }
}
