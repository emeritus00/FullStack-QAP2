const { getQuestion, isCorrectAnswer } = require("./utils/mathUtilities");
const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

let streak = 0;
let leaderboard = [];

// Home page
app.get("/", (req, res) => {
  const highestStreak = leaderboard.length > 0 ? leaderboard[0].streak : 0;
  res.render("index", { streak, highestStreak });
});

//Quiz and generate question
app.get("/quiz", (req, res) => {
  const question = getQuestion();
  res.render("quiz", { question, streak });
});

//Handles quiz submissions.
app.post("/quiz", (req, res) => {
  const { answer, question } = req.body;

  if (isCorrectAnswer(question, answer)) {
    streak++;
    res.redirect("/quiz");
  } else {
    leaderboard.push({ streak, date: new Date().toLocaleDateString() });
    leaderboard = leaderboard.sort((a, b) => b.streak - a.streak).slice(0, 10);
    streak = 0;
    res.redirect("/leaderboards");
  }
});

// Leaderboard Page
app.get("/leaderboards", (req, res) => {
  res.render("leaderboards", { leaderboard });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
