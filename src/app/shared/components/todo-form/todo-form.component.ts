import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Itodo } from '../../models/todo';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit, OnChanges {
  isInEditMode: boolean = false;
  @Output() emitNewTodo: EventEmitter<Itodo> = new EventEmitter<Itodo>();
  @Input() getEditTodo !: Itodo;
  @Output() emitUpdatedTodo: EventEmitter<Itodo> = new EventEmitter<Itodo>();

  @ViewChild('todoForm') todoForm !: NgForm

  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['getEditTodo'].currentValue) {
      this.isInEditMode = true;
      this.todoForm.form.patchValue(this.getEditTodo);
    }
  }

  onSubmit() {
    if (this.todoForm.valid) {
      let newTodo: Itodo = { ...this.todoForm.form.value, todoID: Date.now().toString() }
      this.emitNewTodo.emit(newTodo);
      this.todoForm.resetForm();
    }
  }

  onUpdate() {
    if (this.todoForm.valid) {
      let updatedTodo: Itodo = { ...this.todoForm.form.value, todoID: this.getEditTodo.todoID }
      this.emitUpdatedTodo.emit(updatedTodo);
      this.isInEditMode = false;
      this.todoForm.resetForm();
    }
  }
}
