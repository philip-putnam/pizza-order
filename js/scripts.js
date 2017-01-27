// Back-end, business logic

function Pizza() {
  this.pizzaSize;
  this.pizzaToppings = [];
  this.numberOfToppings;
}

function Order() {
  this.pizzas = [];
}

Pizza.prototype.createPizza = function(pizzaSize, pizzaTopping) {
  this.pizzaSize = pizzaSize;
  this.pizzaToppings = pizzaTopping;
  this.numberOfToppings = pizzaTopping.length;
}

Order.prototype.addPizzaToOrder = function(pizza) {
  this.pizzas.push(pizza);
}

Order.prototype.orderPrice = function() {
  alert(this.pizzas[0].pizzaToppings);
  alert(this.pizzas[0].numberOfToppings);
  var orderTotal = 0;
  // An array "sizePrices" holds the size to price key-value pairs
  var sizePrices = [
    {pizzaSize: "Small", price: 6},
    {pizzaSize: "Medium", price: 8},
    {pizzaSize: "Large", price: 10}
  ];
  var meatToppings = ["pepperoni", "sasauge", "bacon", "salami", "ground beef"]

  // For loop, iterates through the "sizePrices" array
  for (var index = 0; index < sizePrices.length; index++) {
    if (this.pizzas[0].pizzaSize === sizePrices[index].pizzaSize) {
      orderTotal += sizePrices[index].price;
    }
  }

  for (var index = 0; index < meatToppings.length; index++) {
    for (var counter = 0; counter < this.pizzas[0].numberOfToppings; counter++){
      if (this.pizzas[0].pizzaToppings[0] === meatToppings[index]) {
        orderTotal += 2.5;
      } else {
        orderTotal += 1;
      }
    }
  }

  return orderTotal;
}

// Front-end, user-interface logic

$(document).ready(function() {

  $("#add-to-cart-button").click(function() {
    var userOrder = new Order();
    var userPizza = new Pizza();
    var userTopping = [];
    var userPizzaSize = $("#user-pizza-size").val();
    var userPizzaTopping = $("#user-pizza-topping").val();
    userTopping.push(userPizzaTopping);
    userPizzaTopping = $("#user-add-topping").val();
    userTopping.push(userPizzaTopping);
    userPizza.createPizza(userPizzaSize, userTopping);
    userOrder.addPizzaToOrder(userPizza);
    $(".col-md-4").append(userOrder.pizzas[0].pizzaSize + " " + userOrder.pizzas[0].pizzaToppings[0] + " pizza ");
    $(".col-md-4").append("Total: $" + userOrder.orderPrice() + "<br>");
  });

  $("#add-topping-button").click(function() {
    $("#add-to-cart-button").before('<select class="form-control" id="user-add-toping">' +
                                      '<option>extra cheese</option>' +
                                      '<option>pepperoni</option>' +
                                      '<option>mushroom</option>' +
                                    '</select>');
  });


});
