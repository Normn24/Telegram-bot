import pizzaImg from "../images/pizza.png"
import burgerImg from "../images/burger.png"
import cocaImg from "../images/coca.png"
import saladImg from "../images/salad.png"
import waterImg from "../images/water.png"
import cheeseImg from "../images/cheese.png"
import kebabImg from "../images/kebab.png"
import smetanaImg from "../images/smetana.png"

export function getData() {
  return [
    { title: "Pizza", price: 17.99, Image: pizzaImg, id: 1 },
    { title: "Burger", price: 15, Image: burgerImg, id: 2 },
    { title: "Coca", price: 3.5, Image: cocaImg, id: 3 },
    { title: "Kebab", price: 13.9, Image: kebabImg, id: 4 },
    { title: "Salad", price: 6.5, Image: saladImg, id: 5 },
    { title: "Water", price: 0.99, Image: waterImg, id: 6 },
    { title: "Cheese", price: 40, Image: cheeseImg, id: 7 },
    { title: "Smetana", price: 55, Image: smetanaImg, id: 8 },
  ];
}
