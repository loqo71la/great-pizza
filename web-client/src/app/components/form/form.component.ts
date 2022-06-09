import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'gp-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  form!: FormGroup;
  items = [
    { id: 1, value: 's' },
    { id: 10, value: 'm' },
    { id: 100, value: 'l' },
    { id: 1000, value: 'xl' },
    { id: 10000, value: 'xxl' },
  ]

  fields = [
    { name: 'name', label: 'Nombre', type: 'text' },
    { name: 'checkAdult', label: 'Are you over 18 years of age?', type: 'checkbox' },
    { name: 'age', label: 'Age', type: 'number' },
    { name: 'size', label: 'Tamaño', type: 'radio' },
    { name: 'type', label: 'Tipo', type: 'select' }
  ];
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.initForm();
    this.form.get('size');
  }

  initForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      checkAdult: [false, [Validators.required]],
      age: [0],
      department: [''],
      comment: ['', [Validators.required]],
      skin: ['#f1ae73'],
      size: [''],
      type: ['']
    })
  }

  onSubmit() {
    console.log(this.form.valid);
    console.log(this.form.value);
  }
}
