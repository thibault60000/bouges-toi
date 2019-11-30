import formatMoney from "../lib/formatMoney";

describe("formatMoney Function", () => {
  xit("works with franctional euros", () => {
    expect(formatMoney(1)).toEqual("€ 0.01");
  });

  xit("leaves cents off for whole dollars", () => {
    expect(formatMoney(5000)).toEqual("€ 50");
    expect(formatMoney(100)).toEqual("€ 1");
    expect(formatMoney(500000000)).toEqual("€ 500000");
  });

  xit("works with whole and fractional euros", () => {
    expect(formatMoney(5012)).toEqual("€ 50.12");
    expect(formatMoney(101)).toEqual("€ 1.01");
  });
});
