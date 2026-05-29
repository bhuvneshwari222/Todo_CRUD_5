import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Itodo } from '../../models/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  @Input() getTodosArr !: Itodo[];
  @Output() emitEditTodo : EventEmitter<Itodo> = new EventEmitter<Itodo>();

  @Output() emitRemoveID: EventEmitter<string> = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  trackByTodoID(index: number, todo: Itodo) {
    return todo.todoID;
  }

  onRemoveTodo(removeID: string) {
    this.emitRemoveID.emit(removeID);
  }

  onEditTodo(editTodo : Itodo){
    this.emitEditTodo.emit(editTodo);
  }

}
