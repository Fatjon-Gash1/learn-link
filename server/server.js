// Load env vars
if (process.nextTick.NODE_ENV !== "production") {
    require("dotenv").config();
}

// Import dependencies
const express = require('express');
const cors = require('cors');
const { createMySQLPool, connectToMongoDb } = require("./config/databaseConfig"); 
const postController = require("./controllers/postsController");

// Create express app 
const app  = express();

// Configure express app
app.use(express.json());
app.use(cors());

// Create MySQL connection pool
const mysqlPool = createMySQLPool();

// Connect to mongoDB
connectToMongoDb();

// Routing
app.get('/', (req, res) => {
    res.json({message: "test"});
});

app.get('/posts', postController.fetchPosts);
app.get('/posts/:id', postController.fetchPost);
app.post('/posts', postController.createPost);
app.put('/posts/:id', postController.updatePost);
app.delete('/posts/:id', postController.deletePost);

// Start server
app.listen(process.env.PORT);