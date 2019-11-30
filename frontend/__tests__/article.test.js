import { shallow } from "enzyme";

import ArticleComponent from "../components/Articles/Article";

// Mock Article
const fakeArticle = {
  id: "ABC123",
  title: "A Cool Title",
  price: 3000,
  adresse: "3 street",
  image: "test.jpg",
  description: "A cool Article Description",
  user: { // Creator
      id: "134"
  },
  users: ["134", "456"] // Registered Users
};

describe("<Article />", () => {
  it("Render and Display the Article", () => {
    const wrapper = shallow(<ArticleComponent article={fakeArticle} />);
    const PriceTag = wrapper.find(".createdEditedBy span").first();
    expect(PriceTag.text()).toContain("Créé le");
    expect(wrapper.find(".articleInformations a").text()).toBe(fakeArticle.title);
    // expect (img.props().src).toBe(fakeArticle.image);
  });
});
