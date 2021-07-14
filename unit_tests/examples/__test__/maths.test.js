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

// expect.extend(matchers) - Async Matchers
// https://jestjs.io/docs/expect#async-matchers
expect.extend({
  async toBeDivisibleByExternalValue(received) {
    const projects = await getProjectsWithAsyncAwait();
    const externalValue = projects.length;

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

test("is divisible by external value", () => {
  expect(100).toBeDivisibleByExternalValue();
  expect(5).not.toBeDivisibleByExternalValue();
});
test("is divisible by external value", async () => {
  await expect(4).toBeDivisibleByExternalValue();
  await expect(5).not.toBeDivisibleByExternalValue();
});

// Custom matchers https://jestjs.io/docs/expect#custom-matchers-api
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
      received.substring(1, length),
      "toMatchTrimmedSnapshot"
    );
  },
});

it("stores not less than the 10 characters", () => {
  expect("A very long sentences testing").toMatchTrimmedSnapshot(10);
});

it("stores not less than the 15 characters", () => {
  expect("extra long string oh my gerd").toMatchTrimmedSnapshot(15);
});

async function getTempateByID(templateID) {
  const projects = await getProjectsWithAsyncAwait();
  const getProjectByID = projects.filter(
    (project) => project.id === templateID
  );
  return getProjectByID;
}

expect.extend({
  async toMatchAPITemplate(received) {
    // console.log("received", received)
    return toMatchSnapshot.call(
      this,
      received.toString(),
      "toMatchAPITemplate"
    );
  },
});

it("Compare By UI template", async () => {
  const getTemplate = await getTempateByID(1);
  await expect(getTemplate[0].template).toMatchAPITemplate();
});
