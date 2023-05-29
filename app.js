const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");

const req = require("express/lib/request");
const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// "mongodb://0.0.0.0:27017/wikidb"
mongoose.connect(
  "mongodb+srv://duck_trap_69:duck69trap@cluster0.dwlz9ap.mongodb.net/wikidb"
);
const articleSchema = {
  title: String,
  content: String,
};
const Article = mongoose.model("Article", articleSchema);

// (function (err, articleContent) {
//   console.log(articleContent);
// });

//////////////////////////////////////////all method//////////////////////////////////////////////////////

app
  .route("/articles")
  .get(function (req, res) {
    Article.find()
      .then((articles) => {
        res.send(articles); // Send articles as response
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("Error retrieving articles"); // Send error response if there's an issue
      });
  })
  .post(function (req, res) {
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content,
    });
    newArticle
      .save()
      .then(() => {
        res.send("success"); // Send success response
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("Error"); // Send error response if there's an issue
      });
  })
  .delete(function (req, res) {
    Article.deleteMany()
      .then(() => {
        res.send("success"); // Send success response
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("Error"); // Send error response if there's an issue
      });
  });

//////////////////////////////////////////one method//////////////////////////////////////////////////////

app
  .route("/articles/:articleTitle")

  .get(function (req, res) {
    Article.findOne({ title: req.params.articleTitle })
      .then((article) => {
        res.send(article); // Send articles as response
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("Error retrieving articles"); // Send error response if there's an issue
      });
  })

  .put(function (req, res) {
    Article.updateOne(
      { title: req.params.articleTitle },
      { title: req.body.title, content: req.body.content }
    )
      .then(() => {
        res.send("Successfully updated the article.");
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("Error occurred while updating the article.");
      });
  })

  .patch(function (req, res) {
    Article.updateOne({ title: req.params.articleTitle }, { $set: req.body })
      .then(() => {
        res.send("Successfully updated the article.");
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("Error occurred while updating the article.");
      });
  })

  .delete(function (req, res) {
    Article.deleteOne({ title: req.params.articleTitle })
      .then(() => {
        res.send("sucSuccessfully Deleted the article.cess"); // Send success response
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("ErError occurred while Deleted the article.ror"); // Send error response if there's an issue
      });
  });

app.listen(process.env.PORT || 3000, function () {
  console.log("server active comander");
});
