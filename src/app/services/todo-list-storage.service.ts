import { Injectable } from '@angular/core';
import { Task } from '../models/task';

const name: string = 'todo-list'

@Injectable()
export class TodoListStorageService {
  private _todoList: Task[];

  constructor() {
    this._todoList = JSON.parse(localStorage.getItem(name)!) || [];
  }

  private updateStorage() {
    localStorage.setItem(name, JSON.stringify(this._todoList))
    return this.getAll()
  }

  getAll() {
    return [...this._todoList]
  }

  add(task : Task) {
    this._todoList.push(task)
    return this.updateStorage()
  }

  update(index: number, changes: Task) {
    Object.assign(this._todoList[index], changes);
    return this.updateStorage();
  }

  remove(index:number) {
    this._todoList.splice(index, 1);
    return this.updateStorage();
  }
}