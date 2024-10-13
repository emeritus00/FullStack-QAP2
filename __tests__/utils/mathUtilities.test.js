const { isCorrectAnswer, getQuestion } = require("../../utils/mathUtilities");

describe("Tests for getQuestion", () => {
  test("should generate a valid math question", () => {
    const question = getQuestion();
    // Assuming questions are in the format "X + Y" or "X * Y".
    expect(question).toMatch(/\d+ [\+\-\*\/] \d+/);
  });
});

describe("Tests for isCorrectAnswer", () => {
  test("should detect a correct answer for addition", () => {
    const question = "5 + 3";
    const answer = "8";
    expect(isCorrectAnswer(question, answer)).toBe(true);
  });

  test("should detect an incorrect answer for addition", () => {
    const question = "5 + 3";
    const answer = "9";
    expect(isCorrectAnswer(question, answer)).toBe(false);
  });
});
