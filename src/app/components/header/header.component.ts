import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild('myInput', {static: false}) myInput!: ElementRef
  mobMenuState = false

  constructor( private todoService: TodoService) { }

  ngOnInit(): void {
  }

  onKeyPress(e:any){
    if (e.key === 'Enter'){
      this.onAddTodo()
    }
  }

  onAddTodo(){
    this.todoService.addTodo(this.myInput.nativeElement.value)
    this.myInput.nativeElement.value=''
  }

  closeMenu(){
    this.mobMenuState = false
  }

  openMenu(){
    this.mobMenuState = true
  }

}
