import { it, expect, describe } from "vitest";
import Matrix from "./matrix";
import { challengeInput, test1, test2, test3 } from "./data";

describe("Matrix", () => {
  it("returns the correct path for test 1", () => {
    const matrix = new Matrix(test1);
    expect(matrix.getFullPath()).toBe(">-Aa-+|||+----+|||+-----+A||CM||B|s");
    expect(matrix.findLetters()).toBe("AACMB");
  });
  it("returns the correct path for test 2", () => {
    const matrix = new Matrix(test2);
    expect(matrix.getFullPath()).toBe(">------A+|C|+---C+|+U-+|s");
    expect(matrix.findLetters()).toBe("ACCU");
  });
  it("returns the correct path for test 3", () => {
    const matrix = new Matrix(test3);
    expect(matrix.getFullPath()).toBe(">|||||||+-------s");
    expect(matrix.findLetters()).toBe("");
  });
  it("returns the correct path for challenge input", () => {
    const matrix = new Matrix(challengeInput);
    expect(matrix.getFullPath()).toBe(">---A-@-+|C|+---C|+-U-+|s");
    expect(matrix.findLetters()).toBe("ACCU");
  });
});
