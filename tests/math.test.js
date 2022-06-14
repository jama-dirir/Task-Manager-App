const {
  calculateTip,
  sum,
  fahrenheitToCelsius,
  celsiusToFahrenheit,
  add,
} = require("../math");

describe("Some Pure Functions", () => {
  test("Should calculate calculateTip", () => {
    const total = calculateTip(10, 0.3);
    expect(total).toBe(13);
    //  THIS IS OLD.
    // if (total !== 13) {
    //   throw new Error("Total tip should be 13! Got" + " " + total);
    // }
  });

  test("Should calculateTip default", () => {
    const total = calculateTip(10);
    expect(total).toBe(12.5);
  });

  test("Should add numbers!", () => {
    const total = sum(10, 10);
    // if (total !== 20) {
    //   throw new Error("Total should be 20 Got" + " " + total);
    // }
    expect(total).toBe(20);
  });

  test("Should convert 32 F to 0 C", () => {
    const fahrTocelc = fahrenheitToCelsius(32);
    expect(fahrTocelc).toBe(0);
  });

  test("Should convert 0 C to 32 F", () => {
    const celcFerh = celsiusToFahrenheit(0);
    expect(celcFerh).toBe(32);
  });

  test("async demo", (done) => {
    setTimeout(() => {
      expect(1).toBe(1);
      done();
    }, 2000);
  });
});

describe("Asynchronous Functions", () => {
  test("Should add two numbers", (done) => {
    add(10, 20).then((sum) => {
      expect(sum).toBe(30);
      done();
    });
  });

  test("Should add two numbers Async/Await", async () => {
    const sum = await add(10, 10);
    expect(sum).toBe(20);
  });
});
