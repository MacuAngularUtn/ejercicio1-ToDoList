import { Component } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TodoListStorageService } from 'src/app/services/todo-list-storage.service';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent {
  _task?:string;
  _date:Date=new Date();

  constructor(private _list:TodoListStorageService) {

  }

  getList():Task[]{
    return this._list.getAll()
  }

  addTask(){
    if(this._task?.trim() && this._date){
      let newTask:Task={
        id:Date.now(),
        task:this._task,
        date:this._date,
        done:false
      }
      this._list.add(newTask)
      this._task = ""
      this._date = new Date()
    }
  }

  removeTask(index:number){
    this._list.remove(index)
  }

  updateTask(index:number, task:Task){
    this._list.update(index, task)
  }

  isOverdue(task:Task):boolean{
    let dateNow: Date = new Date(task.date)
    return task.date && dateNow < new Date();
  }
}
