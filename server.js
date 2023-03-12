//common js not es6
const express = require('express');

// The cors module is a middleware function that adds CORS headers to HTTP responses. CORS is a security feature that prevents web applications from making requests to different domains than the one they originated from. By default, browsers will block these requests, but the cors middleware can be used to override this behavior and allow cross-origin requests.

const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();

// Finally, the app.use(cors()) line is telling our Express.js server to use the cors middleware for all incoming requests. This will add the necessary CORS headers to our responses and allow cross-origin requests to our application.

app.use(cors());

// Middleware for data on post request

app.use(express.json({ extended: false }));

const todos = [
{
    message: "Wash car...",
    id: 1
},
{
    message: "Clean dishes...",
    id: 2
},
{
    message: "Bye groceries...",
    id: 3
},
];

// res status 200 is success
app.get("/", (req, res) => {
    console.log("Received GET request for /");
    res.status(200).json(todos);
}
);

// In the POST route, a new to-do item is created by extracting the message from the req.body object and generating a unique ID using the uuidv4() function from the uuid module. The new to-do item is then added to the todos array using the push() method, and the updated list is returned to the client as JSON data with a status code of 201.

app.post("/", (req, res) => {
    const newTodo = {
        message: req.body.message,
        id: uuidv4()
    }

    todos.push(newTodo)
    res.status(201).json(todos);
}
)

app.put("/:id", (req, res) => {
    const id = req.params.id;
    const todo = todos.find(todo => todo.id == id);
  
    if (!todo) {
      res.status(404).json({ message: "Todo not found" });
    } else {
      todo.message = req.body.message;
      res.status(200).json(todos);
    }
  });
  
  app.delete("/:id", (req, res) => {
    const id = req.params.id;
    const index = todos.findIndex(todo => todo.id == id);
  
    if (index === -1) {
      res.status(404).json({ message: "Todo not found" });
    } else {
      todos.splice(index, 1);
      res.status(200).json(todos);
    }
  });

const PORT = 5001;

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
});

