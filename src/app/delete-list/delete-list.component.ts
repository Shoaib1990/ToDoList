import { Component, OnInit } from '@angular/core';
import { ToDoService } from '../todo.service';

@Component({
  selector: 'app-delete-list',
  templateUrl: './delete-list.component.html',
  styleUrls: ['./delete-list.component.scss']
})
export class DeleteListComponent implements OnInit {

  constructor(public toDoData: ToDoService) { }

  ngOnInit() {
  }

}
