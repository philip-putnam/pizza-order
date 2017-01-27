// Back-end, business logic

function Pizza() {
  this.pizzaSize;
}

function Order() {
  this.pizzas = [];
}

Pizza.prototype.createPizza = function(pizzaSize) {
  this.pizzaSize = pizzaSize;
}

Order.prototype.addPizzaToOrder = function(pizza) {
  this.pizzas.push(pizza);
}

// Front-end, user-interface logic

$(document).ready(function() {
var userOrder = new Order();
var userPizza = new Pizza();

  $("#size-button").click(function() {
    var userInput = $("#user-pizza-size").val();
    userPizza.createPizza(userInput);
    userOrder.addPizzaToOrder(userPizza);
    $(".col-md-4").append(userOrder.pizzas[0].pizzaSize);
    // alert(tempOrder.pizzas[0].pizzaSize);
  })

});
