const express = require("express");
const app = express();
const port = 8080;
const path =  require("path");
// import method override package
const methodOverride = require('method-override')


app.use(express.urlencoded ({extended:true}));

app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// using static files
app.use(express.static(path.join(__dirname, "public")));

// unique id package
const { v4: uuidv4 } = require("uuid");

// meathod override
app.use(methodOverride('_method'));

app.listen(port, () => {
    console.log("Server is listeing");
});
let posts = [
    {
        id: uuidv4(),
        username: "abhaychouhan",
        content: "I Love programing"
    },
    {
        id: uuidv4(),
        username: "alex",
        content: "Got my first internship"
    },
    {
        id: uuidv4(),
        username: "rahulkumar",
        content: "first day at capgemeni"
    }
];
app.get("/posts", (req, res) => {
    res.render("index.ejs", {posts});
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

// root path
app.post("/posts", (req, res) => {
    let {username,content} = req.body;
    let id = uuidv4();
    posts.push( {id, username, content});
    // get request by default
    res.redirect("/posts");
});

// show specific post 
app.get("/posts/:id", (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", {post});
});

//patch request
// used method override
app.patch("/posts/:id",(req,res) => {
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    res.redirect("/posts");
});

// edit page path
app.get("/posts/:id/edit", (req,res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", {post});
});

// Delete path 
// filtering the unmatched id and creating a new array
// used method override
app.delete("/posts/:id",(req,res) => {
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
});