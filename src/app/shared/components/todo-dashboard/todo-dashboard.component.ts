import { Component, OnInit } from '@angular/core';
import { Itodo } from '../../models/todo';
import { todosData5 } from '../../consts/todo';
import { SnackBarService } from '../../services/snackbarService';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetConfirmComponent } from '../get-confirm/get-confirm.component';

@Component({
  selector: 'app-todo-dashboard',
  templateUrl: './todo-dashboard.component.html',
  styleUrls: ['./todo-dashboard.component.scss']
})
export class TodoDashboardComponent implements OnInit {
  todosArr: Itodo[] = [];
  editObj !: Itodo;

  constructor(
    private _snackbar: SnackBarService,
    private _matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.todosArr = todosData5;
  }

  getNewTodo(newTodo: Itodo) {
    this.todosArr.unshift(newTodo);
    this._snackbar.openSnackBar(`The new todoItem is added successfully!!!`);
  }

  getRemoveID(removeID: string) {
    let config = new MatDialogConfig();
    config.data = `Are you sure to remove this todoItem with id ${removeID}`;
    config.disableClose = true;
    config.width = '400px';
    let dialogRef = this._matDialog.open(GetConfirmComponent, config);
    dialogRef.afterClosed()
      .subscribe({
        next: resp => {
          if (resp) {
            let getIndex = this.todosArr.findIndex(t => t.todoID === removeID);
            this.todosArr.splice(getIndex, 1);
            this._snackbar.openSnackBar(`The todoItem eith id ${removeID} is removed successfully!!!`);
          }
        },
        error: err => {
          this._snackbar.openSnackBar(err.msg)
        }
      })
  }
  getEditTodo(editTodo: Itodo) {
    this.editObj = editTodo;
  }

  getUpdATEDtODO(UPDATEDtODO: Itodo) {
    let getIndex = this.todosArr.findIndex(t => t.todoID === UPDATEDtODO.todoID);
    this.todosArr[getIndex] = UPDATEDtODO;
    this._snackbar.openSnackBar(`The todoITem ${UPDATEDtODO.todoItem} is updated successfully!!!`);
  }

}
