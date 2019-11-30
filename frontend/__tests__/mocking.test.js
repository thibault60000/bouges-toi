function Person(name, foods) {
  this.name = name;
  this.foods = foods;
}

Person.prototype.fetchFavFood = function() {
  return new Promise((resolve, reject) => {
    // Simulate an API
    setTimeout(() => resolve(this.foods), 2000);
  });
};

describe("Mocking learning", () => {
  it("Mocks a reg function", () => {
    const fetchDogs = jest.fn(); // Mock function
    fetchDogs("snickers"); // Call 1
    expect(fetchDogs).toHaveBeenCalled();
    expect(fetchDogs).toHaveBeenCalledWith("snickers");
    fetchDogs("gus"); // Call 2
    expect(fetchDogs).toHaveBeenCalledTimes(2);
  });

  it("Can create a person", () => {
    const me = new Person("Thib", ["pizza", "burgs"]);
    expect(me.name).toBe("Thib");
  });

  it("Can fetch foods", async () => {
    const me = new Person("Thib", ["pizza", "burgs"]);
    // Mock the favFoods function
    me.fetchFavFood = jest.fn().mockResolvedValue(["sushis", "burgs"]);
    const favFoods = await me.fetchFavFood();
    expect(favFoods).toContain("sushis");
  });
});
