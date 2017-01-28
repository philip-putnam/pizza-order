// Back-end, business logic

function Pizza() {
  this.pizzaSize;
  this.pizzaToppings = [];
  this.numberOfToppings;
  this.pizzaPrice = 0;
}

function Order() {
  this.pizzas = [];
  this.orderTotal = 0;
  this.numberOfPizzas;
}

Pizza.prototype.createPizza = function(pizzaSize, pizzaTopping) {
  this.pizzaSize = pizzaSize;
  this.pizzaToppings = pizzaTopping;
  this.numberOfToppings = pizzaTopping.length;
}

Pizza.prototype.calcPizzaPrice = function() {
  // An array "sizePrices" holds the size to price key-value pairs
  var sizePrices = [
    {pizzaSize: "Small", price: 6},
    {pizzaSize: "Medium", price: 8},
    {pizzaSize: "Large", price: 10}
  ];
  var meatToppings = ["pepperoni", "sasauge", "bacon", "salami", "ground beef"];
  for (var index = 0; index < sizePrices.length; index++) {
    if (this.pizzaSize === sizePrices[index].pizzaSize) {
      this.pizzaPrice += sizePrices[index].price;
    }
  }
  // I decided non-meat toppings were $1 and meat was $2.5, since any topping started wtih a base of $1, I simply added $1.5 if it was meat. Using this nested for-loop
  for (var index = 0; index < this.numberOfToppings; index++) {
    this.pizzaPrice += 1;
    for (var ctr = 0; ctr < meatToppings.length; ctr++) {
      if (this.pizzaToppings[index] === meatToppings[ctr]) {
        this.pizzaPrice += 1.5;
        ctr = meatToppings.length;
      }
    }
  }


}

Order.prototype.addPizzaToOrder = function(pizza) {
  this.pizzas.push(pizza);
  this.numberOfPizzas = (this.pizzas.length - 1);
  this.orderTotal += pizza.pizzaPrice;
}

Order.prototype.returnOrderInfo = function(pizzaNumber) {
  return {
    pizzaSize: this.pizzas[pizzaNumber].pizzaSize,
    pizzaToppings: this.pizzas[pizzaNumber].pizzaToppings,
    numberOfToppings: this.pizzas[pizzaNumber].numberOfToppings,
    pizzaPrice: this.pizzas[pizzaNumber].pizzaPrice,
    orderTotal: this.orderTotal,
    numberOfPizzas: this.numberOfPizzas
  };
}

Order.prototype.pizzaAmount = function() {
  return this.numberOfPizzas;
}

// Front-end, user-interface logic

function displayOrder (userOrderInfo) {
  $(".col-md-4").append(userOrderInfo.pizzaSize + " ");
  userOrderInfo.pizzaToppings.forEach(function(topping) {
    $(".col-md-4").append(" " + topping + ", ");
  })
  $(".col-md-4").append("pizza<br>");
  $(".col-md-4").append("Pizza price: $" + userOrderInfo.pizzaPrice + ".<br>");
  $("#order-total").text("Order Total: $" + userOrderInfo.orderTotal);
}

$(document).ready(function() {
  var userOrder = new Order();

  $("#add-to-cart-button").click(function() {
    var userPizza = new Pizza();
    var userTopping = [];
    var userPizzaSize = $("#user-pizza-size").val();
    $("input:checkbox[name=user-pizza-toppings]:checked").each(function() {
      userTopping.push($(this).val());
    })
    userPizza.createPizza(userPizzaSize, userTopping);
    userPizza.calcPizzaPrice();
    userOrder.addPizzaToOrder(userPizza);

    var outputOrder = userOrder.returnOrderInfo(userOrder.pizzaAmount());
    displayOrder(outputOrder);
  });

});
