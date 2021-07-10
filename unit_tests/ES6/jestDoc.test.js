// An addition test
// https://www.youtube.com/watch?v=teDVlOjOCT0 How to use ECMAScript without Babel in nodejs

// https://www.youtube.com/watch?v=kA9Pdu-IblI Jest Testing with ES6
import sum from "./jestDoc";

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

// expect.extend(matchers) test i.e your own custom matcher

expect.extend({
  toBeWithinRange(received, floor, ceiling) {
    const pass = received >= floor && received <= ceiling;
    if (pass) {
      return {
        message: () =>
          `expected ${received} not to be within range ${floor} - ${ceiling}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${received} to be within range ${floor} - ${ceiling}`,
        pass: false,
      };
    }
  },
});

test("Check for numeric ranges", () => {
  expect(sum(1, 2)).toBeWithinRange(1, 3);
  expect(100).toBeWithinRange(90, 110);
  expect(101).not.toBeWithinRange(0, 100);
  expect({ apples: 6, bananas: 3 }).toEqual({
    apples: expect.toBeWithinRange(1, 10),
    bananas: expect.not.toBeWithinRange(11, 20),
  });
});
