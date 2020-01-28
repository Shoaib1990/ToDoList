import { Component, OnInit } from '@angular/core';
import { ToDoService } from '../todo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public toDoData: ToDoService) { }

  ngOnInit() {
  }

}
