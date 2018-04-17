var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3300,
    user: "root",
    password: "root",
    database: "bamazonDB"
});
connection.connect(function (err) {
    if (err) throw err;
    management();
});

function management() {
    connection.query("SELECT * FROM products", function (err) {
        if (err) throw err;
        inquirer.prompt([
            {
                name: "Options",
                type: "rawlist",
                message: "What would you like to do?",
                choices: ["View Prodcts for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Quit"]
            }
        ])
            .then(function (answer) {
                var choice = answer.Options;

                switch (choice) {
                    case "View Prodcts for Sale":
                        
                        return inventory();

                    case "View Low Inventory":
                        return lowInventory();

                    case "Add to Inventory":
                        return addInventory();

                    case "Add New Product":
                        return newProduct();

                    case "Quit":
                        return connection.end()


                };
            }
        )})};

                function inventory() {
                    connection.query("SELECT * FROM products", function (err, results) {
                        if (err) throw err;

                        for (let i = 0; i < results.length; i++) {
                            console.log("\nItem: " + results[i].item_id + '\nProduct: ' + results[i].product_name + '\nCost: $' + results[i].price + '\nInventory: ' + results[i].stock_quantity + '\n-------------------------')
                            // console.log(results[i])

                        }


                    })
                };

                function lowInventory() {
                    connection.query("SELECT * FROM products", function (err, results) {
                        if (err) throw err;
                        console.log("\nProducts with less than 5 items in stock\n");
                        for (let i = 0; i < results.length; i++) {
                            if (results[i].stock_quantity < 5) {

                                console.log(results[i].product_name);
                            }

                        }
                    })
                };

                function addInventory() {
                    connection.query("SELECT * FROM products", function (err, results) {
                        if (err) throw err;

                        inquirer.prompt([
                            {
                                name: "addItem",
                                type: "rawlist",
                                message: "Which product do you want to update?",
                                choices: function () {
                                    var productArray = [];
                                    for (let i = 0; i < results.length; i++) {
                                        productArray.push(results[i].product_name);
                                       
                                    }
                                    return productArray
                                   
                                }
                                
                            },
                            {
                                name: "update",
                                type: "input",
                                message: "How many are you adding?"
                            }

                        ])
                        .then(function(answer){
                            var chosenItem;
                            
                            for (var i = 0; i < results.length; i++) {
                                if(results[i].product_name === answer.addItem){
                            chosenItem = results[i];
                            var quantity = parseInt(answer.update) + chosenItem.stock_quantity;
                            }
                        }
                            // console.log("new amount" + chosenItem.stock_quantity)
                         
                        connection.query("UPDATE products SET ? WHERE ?",
                            [{
                                stock_quantity: quantity,
                                
                            },
                            {
                                item_id: chosenItem.item_id,
                            }
                        ]),
                            function (err, result) {
                                if (err) throw err;
                                
                            }

                            console.log(quantity)
                      })}
                    )
                };

                function newProduct(){
                    inquirer.prompt(
                        [{
                        name: "item",
                        type: "input",
                        message: "Item name?"
                    },
                    {
                        name: "dept",
                        type: "input",
                        message: "Which department?"
                    },
                    {
                        name: "price",
                        type: "input",
                        message: "Price?",
                        validate: function(value) {
                            if (isNaN(value) === false) {
                              return true;
                            }
                            return false;
                          }
                    },
                    {
                        name: "amount",
                        type: "input",
                        message: "How many do we have in stock?",
                        validate: function(value) {
                            if (isNaN(value) === false) {
                              return true;
                            }
                            return false;
                          }
                    }
                ])
                .then(function(answer){

                    var price = +answer.price;
                    var stock = parseInt(answer.amount);
                    connection.query("INSERT INTO products SET ?",
                    {
                        product_name: answer.item,
                        department_name: answer.dept,
                        price: price,
                        stock_quantity: stock
                    },
             
                function(err, results){
                    if (err) throw err;
                }
                 ) });
                 management();
                }; //the end of newProduct

                // management();
            

        
    


//   * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.

//   * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.


