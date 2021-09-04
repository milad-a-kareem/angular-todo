import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todos:any[] = []
  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todoService.syncTodosFromLocalStorage()
    this.todoService.getTodos().subscribe(todos=>{
      this.todos = todos
    })
  }

  change(id:number, e:any){
    this.todoService.updateTodoState(id,e.target.checked)
  }

  onDelete(id:number){
    this.todoService.deleteTodo(id)
  }

}
