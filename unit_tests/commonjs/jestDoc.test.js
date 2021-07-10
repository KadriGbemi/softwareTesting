// An addition test
// https://www.youtube.com/watch?v=teDVlOjOCT0 How to use ECMAScript without Babel

const actions = require("./jestDoc");

test("adds 1 + 2 to equal 3", () => {
  expect(actions.sum(1, 2)).toBe(3);
});