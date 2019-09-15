var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "0242",
  database: "bamazonDB"
});
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");

  runSearch()
});



// ************************************************************************
function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "Welcome To BaMazon select option:",
      choices: [
        "sales",
        "low inventory",
        "add inventory",
        "add new Product",
        // "admin"
        
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
        case "sales":
            all()
        break;

      case "low inventory":
          lowInventory()
        break;

      case "add inventory":
        addInventory()
        break;

      case "add new Product":
        createNewProduct()
        break;
      }
    });
}



function all() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
  var id = [res[i].id]
   var name = [res[i].product_name]
   var price =[res[i].price]
   var department_name = [res[i].department_name]
   var quantity= [res[i].stock_quantity]

  const Table = require('cli-table');

  // instantiate
  const table = new Table(
    {colWidths: [4, 15, 15 ,15, 15],
      head: ["#", "name", "price", "department", "quantity"]}
  );
  
 
  table.push(
  { [id[0]]: [[name[0]], "$" +
  [price[0]], [department_name[0]], [quantity[0]]]});
  console.log(table.toString());

}});

  // console.log(query.sql);
  
  connection.end();
  runSearch()
 
 
}
function lowInventory() {
  connection.query("SELECT * FROM products WHERE stock_quantity < 50", function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
  var id = [res[i].id]
   var name = [res[i].product_name]
   var price =[res[i].price]
   var department_name = [res[i].department_name]
   var quantity= [res[i].stock_quantity]

  const Table = require('cli-table');

  // instantiate
  const table = new Table(
    {colWidths: [4, 15, 15 ,15, 15],
      head: ["#", "name", "price", "department", "quantity"]}
  );
  
 
  table.push(
  { [id[0]]: [[name[0]], "$" +
  [price[0]], [department_name[0]], [quantity[0]]]});
  console.log(table.toString());
}});

  // console.log(query.sql);
  connection.end();
  runSearch();

}
function addInventory() {
    

    
  inquirer.prompt([
      {
          type: 'input',
          name: 'id',
          message: 'Please enter the Item ID for stock_count update.',
          validate: validateInteger,
          filter: Number
      },
      {
          type: 'input',
          name: 'quantity',
          message: 'How many would you like to add?',
          validate: validateInteger,
          filter: Number
      }
  ]).then(function(input) {
      
      var item = input.id;
      var addQuantity = input.quantity;

      var queryStr = 'SELECT * FROM products WHERE ?';

      connection.query(queryStr, {id: item}, function(err, data) {
          if (err) throw err;


          if (data.length === 0) {
              console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
              addInventory();

          } else {
              var productData = data[0];

              console.log('Updating Inventory...');

              var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity + addQuantity) + ' WHERE id = ' + item;
      
              connection.query(updateQueryStr, function(err, data) {
                  if (err) throw err;

                  console.log('Stock count for Item ID ' + item + ' has been updated to ' + (productData.stock_quantity + addQuantity) + '.');
                  console.log("\n---------------------------------------------------------------------\n");
                  runSearch()
                  ;
              })
          }
      })
  })
}
function createNewProduct() {

  inquirer.prompt([
      {
          type: 'input',
          name: 'product_name',
          message: 'Please enter the new product name.',
      },
      {
          type: 'input',
          name: 'department_name',
          message: 'Which department does the new product belong to?',
      },
      {
          type: 'input',
          name: 'price',
          message: 'What is the price per unit?',
          validate: validateNumeric
      },
      {
          type: 'input',
          name: 'stock_quantity',
          message: 'How many items are in stock?',
          validate: validateInteger
      }
  ]).then(function(input) {
  

      console.log('Adding New Item: \n    product_name = ' + input.product_name + '\n' +  
                                     '    department_name = ' + input.department_name + '\n' +  
                                     '    price = ' + input.price + '\n' +  
                                     '    stock_quantity = ' + input.stock_quantity);

  
      var queryStr = 'INSERT INTO products SET ?';


      connection.query(queryStr, input, function (error, results, fields) {
          if (error) throw error;

          console.log('New product has been added to the inventory under Item ID ' + results.insertId + '.');
          console.log("\n---------------------------------------------------------------------\n");

          admin()

      });
  })
}



function all2() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
  var id = [res[i].id]
   var name = [res[i].product_name]
   var price =[res[i].price]
   var department_name = [res[i].department_name]
   var quantity= [res[i].stock_quantity]

  const Table = require('cli-table');

  // instantiate
  const table = new Table(
    {colWidths: [4, 15, 15 ,15, 15],
      head: ["#", "name", "price", "department", "quantity"]}
  );
  
 
  table.push(
  { [id[0]]: [[name[0]], "$" +
  [price[0]], [department_name[0]], [quantity[0]]]});
  console.log(table.toString());

}});

  // console.log(query.sql);
  
  connection.end();
  admin()
 
 
}
function lowInventory2() {
  connection.query("SELECT * FROM products WHERE stock_quantity < 50", function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
  var id = [res[i].id]
   var name = [res[i].product_name]
   var price =[res[i].price]
   var department_name = [res[i].department_name]
   var quantity= [res[i].stock_quantity]

  const Table = require('cli-table');

  // instantiate
  const table = new Table(
    {colWidths: [4, 15, 15 ,15, 15],
      head: ["#", "name", "price", "department", "quantity"]}
  );
  
 
  table.push(
  { [id[0]]: [[name[0]], "$" +
  [price[0]], [department_name[0]], [quantity[0]]]});
  console.log(table.toString());
}});

  // console.log(query.sql);
  connection.end();
  admin();

}
function addInventory2() {
    

    
  inquirer.prompt([
      {
          type: 'input',
          name: 'id',
          message: 'Please enter the Item ID for stock_count update.',
          validate: validateInteger,
          filter: Number
      },
      {
          type: 'input',
          name: 'quantity',
          message: 'How many would you like to add?',
          validate: validateInteger,
          filter: Number
      }
  ]).then(function(input) {
      
      var item = input.id;
      var addQuantity = input.quantity;

      var queryStr = 'SELECT * FROM products WHERE ?';

      connection.query(queryStr, {id: item}, function(err, data) {
          if (err) throw err;


          if (data.length === 0) {
              console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
              addInventory();

          } else {
              var productData = data[0];

              console.log('Updating Inventory...');

              var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity + addQuantity) + ' WHERE id = ' + item;
      
              connection.query(updateQueryStr, function(err, data) {
                  if (err) throw err;

                  console.log('Stock count for Item ID ' + item + ' has been updated to ' + (productData.stock_quantity + addQuantity) + '.');
                  console.log("\n---------------------------------------------------------------------\n");
                  admin()
                  ;
              })
          }
      })
  })
}
function createNewProduct2() {

  inquirer.prompt([
      {
          type: 'input',
          name: 'product_name',
          message: 'Please enter the new product name.',
      },
      {
          type: 'input',
          name: 'department_name',
          message: 'Which department does the new product belong to?',
      },
      {
          type: 'input',
          name: 'price',
          message: 'What is the price per unit?',
          validate: validateNumeric
      },
      {
          type: 'input',
          name: 'stock_quantity',
          message: 'How many items are in stock?',
          validate: validateInteger
      }
  ]).then(function(input) {
  

      console.log('Adding New Item: \n    product_name = ' + input.product_name + '\n' +  
                                     '    department_name = ' + input.department_name + '\n' +  
                                     '    price = ' + input.price + '\n' +  
                                     '    stock_quantity = ' + input.stock_quantity);

  
      var queryStr = 'INSERT INTO products SET ?';


      connection.query(queryStr, input, function (error, results, fields) {
          if (error) throw error;

          console.log('New product has been added to the inventory under Item ID ' + results.insertId + '.');
          console.log("\n---------------------------------------------------------------------\n");

          admin()

      });
  })
}


function validateInteger(value) {
  var integer = Number.isInteger(parseFloat(value));
  var sign = Math.sign(value);

  if (integer && (sign === 1)) {
      return true;
  } else {
      return 'Please enter a whole non-zero number.';
  }
}


function validateNumeric(value) {
  
  var number = (typeof parseFloat(value)) === 'number';
  var positive = parseFloat(value) > 0;

  if (number && positive) {
      return true;
  } else {
      return 'Please enter a positive number for the unit price.'
  }
}



function admin() {
    
  inquirer
  .prompt({
    name: "action",
    type: "rawlist",
    message: "Welcome To BaMazon select option:",
    choices: [
      "See all sales",
      "See all low inventory",
      "add inventory",
      "add new Product",
      // "admin"
      
    ]
  })
  .then(function(answer) {
    switch (answer.action) {
      case "See all sales":
          all2()
      break;

    case "See all low inventory":
        lowInventory2()
      break;

    case "add inventory":
      addInventory2()
      break;

    case "add new Product":
      createNewProduct2()
      break;

    // case "admin":
    //   // addInventory()
    //   break;
    }
    // exit(1);
  });
  

}