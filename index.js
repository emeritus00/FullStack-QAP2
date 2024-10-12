const { getQuestion, isCorrectAnswer } = require("./utils/mathUtilities");
const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true })); // For parsing form data
app.use(express.static("public")); // To serve static files (e.g., CSS)

//Some routes required for full functionality are missing here. Only get routes should be required
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
    streak = 0; // Reset streak on wrong answer
    res.redirect("/");

    // streak = 0; // Reset streak on wrong answer
  }
  //answer will contain the value the user entered on the quiz page
  //Logic must be added here to check if the answer is correct, then track the streak and redirect properly
  //By default we'll just redirect to the homepage again.
});

app.get("/quiz", (req, res) => {
  leaderboard.push({ streak, date: new Date().toLocaleDateString() });
  leaderboard = leaderboard.sort((a, b) => b.streak - a.streak).slice(0, 10); // Top 10
  res.render("quiz", { streak });
});

app.get("/leaderboards", (req, res) => {
  res.render("leaderboards", { leaderboard });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
