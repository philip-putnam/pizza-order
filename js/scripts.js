// Back-end, business logic

function Pizza() {
  this.pizzaSize;
  this.pizzaTopping;
}

function Order() {
  this.pizzas = [];
}

Pizza.prototype.createPizza = function(pizzaSize, pizzaTopping) {
  this.pizzaSize = pizzaSize;
  this.pizzaTopping = pizzaTopping;
}

Order.prototype.addPizzaToOrder = function(pizza) {
  this.pizzas.push(pizza);
}

Order.prototype.orderPrice = function() {
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
    if (this.pizzas[0].pizzaTopping === meatToppings[index]) {
      orderTotal += 2.5;
    } else {
      orderTotal += 1;
    }
  }

  return orderTotal;
}

// Front-end, user-interface logic

$(document).ready(function() {
var userOrder = new Order();
var userPizza = new Pizza();

  $("#add-to-cart-button").click(function() {
    var userPizzaSize = $("#user-pizza-size").val();
    var userPizzaTopping = $("#user-pizza-topping").val();
    userPizza.createPizza(userPizzaSize, userPizzaTopping);
    userOrder.addPizzaToOrder(userPizza);
    $(".col-md-4").append(userOrder.pizzas[0].pizzaSize + " " + userOrder.pizzas[0].pizzaTopping + " pizza ");
    $(".col-md-4").append("Total: $" + userOrder.orderPrice() + "<br>");
  });

  $("#add-topping-button").click(function() {
    $("#add-to-cart-button").before('<select class="form-control" id="user-pizza-toping">' +
                                      '<option>extra cheese</option>' +
                                      '<option>pepperoni</option>' +
                                      '<option>mushroom</option>' +
                                    '</select>');
  });


});
