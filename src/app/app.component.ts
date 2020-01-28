import { Component, OnInit } from '@angular/core';
import { ToDoService } from './todo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[ToDoService]
})

export class AppComponent implements OnInit {

  constructor(public toDoList: ToDoService, public router: Router) {}

  title = 'toDoList';

  public ngOnInit():void {
    this.toDoList.load();
  }
}
