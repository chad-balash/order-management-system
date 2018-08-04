# Order Management System

This is a Node Order Management application that uses MySQL database to store data. The app will take in orders from customers and deplete stock from the store's inventory.

# Install
This is a Node.js application

Before installing, download and install Node.js.

Clone Repository

Install dependencies by running npm install

```javascript
$ npm install
```

Execute files `schema.sql` and `seeds.sql` to build the sql db

Enter your sql credentials in `bamazonCustomer.js` for user and password

```javascript
const connection = mysql.createConnection({
    host     : 'localhost',
    port     : 3306,
    user     : '',
    password : '',
    database : 'bamazon'
  });
  ```

Then launch application by typing `node bamazonCustomer.js` in terminal/bash

## Screenshots

![Screenshot](/screenshot.jpg)

## Video
[Video](https://drive.google.com/open?id=1_a5Gqomh5Syfsb2_1-a46wgkkoqZyhmT)

## Built With

* node, javascript, mysql

## Authors

* **Chad Balash** - [Profile](https://github.com/chad-balash)

## Acknowledgments

* I would like to thank my instructors and Google for helping me complete this project.
