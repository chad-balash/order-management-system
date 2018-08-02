const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: 'balasher',
  
    // Your password
    password: '3201111',
    database: 'bamazon'
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
        name: 'action',
        type: 'rawlist',
        message: '\nWhat would you like to do?',
        choices: [
          'Shop store',
          'Exit store'
        ]
      })
      .then(function(answer) {

        switch (answer.action) {

        case 'Shop store':
            console.log('\nAwesome! Please follow the prompts to place your order.\n');
            order();
          break;
  
        case 'Exit store':
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
            console.log('Item#: ' + res[i].item_id + ' || Description: ' + res[i].product_name + ' || Price: ' + res[i].price);
          }
          runShop();
      })
  }


  function order() {
    inquirer
      .prompt([
        {
          name: 'itemID',
          type: 'input',
          message: 'Enter the item number of the product you would like to purchase.',
        },
        {
          name: 'quantity',
          type: 'input',
          message: 'How many units would you like to purchase?',
        }
      ])
      .then(function(answer){
        connection.query('SELECT * FROM products WHERE ?', {item_id: answer.itemID}, function(err, res) {
          console.log('Item#: ' + res[0].item_id + ' || Description: ' + res[0].product_name + ' || Price: ' + res[0].price);
          let stockAvailable = res[0].stock_quantity;
          let quantityRequest = answer.quantity;
          if(quantityRequest > stockAvailable) {
            console.log('There is not enough stockAvailable...');
          } else {
            console.log('We have enough stock');
          }

        });
        // console.log(answer.itemID + ' ' + answer.quantity);
      })
  }