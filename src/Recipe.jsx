import React, { Component } from "react";
import { Button, Input, Accordion, Icon } from "semantic-ui-react";
import Ingridient from "./Ingridient";
import EditRecipe from "./EditRecipe";

class Recipe extends Component {
  constructor(props) {
    super(props);

    this.handleOnSave = this.handleOnSave.bind(this);
    this.handleOnDelete = this.handleOnDelete.bind(this);
    this.toggleAccordion = this.toggleAccordion.bind(this);
  }

  handleOnDelete() {
    if (this.props && this.props.onDelete) {
      this.props.onDelete(this.props.recipe);
    }
  }

  handleOnSave(recipe) {
    this.props.onEdit(recipe);
  }

  toggleAccordion() {
    this.props.onAccordionClick(this.props.index);
  }

  render() {
    const buttons =
      this.props.recipe.name && this.props.onDelete ? (
        <div>
          <EditRecipe
            label="Edit"
            header="Edit recipe"
            id={this.props.recipe.id}
            editMode={true}
            recipe={this.props.recipe.name}
            ingridients={this.props.recipe.ingridients}
            onSave={this.handleOnSave}
          />
          <Button className="ui red button" onClick={this.handleOnDelete}>
            Delete
          </Button>
        </div>
      ) : (
        ""
      );
    return (
      <React.Fragment>
        <Accordion.Title
          active={this.props.activeIndex === this.props.index}
          onClick={this.toggleAccordion}
        >
          <Icon name="dropdown" />
          {this.props.recipe.name}
        </Accordion.Title>
        <Accordion.Content active={this.props.activeIndex === this.props.index}>
          {this.props.recipe.ingridients.map((name, i) => (
            <Ingridient name={name} key={i} />
          ))}
          {buttons}
        </Accordion.Content>
      </React.Fragment>
    );
  }
}

export default Recipe;
