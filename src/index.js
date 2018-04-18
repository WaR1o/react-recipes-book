import React from "react";
import { render } from "react-dom";
import RecipiesList from "./RecipiesList";
import EditRecipe from "./EditRecipe";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const App = () => (
  <div style={styles}>
    <RecipiesList />
  </div>
);

render(<App />, document.getElementById("root"));
