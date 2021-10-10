import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'gp-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Output() saved = new EventEmitter<boolean>();
  @Input() title: string;

  constructor() { }

  ngOnInit(): void {
  }

  success(): void {
    this.saved.emit();
  }
}
