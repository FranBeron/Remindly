import { ITask } from './../model/task';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent {
  todoForm!: FormGroup;
  tasks: ITask[] = [];
  inprogress: ITask[] = [];
  done: ITask[] = [];
  updateIndex!: any;
  isEditEnabled : boolean = false;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      item: ['', Validators.required],
    });
  }

  addTask() {
    this.tasks.push({
      description: this.todoForm.value.item,
      done: false,
    });
    this.todoForm.reset();
  }

  updateTask(){
    this.tasks[this.updateIndex].description = this.todoForm.value.item;
    this.tasks[this.updateIndex].done = false;
    this.todoForm.reset();
    this.updateIndex = undefined;
    this.isEditEnabled = false;

  }

  onEdit(item:ITask, i : number){
    this.todoForm.controls['item'].setValue(item.description);
    this.updateIndex = i;
    this.isEditEnabled = true;
  }

  deleteTask(i: number) {
    this.tasks.splice(i, 1);
  }

  deleteInProgress(i: number) {
    this.inprogress.splice(i, 1);
  }

  deleteDone(i: number) {
    this.done.splice(i, 1);
  }

  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
