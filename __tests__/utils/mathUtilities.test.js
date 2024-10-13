const { isCorrectAnswer, getQuestion } = require("../../utils/mathUtilities");

describe("Tests for getQuestion", () => {
  test("should generate a valid math question", () => {
    const question = getQuestion();
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

  test("should detect a correct answer for multiplication", () => {
    const question = "6 * 4";
    const answer = "24";
    expect(isCorrectAnswer(question, answer)).toBe(true);
  });

  test("should detect an incorrect answer for multiplication", () => {
    const question = "6 * 4";
    const answer = "25";
    expect(isCorrectAnswer(question, answer)).toBe(false);
  });

  test("should detect a correct answer for division", () => {
    const question = "12 / 4";
    const answer = "3";
    expect(isCorrectAnswer(question, answer)).toBe(true);
  });

  test("should detect an incorrect answer for division", () => {
    const question = "12 / 4";
    const answer = "4";
    expect(isCorrectAnswer(question, answer)).toBe(false);
  });
});
