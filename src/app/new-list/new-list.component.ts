import { Component, OnInit } from '@angular/core';
import { ToDoService } from '../todo.service';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent implements OnInit {

  constructor(public toDoData: ToDoService) { }

  ngOnInit() {
  }

  

}
