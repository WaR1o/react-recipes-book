import React, { Component } from "react";
import uuid from "uuid";
import { Accordion } from "semantic-ui-react";
import { RECIPIES } from "./mock-data";
import Recipe from "./Recipe";
import EditRecipe from "./EditRecipe";

class RecipiesList extends Component {
  constructor(props) {
    super(props);
    this.state = { recipies: [], activeIndex: 0 };

    this.handleRecipeSave = this.handleRecipeSave.bind(this);
    this.handleRecipeDelete = this.handleRecipeDelete.bind(this);
    this.handleAccordionClick = this.handleAccordionClick.bind(this);
    this.handleRecipeEdit = this.handleRecipeEdit.bind(this);
  }

  componentDidMount() {
    this.getRecipies();
  }

  getRecipies() {
    let recipies = JSON.parse(localStorage.getItem("recipies"));
    this.setState({ recipies: recipies ? recipies : RECIPIES });
  }

  handleAccordionClick(tabIndex) {
    const index = tabIndex;
    const activeIndex = this.state.activeIndex;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  }

  handleRecipeSave(savedRecipe) {
    savedRecipe["id"] = uuid.v4();
    const newRecipies = this.state.recipies.concat(savedRecipe);
    this.saveToLocalStorage(newRecipies);
    this.setState({ recipies: newRecipies });
  }

  handleRecipeEdit(editedRecipe) {
    console.log(
      "editedRecipe",
      editedRecipe,
      "state recipies",
      this.state.recipies
    );
    let newRecipies = this.state.recipies.map(recipe => {
      if (recipe.id === editedRecipe.id) {
        return Object.assign({}, recipe, {
          name: editedRecipe.name,
          ingridients: editedRecipe.ingridients
        });
      } else {
        return recipe;
      }
    });
    this.saveToLocalStorage(newRecipies);
    this.setState({ recipies: newRecipies });
  }

  handleRecipeDelete(item) {
    const nextRecipies = this.state.recipies.filter(
      recipe => item.id !== recipe.id
    );
    this.saveToLocalStorage(nextRecipies);
    this.setState({ recipies: nextRecipies });
  }

  saveToLocalStorage(recipies) {
    localStorage.setItem("recipies", JSON.stringify(recipies));
  }

  render() {
    return (
      <div className="recipies__dashboard">
        <Accordion fluid styled>
          {this.state.recipies.map((recipe, i) => (
            <Recipe
              key={recipe.id}
              recipe={recipe}
              onDelete={this.handleRecipeDelete}
              onEdit={this.handleRecipeEdit}
              onAccordionClick={this.handleAccordionClick}
              index={i}
              activeIndex={this.state.activeIndex}
            />
          ))}
        </Accordion>
        <br />
        <EditRecipe
          onSave={this.handleRecipeSave}
          label="Add recipe"
          header="Add recipe"
        />
      </div>
    );
  }
}

export default RecipiesList;
