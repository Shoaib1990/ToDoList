let express = require('express');
let cors = require('cors');
let MongoClient = require('mongodb').MongoClient;
let bodyParser = require('body-parser');
let sanitizer = require('express-sanitizer');
let objectId = require('mongodb').ObjectId;

// MongoDB constants
const URL = 'mongodb://localhost:27017/';
const DB_NAME = "dbToDoList";

// construct application object via express
let app = express();
// add cors as middleware
app.use(cors());

// added routing


// add body parser middleware to pars up any JSON coming in with request
app.use(bodyParser.json());
// add sanitizer to clean all JSON incoming data
app.use(sanitizer());
// express static middleware - setup static files location
app.use(express.static('./dist'));

// display api data request
app.get("/get", async (request, response) => {
    
    let mongoClient = new MongoClient(URL, { useNewUrlParser: true, useUnifiedTopology: true});
    // Use connect method to connect to the server
    try {
        await mongoClient.connect();
        // convert all documents in toDoList collection into array in one awesome statement!
        // let toDoList  = await mongoClient.db(DB_NAME).collection("toDoList").find().sort("toDoItems").toArray();
        let toDoList  = await mongoClient.db(DB_NAME).collection("toDoList").find().toArray();
        // mongoClient.close();

        let json = {"toDoList": toDoList};
        response.status(200);
        mongoClient.close();
        response.send(json);
        
    } catch (error) {
        console.log(`>>> ERROR: ${error}`);
        response.status(500);
        response.send({error: `Server error with get : ${error}`});
        throw error;
    }
});

// add new todolist request
app.post("/post", async (request, response) => {
    // construct MongoClient object for working with MongoDB
    let mongoClient = new MongoClient(URL, { useNewUrlParser: true, useUnifiedTopology: true});
    // use connect method to connect to the server
    try {
        await mongoClient.connect();
        // convert all documents in todolist collection into array in one awesome statement!

        let toDoList  = await mongoClient.db(DB_NAME).collection("toDoList");

        request.body.title = request.sanitize(request.body.title);
        request.body.color = request.sanitize(request.body.color);
        request.body.time = request.sanitize(request.body.time);
        request.body.toDoItems.forEach(items => {
            items = request.sanitize(items);
        });

        // add the new document into MongoDB
        let result = await toDoList.insertOne(request.body);
        mongoClient.close();

        response.status(200);
        // send the result of the insert back to use on client
        response.send(result);

    } catch (error) {
        console.log(`>>> ERROR : ${error}`);
        response.status(500);
        response.send({error: `SERVER error with get : ${error}`});
        throw error;
    }
});

// delete todo list request
app.delete("/delete/:id", async(request, response) => {
    // construct MongoClient object for working with MongoDB
    let mongoClient = new MongoClient(URL, { useNewUrlParser: true, useUnifiedTopology: true});
    // Use connect method to connect to the server

    try {
        await mongoClient.connect();
        // convert all documents in todo collection
        let toDoList  = await mongoClient.db(DB_NAME).collection("toDoList");

        // convert url routing parameter to ObjectId format 
        let id = objectId(request.params.id);

        // building our delete query
        let selector = {"_id": id};
        // delete the old document into MongoDB
        let result = await toDoList.remove(selector);

        mongoClient.close();
        response.status(200);
        response.send(result);
    } catch (error) {
        console.log(`>>> ERROR : ${error}`);
        response.status(500);
        response.send({error: `could not find the requested _id : ${response.statusCode} `});
        throw error;
    }
});

app.listen(8080, () => console.log("Listening on port 8080"));