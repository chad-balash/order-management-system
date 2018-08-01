const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "balasher",
  
    // Your password
    password: "3201111",
    database: "bamazon"
  });
  
    // connection to mysql
  connection.connect(function(err) {
    if (err) throw err;
    // Welcome message
    console.log('\nWelcome to Bamazon! \nThe World\'s Largest Selection of First Aid Kits!');
    // call to function to display a list of products in db
    displayProducts();
  });

  function runShop() {
    inquirer
      .prompt({
        name: "action",
        type: "rawlist",
        message: "\nWhat would you like to do?",
        choices: [
          'Shop store',
          'Exit store'
        ]
      })
      .then(function(answer) {
        switch (answer.action) {

        case "Shop store":
            console.log('\nGreat! \nPlease follow the prompts to place your order.');
            connection.end();
          break;
  
        case "Exit store":
            console.log('\nExiting store. Have a Safe Day!');
            connection.end();
          break;

        default:
        console.log('\nPlease select an option.');
          break;
  
        }
      });
  }


//   function to run a query on 'products' table for specific columns
  function displayProducts() {
      console.log('\nSelecting all products for sale...\n')
      connection.query('SELECT item_id, product_name, price FROM products', function(err, res) {
          if (err) throw err;
          for (let i = 0; i < res.length; i++) {
            console.log("Item#: " + res[i].item_id + " || Description: " + res[i].product_name + " || Price: " + res[i].price);
          }
          runShop();
        //   connection.end();
      })
  }