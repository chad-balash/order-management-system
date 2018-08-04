# Order Management System

This is a Node Order Management application that uses MySQL database to store data. The app will take in orders from customers and deplete stock from the store's inventory.

# Install
This is a Node.js application

Before installing, download and install Node.js. Node.js 0.6 or higher is required.

Clone Repository

Install dependencies by running the below command

```
$ npm install
```

Execute files 'schema.sql' and 'seeds.sql' to build the sql db

Enter your sql credentials

```
const connection = mysql.createConnection({
    host     : 'localhost',
    port     : 3306,
    **user     : '',**
    **password : '',**
    database : 'bamazon'
  });
  ```


## Screenshots

Coming Soon

## Built With

* node, javascript, mysql

## Authors

* **Chad Balash** - [Profile](https://github.com/chad-balash)

## Acknowledgments

* I would like to thank my instructors and Google for helping me complete this project.
