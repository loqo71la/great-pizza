import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'gp-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Output() success = new EventEmitter<boolean>();
  @Input() title: string;

  constructor() { }

  ngOnInit(): void {
  }

  onSuccess(): void {
    this.success.emit();
  }
}
