import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';

import { RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { NewListComponent } from './new-list/new-list.component';
import { HomeComponent } from './home/home.component';
import { EditListComponent } from './edit-list/edit-list.component';
import { DeleteListComponent } from './delete-list/delete-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NewListComponent,
    HomeComponent,
    EditListComponent,
    DeleteListComponent
  ],
  imports: [
    
    HttpClientModule,
    ColorPickerModule,
    BrowserModule,
    FormsModule,

    RouterModule.forRoot([
      { path: "home", component: HomeComponent},
      { path: "createList", component: NewListComponent},
      { path: "editList", component: EditListComponent},
      { path: "deleteList", component: DeleteListComponent},
      { path: "", redirectTo: "home",pathMatch: "full"},
      { path: "**", redirectTo: "home",pathMatch: "full"},
    ])

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
