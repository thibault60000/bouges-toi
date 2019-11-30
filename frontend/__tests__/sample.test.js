describe("sample test 101", () => {
  it("works as expected", () => {
    const age = 100;
    expect(1).toEqual(1);
    expect(age).toEqual(100);
  });
  it("Handles Ranges just fine", () => {
    const age = 200;
    expect(age).toBeGreaterThan(100);
  });

  it("Makes a list of dog names", () => {
    const dogs = ["snickers", "hugo"];
    expect(dogs).toEqual(dogs);
    expect(dogs).toContain('snickers');
  });
});
