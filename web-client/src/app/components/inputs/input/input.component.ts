import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Selectable } from 'src/app/shared/models/selectable';

@Component({
  selector: 'gp-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  @Input() control!: FormControl;
  @Input() headers!: Selectable[];
  @Input() label!: string;
  @Input() type!: string;
  id!: string;

  ngOnInit(): void {
    this.id = this.label?.toLowerCase()?.replace(/\s+/, '') ?? '';
  }

  get required() : boolean {
    return this.control.hasValidator(Validators.required)
  }

  get style(): string {
    return `form-control${this.control?.touched && this.control?.errors ? ' is-invalid' : ''}`;
  }
}
