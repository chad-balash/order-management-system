// dependencies 
const mysql = require('mysql');
const inquirer = require('inquirer');

// SQL credentials 
const connection = mysql.createConnection({
    host     : 'localhost',
    port     : 3306,
    user     : 'balasher',
    password : '3201111',
    database : 'bamazon'
  });
  
    // connection to mysql
  connection.connect(function(err) {
    if (err) throw err;
    // Welcome message
    console.log('\nWelcome to Bamazon! \nThe World\'s Largest Selection of First Aid Kits!');
    // call to function to display a list of products in db
    displayProducts();
  });

  // Function to prompt user. 
  // Asks if user would like to shop the store, 
  // then takes response through a switch statement to run the correct block of code
  function runShop() {
    inquirer
      .prompt({
        name: 'action',
        type: 'confirm',
        message: 'Would you like to place an order?',
        default: true
      })
      .then(function(answer) {

        switch (answer.action) {

        case true:
            console.log('\nAwesome! Please follow the prompts to place your order.\n');
            order();
          break;
  
        case false:
            console.log('\nExiting store. Have a Safe Day!');
            connection.end();
          break;

        default:
        console.log('\nPlease select an option.');
          break;
        }
      });
  }


//   function to run a query on 'products' table for specific columns to display when connection is started
  function displayProducts() {
      console.log('\nSelecting all products for sale...\n')
      connection.query('SELECT item_id, product_name, price FROM products', function(err, res) {
          if (err) throw err;
          for (let i = 0; i < res.length; i++) {
            console.log('Item#: ' + res[i].item_id + ' || Description: ' + res[i].product_name + ' || Price: ' + res[i].price);
          }
          console.log('\n');
          runShop();
      })
  }

  // Order function. Prompts user for item number and quantity of product.
  function order() {
    inquirer
      .prompt([
        {
          name: 'itemID',
          type: 'input',
          message: 'Enter the item number of the product you would like to purchase from the above list.',
        },
        {
          name: 'quantity',
          type: 'input',
          message: 'How many units would you like to purchase?',
          validate: function(value) { // Validation for number entered
            let valid = !isNaN(parseFloat(value));
            return valid || 'Please enter a number';
          },
          filter: Number
        }
      ])
      .then(function(answer){
        connection.query('SELECT * FROM products WHERE ?', {item_id: answer.itemID}, function(err, res) {  //query to sql db to select all columns from the product table based on user input
          let stockAvailable = res[0].stock_quantity; //set variable for current available stock with response from query
          let quantityRequest = answer.quantity; //set variable for user requested order quantity
          let updatedQuantity = (stockAvailable - quantityRequest); //set variable for updated item quantity (available stock minus user value)
          if(quantityRequest > stockAvailable) { // if / else statement to check stock availability 
            console.log( // if enough stock is not available this console log displays a message and the item in question, then calls the order function to start over
              '\nThere is not enough stock available for item:\n' + 
              'Item#: ' + res[0].item_id + ' || Description: ' + res[0].product_name + ' || Price: ' + res[0].price + 
              '\nPlease lower your quantity or select another item.');
            order();
          } else { // if enough stock is available this console log displays a message and the item data
            console.log('\nWe have that item and quantity available.\n');
            console.log('Item#: ' + res[0].item_id + ' || Description: ' + res[0].product_name + ' || Price: ' + res[0].price);
            connection.query(
              'INSERT INTO orders SET ?',// this query records the item and quantity ordered to the 'orders' table
              [
                {
                  item_id: answer.itemID,
                  order_quantity: answer.quantity
                }
              ],
              function(err) {
                if (err) throw err;
              }
            );
            connection.query( // this query updates the item quantity in the 'products' table
              'UPDATE products SET ? WHERE ?',
              [
                {
                  stock_quantity: updatedQuantity
                },
                {
                  item_id: answer.itemID
                }
              ],
              function(err) {
                if (err) throw err;
                console.log('\nItem added to order');
                console.log(
                  '\nSubTotal: ' + (answer.quantity * res[0].price) + 
                  '\nShipping: ' + 5.95 + 
                  '\nTotal: ' + ((answer.quantity * res[0].price) + 5.95)

                );
              }
            )
            connection.end();
          }
        });
      })
  }