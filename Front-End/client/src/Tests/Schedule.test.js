import React from "react";
import renderer from "react-test-renderer";
import ErrorPage from "../Pages/ErrorPage";


it("renders correctly", () => {
  const tree = renderer.create(<ErrorPage></ErrorPage>).toJSON();
  expect(tree).toMatchSnapshot();
});