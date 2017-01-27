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

// Front-end, user-interface logic

$(document).ready(function() {
var userOrder = new Order();
var userPizza = new Pizza();

  $("#size-button").click(function() {
    var userPizzaSize = $("#user-pizza-size").val();
    var userPizzaTopping = $("#user-pizza-topping").val();
    userPizza.createPizza(userPizzaSize, userPizzaTopping);
    userOrder.addPizzaToOrder(userPizza);
    $(".col-md-4").append(userOrder.pizzas[0].pizzaSize + " " + userOrder.pizzas[0].pizzaTopping + " pizza");
  })

});
