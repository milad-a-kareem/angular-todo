import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todos = new BehaviorSubject<any[]>([])
  myStorage = window.localStorage

  constructor() {}


   getTodos(){
     return this.todos.asObservable()
   }

   addTodo(todoText:string) {
    const newTodos = [...this.todos.value]
    const newTodo = {
      id: (new Date(Date.now())).getTime(),
      name: todoText,
      done: false
    }
    newTodos.unshift(newTodo)

    this.todos.next(newTodos)
    this.saveTodosToLocalStorage(newTodos)
   }

   updateTodoState (id:number, s:boolean){
    const newTodos  = [...this.todos.value]
    const a = new Promise((resolve, reject)=>{
      newTodos.forEach((todo,i) =>{
        if(todo.id === id){
          newTodos[i].done = s
          resolve(true)
        }
      })
    })

    a.then(res=>{
      if (res){
        this.todos.next(newTodos)
        this.saveTodosToLocalStorage(newTodos)
      }
    })
   }


  deleteTodo = (id:number)=>{
    const newTodos  = [...this.todos.value].filter( (todo:any) => { return todo.id !== id})
    this.todos.next(newTodos)
    this.saveTodosToLocalStorage(newTodos)
  }


  syncTodosFromLocalStorage(){
    const todos = this.myStorage.getItem('todos')

    if(todos){
      this.todos.next(JSON.parse(todos))
    }
  }

  saveTodosToLocalStorage(todos:any[]){
    this.myStorage.setItem('todos', JSON.stringify(todos))
  }
}
