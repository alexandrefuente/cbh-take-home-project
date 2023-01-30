const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
  it("Returns the a hash when given a value", () => {
    const trivialKey = deterministicPartitionKey(10);
    expect(trivialKey).not.toBe(0);
  });
});
