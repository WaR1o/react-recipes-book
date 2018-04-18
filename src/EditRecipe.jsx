import React from "react";
import { Button, Header, Input, Modal, Form } from "semantic-ui-react";
import "./EditRecipe.css";

class EditRecipe extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      name: "",
      ingridients: "",
      isOpen: true
    };
    this.openForm = this.openForm.bind(this);
    this.handleFormSave = this.handleFormSave.bind(this);
    this.handleRecipeChange = this.handleRecipeChange.bind(this);
    this.handleIngridientsChange = this.handleIngridientsChange.bind(this);
  }

  componentDidMount() {
    if (this.props.editMode) {
      this.setState({
        id: this.props.id,
        name: this.props.recipe,
        ingridients: this.props.ingridients
      });
    }
  }

  handleRecipeChange(e) {
    this.setState({ name: e.target.value });
  }

  handleIngridientsChange(e) {
    let ingridientsArr =
      typeof e.target.value === "string" ? e.target.value.split(",") : "";
    this.setState({ ingridients: ingridientsArr });
  }

  handleFormSave() {
    this.props.onSave(this.state);
    this.closeForm();
  }

  openForm() {
    this.setState({ isOpen: true });
  }

  closeForm() {
    this.setState({ isOpen: false });
  }

  render() {
    const modalWindow = (
      <React.Fragment>
        <Modal.Header>{this.props.header}</Modal.Header>
        <Modal.Content>
          <Form.Field>
            <label>Recipe name</label>
            <Input
              onChange={this.handleRecipeChange}
              value={this.state.name}
              className="ui input"
              placeholder="Type recipe name"
            />
          </Form.Field>
          <Form.Field>
            <label>Ingridients</label>
            <Input
              onChange={this.handleIngridientsChange}
              value={this.state.ingridients}
              className="ui input"
              placeholder="Type recipe ingridients"
            />
          </Form.Field>
          <Button
            onClick={this.handleFormSave}
            type="submit"
            className="ui button"
            floated="right"
          >
            Save recipe
          </Button>
        </Modal.Content>
      </React.Fragment>
    );

    return (
      <Modal
        trigger={<Button onClick={this.openForm}>{this.props.label}</Button>}
      >
        {this.state.isOpen ? modalWindow : ""}
      </Modal>
    );
  }
}

export default EditRecipe;
