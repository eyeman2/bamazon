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
    readProducts();

});
function readProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++){
        console.log("\nItem: " + res[i].item_id + '\nProduct: ' + res[i].product_name + '\nCost: $' + res[i].price + '\nInventory: ' + res[i].stock_quantity + '\n-------------------------');
        }
        start();
    });

}

function start() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        inquirer.prompt([
            {
                name: "PickItem",
                type: "list",
                message: "Which item would you like?",
                choices: function () {
                    var prodcutArray = [];
                    for (let i = 0; i < results.length; i++) {
                        prodcutArray.push(results[i].product_name);
                    }
                    return prodcutArray;
                    console.log(results[i]);
                }
            },
            {
                name: "howMany",
                type: "input",
                message: "How many would you like?"
            },
        ])

            // console.log(choices)
            .then(function (answer) {
               
                if (err) throw err;

                var chosenItem;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].product_name === answer.PickItem) {
                        chosenItem = results[i];
                        
                    } 
                   
                }

                var inventory = chosenItem.stock_quantity

                if (answer.howMany <= inventory) {
                    var newInventory = inventory - answer.howMany;
                    connection.query("UPDATE products SET ? WHERE ?", [{
                        stock_quantity: newInventory,
                    },
                    {
                        item_id: chosenItem.item_id
                    }

                    ]), function (err, result) {
                        if (err) throw err;
                        
                        
                    };
                        console.log("You purchased " + answer.howMany + " at $"  + chosenItem.price + " per item.  You owe $" + answer.howMany * chosenItem.price);
                        // console.log("You owe: ", );
                        connection.end();
                }

                else {
                    console.log("There are only ", chosenItem.stock_quantity, "left in stock.");
                    start();
                    

            }
                });

    });
    }