import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {JSONSample,ToDoList} from "./data.model";


@Injectable()

export class ToDoService {

    private http: HttpClient;
    public container:string[];
    public item:string;
    public title:string;
    public time:string;
    public color:string;
    public toDoItem_ID: string;
    public toDoItem_title: string;
    public toDoItem_color: string;
    public toDoItem_time: string;
    public toDoItemArray: ToDoList[];
    public toDoItems: string[];
    public disableItemBtn: boolean;
    public disableSubmitBtn: boolean;
    

    // local server
    private toDoGetScript: string = "http://localhost:8080/get";
    private toDoPostScript: string = "http://localhost:8080/post";
    private toDoDeleteScript: string = "http://localhost:8080/delete/";

    constructor(myHttp:HttpClient) {
        this.http = myHttp;
        this.item = "";
        this.title = "";
        this.container = [];
        this.time = "";
        this.color = "";

    }

    // fetch the data from mongoDB
    public load(): void {
        console.log("Loading data! :)");

        //using services => toDoList.service
        this.http.get<JSONSample>(this.toDoGetScript).subscribe(
            data => {
                let json: JSONSample = data;
                this.toDoItemArray = data.toDoList;
                
                for(let item of this.toDoItemArray) {
                    //console.log(item.toDoItems);
                    this.toDoItem_ID = item._id;
                    this.toDoItem_title = item.title;
                    this.toDoItem_time = item.time;
                    this.toDoItem_color = item.color;
                    this.toDoItems = item.toDoItems;
                }
                


            }, err => {

                console.log("Error retrieving portfolio data :(");
            }
        )
    }

    // add data to mongoDB
    public saveNewList(newList: any): void{
        this.http.post(this.toDoPostScript, newList).subscribe(
            (val) => {
                console.log("PUSH call successful value returned in body", val);

                this.load();
            },
            (response) => {
                console.log("PUT call in error", response);
            },
            () => {
                console.log("The PUT observable is now completed.");

            });
            console.log(newList);        
    }

    // delete old list
    public deleteToDoList(toDoList: any):void {
        console.log(toDoList);
        this.http.delete(this.toDoDeleteScript + toDoList).subscribe(
            
            (val) => {
                console.log("DELETE call successful value returned in body");
                this.load();
            },
            (response) => {
                console.log("DELETE call in error", response);
            },
            () => {
                console.log("The DELETE observable is now completed.");

            });
            console.log(this.deleteList);
    }

    // add list items to array
    public addToContainer():void {
        if(this.item!="") {
        this.disableItemBtn = true;                    
        this.container.push(this.item);
        // empty the item to add input field
        this.item = "";

        } else {
            this.disableItemBtn = false;
        }

        
    }

    public deleteList(title:string):void {
        this.title = title;
    }

    public submitList(): void {
        if(this.title!="") {
        this.time = new Date().getUTCDate() + "/" + (new Date().getUTCMonth()+1) +"/" +  new Date().getUTCFullYear();
        //console.log(this.title);
        //console.log(this.container);
        let listObj = {
            'title':this.title,
            'color':this.color,
            'time': this.time,
            'toDoItems': this.container
        }

        console.log(listObj);
        
            this.disableSubmitBtn = false;
            this.saveNewList(listObj);
            // empty the title input field
            this.title = "";
        } else {
            this.disableSubmitBtn = true;

        }

        
    }
}