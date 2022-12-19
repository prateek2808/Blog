const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const articleRouter = require("./routes/articles");
const Article = require("./models/article");


mongoose.connect("mongodb+srv://admin-prateek:prateek2808@clusterblog.jusoa.mongodb.net/blog",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(methodOverride("_method"))


app.use("/articles", articleRouter )


app.use(express.static("public"));


app.get("/", async (req, res) => {
    const articles = await Article.find().sort({
        createdAt: "desc" })
    res.render("home", { articles : articles});
  });

  app.get("/admin", async (req, res) => {
    const articles = await Article.find().sort({
        createdAt: "desc" })
    res.render("adminhome", { articles : articles});
  });

let port = process.env.PORT;
if(port == null || port ==""){
    port = 3000;
}

app.listen(port, function(){
    console.log("Server has started")
})




