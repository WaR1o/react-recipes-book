import uuid from "uuid";

export const RECIPIES = [
  {
    id: uuid.v4(),
    name: "Pizza",
    ingridients: ["Dough", "Cheese", "Tomatoes"]
  },
  {
    id: uuid.v4(),
    name: "Plov",
    ingridients: ["Rice", "Carrot", "Garlic", "Chicken"]
  },
  {
    id: uuid.v4(),
    name: "Borsch",
    ingridients: ["Water", "Potatoes", "Beet", "Carrot", "Meat"]
  }
];
