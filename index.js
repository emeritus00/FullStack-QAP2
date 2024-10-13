const { getQuestion, isCorrectAnswer } = require("./utils/mathUtilities");
const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

let streak = 0;
let leaderboard = [];

app.get("/", (req, res) => {
  res.render("index", { streak });
});

app.get("/quiz", (req, res) => {
  const question = getQuestion();
  res.render("quiz", { question, streak, errorMessage: null });
});

//Handles quiz submissions.
app.post("/quiz", (req, res) => {
  const { answer, question } = req.body;

  if (isCorrectAnswer(question, answer)) {
    streak++;
    res.redirect("/quiz");
  } else {
    // Save the current streak to the leaderboard before resetting it
    leaderboard.push({ streak, date: new Date().toLocaleDateString() });

    // Sort leaderboard by streak in descending order and keep only top 10
    leaderboard = leaderboard.sort((a, b) => b.streak - a.streak).slice(0, 10);

    streak = 0; // Reset streak on wrong answer
    res.redirect("/leaderboards"); // Redirect to the leaderboards page
  }
});

app.get("/leaderboards", (req, res) => {
  res.render("leaderboards", { leaderboard });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
