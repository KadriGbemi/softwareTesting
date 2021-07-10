// https://jestjs.io/docs/expect#expectextendmatchers

const { getProjectsWithAsync } = require("../api/requests");
const actions = require("../jestDoc");

//https://jestjs.io/docs/expect#expectvalue  expect(value)
test("the best flavor is grapefruit", () => {
  expect(actions.bestLaCroixFlavor()).toBe("Oranges");
});

// expect.extend(matchers) https://jestjs.io/docs/expect#expectextendmatchers
// expect.extend(matchers) is used to create your own custom matcher
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
  expect(actions.sum(1, 2)).toBeWithinRange(1, 3);
  expect(100).toBeWithinRange(90, 110);
  expect(101).not.toBeWithinRange(0, 100);
  expect({ apples: 6, bananas: 3 }).toEqual({
    apples: expect.toBeWithinRange(1, 10),
    bananas: expect.not.toBeWithinRange(11, 20),
  });
});

// expect.extend(matchers) - Async Matchers
// https://jestjs.io/docs/expect#async-matchers
expect.extend({
  async toBeDivisibleByExternalValue(received) {
    const projects = await getProjectsWithAsync();
    const externalValue = projects.length;
    /*when pass is true, message should return the error
     message for when expect(x).not.yourMatcher() fails.
     */
    const pass = received % externalValue == 0; //Pass indicates whether there is a match or not
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
test("is divisible by external value", async () => {
  await expect(4).toBeDivisibleByExternalValue(); //expect(x).yourMatcher() When you expect it to match for a truthy value but it does not
  await expect(5).not.toBeDivisibleByExternalValue(); // expect(x).not.yourMatcher() When you expect it to match for a falsy value but it does not
});

// expect.extend(matchers) - Custom Matchers API with Utils (Helpful tools to display errors messages nicely)
// https://jestjs.io/docs/expect#custom-matchers-api
const { diff } = require("jest-diff");
expect.extend({
  toBe(received, expected) {
    const options = {
      comment: "Check for equality with Object.is",
      isNot: this.isNot,
      promise: this.promise,
    };

    const pass = Object.is(received, expected);

    const message = pass
      ? () =>
          this.utils.matcherHint("toBe", undefined, undefined, options) +
          "\n\n" +
          `Expected: not ${this.utils.printExpected(expected)}\n` +
          `Received: ${this.utils.printReceived(received)}`
      : () => {
          const diffString = diff(expected, received, {
            expand: this.expand,
          });
          return (
            this.utils.matcherHint("toBe", undefined, undefined, options) +
            "\n\n" +
            (diffString && diffString.includes("- Expect") //Shows full differences and errors
              ? `Difference:\n\n${diffString}`
              : `Expected: ${this.utils.printExpected(expected)}\n` +
                `Received: ${this.utils.printReceived(received)}`)
          );
        };

    return { actual: received, message, pass };
  },
});

test("Check for equality", async () => {
  expect("banana").toBe("banana");
  expect("banana").not.toBe("rain");
});

// Custom snapshot matchers https://jestjs.io/docs/expect#custom-snapshot-matchers

const { toMatchSnapshot } = require("jest-snapshot");

expect.extend({
  toMatchTrimmedSnapshot(received, length) {
    return toMatchSnapshot.call(
      this,
      received.substring(0, length),
      "toMatchTrimmedSnapshot"
    );
  },
});

it("stores not less than the 10 characters", () => {
  expect("extra long string oh my gerd").toMatchTrimmedSnapshot(10);
});

it("stores not less than the 15 characters", () => {
  expect("extra long string oh my gerd").toMatchTrimmedSnapshot(15);
});

// const { toMatchInlineSnapshot } = require("jest-snapshot");

// expect.extend({
//   toMatchTrimmedInlineSnapshot(received, ...rest) {
//       return toMatchInlineSnapshot.call(
//         this,
//         received.substring(0, 10),
//         ...rest
//       );
//   },
// });

// // Matches inline snapshot
// it("stores not less than the 10 characters", () => {
//   expect("extra long string oh my gerd").toMatchTrimmedInlineSnapshot(
//     `"extra long"`
//   );
// });

// Async custom inline snapshot matcher https://jestjs.io/docs/expect#async
expect.extend({
  async toMatchObservationInlineSnapshot(fn, ...rest) {
    // The error (and its stacktrace) must be created before any `await`
    this.error = new Error();

    // The implementation of `observe` doesn't matter.
    // It only matters that the custom snapshot matcher is async.
    const observation = await observe(async () => {
      await fn();
    });

    return toMatchInlineSnapshot.call(this, recording, ...rest);
  },
});

it("observes something", async () => {
  await expect(getProjectsWithAsync()).toMatchObservationInlineSnapshot();
});
