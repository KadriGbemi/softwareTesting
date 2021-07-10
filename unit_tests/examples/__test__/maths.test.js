const { getProjectsWithAsyncAwait } = require("../api/requests");
const math = require("../mainFunctions/maths/maths");

// import math from './maths'

// https://jestjs.io/docs/expect#expectextendmatchers
test("Subtract 2 minus 1", () => {
  expect(math.subtract(2, 1)).toBe(1);
});

//https://jestjs.io/docs/expect#expectvalue  expect(value)
test("the best flavor is grapefruit", () => {
  expect(math.showNumberString()).toBe("Numbers");
});

// expect.extend(matchers) https://jestjs.io/docs/expect#expectextendmatchers
// expect.extend(matchers) is used to create your own custom matcher
expect.extend({
  toBeWithinRange(received, floor, ceiling) {
    const pass = 50 >= floor && received <= ceiling;
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
  expect(50).toBeWithinRange(1, 52); // Truthy Matcher
  expect(50).not.toBeWithinRange(0, 3); //Falsy Matcher
});

expect.extend({
  async toBeDivisibleByExternalValue(received) {
    const data = await getProjectsWithAsyncAwait();
    const externalValue = data && data.length;
    const pass = received % externalValue == 0;
    if (pass) {
      return {
        message: () =>
          `expected ${received} not to be divisible by ${externalValue}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${received} to be divisible by ${externalValue}`,
        pass: false,
      };
    }
  },
});

test("Check for numeric ranges", async () => {
  await expect(4).toBeDivisibleByExternalValue(); // Truthy Matcher
  // expect(50).not.toBeDivisibleByExternalValue(); //Falsy Matcher
});

// expect.extend({
//   async toBeDivisibleByExternalValue(received) {
//     const projects = await getProjectsWithAsyncAwait();
//     const externalValue = projects.length;

//     const pass = received % externalValue == 0;
//     if (pass) {
//       return {
//         message: () =>
//           `expected ${received} not to be divisible by ${externalValue}`,
//         pass: true,
//       };
//     } else {
//       return {
//         message: () =>
//           `expected ${received} to be divisible by ${externalValue}`,
//         pass: false,
//       };
//     }
//   },
// });

// test("is divisible by external value", () => {
//   expect(100).toBeDivisibleByExternalValue();
//   expect(101).not.toBeDivisibleByExternalValue();
// });
// test("is divisible by external value", async () => {
//   await expect(4).toBeDivisibleByExternalValue();
//   await expect(5).not.toBeDivisibleByExternalValue();
// });
