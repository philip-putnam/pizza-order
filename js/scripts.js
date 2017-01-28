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

Order.prototype.addPizzaToOrder = function(pizza) {
  this.pizzas.push(pizza);
  this.numberOfPizzas = (this.pizzas.length - 1);
}

Order.prototype.orderPrice = function() {

  // An array "sizePrices" holds the size to price key-value pairs
  var sizePrices = [
    {pizzaSize: "Small", price: 6},
    {pizzaSize: "Medium", price: 8},
    {pizzaSize: "Large", price: 10}
  ];
  var meatToppings = ["pepperoni", "sasauge", "bacon", "salami", "ground beef"];
  // For loop, iterates through the "sizePrices" array
  for (var index = 0; index < sizePrices.length; index++) {
    if (this.pizzas[0].pizzaSize === sizePrices[index].pizzaSize) {
      this.orderTotal += sizePrices[index].price;
    }
  }
  // I decided non-meat toppings were $1 and meat was $2.5, since any topping started wtih a base of $1, I simply added $1.5 if it was meat. Using this nested for-loop
  for (var index = 0; index < this.pizzas[0].numberOfToppings; index++) {
    this.orderTotal += 1;
    for (var ctr = 0; ctr < meatToppings.length; ctr++) {
      if (this.pizzas[0].pizzaToppings[index] === meatToppings[ctr]) {
        this.orderTotal += 1.5;
        ctr = meatToppings.length;
      }
    }
  }
}

Order.prototype.returnOrderInfo = function(pizzaNumber) {
  return {
    pizzaSize: this.pizzas[pizzaNumber].pizzaSize,
    pizzaToppings: this.pizzas[pizzaNumber].pizzaToppings,
    numberOfToppings: this.pizzas[pizzaNumber].numberOfToppings,
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
  $(".col-md-4").append("Total: " + userOrderInfo.orderTotal + ".<br>");
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
    userOrder.addPizzaToOrder(userPizza);
    userOrder.orderPrice();


    var outputOrder = userOrder.returnOrderInfo(userOrder.pizzaAmount());
    displayOrder(outputOrder);

    $("#user-add-topping").hide();
  });

});
