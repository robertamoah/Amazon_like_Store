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
  // createProduct();
  foodSnacks()
});





// var names = []
// var prices = []
// var department_names = []


// console.log(names, prices, department_names)











function foodSnacks() {



  connection.query("SELECT * FROM products WHERE department_name = 'Food & Snacks' ", function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
  var id = [res[i].id]
   var name = res[i].product_name
   var price =res[i].price 
   var department_name = res[i].department_name
   var quantity= res[i].stock_quantity
   

  //  var table = new Table({ head: ["#","product_name", "department_name", "price", "stock_quantity"] });
 



  var Table = require('cli-table');
  var table = new Table({ head: ["#","product_name", "department_name", "price", "stock_quantity"]});
   


   table.push(
     { [id[0]]: [name,  department_name,"$" + price , quantity ] },

     
 
 );
  
 console.log(table.toString());

  
   







  

  //  console.log(name, price, department_name)

    }




    
    
  

  });























  // console.log(query.sql);
  connection.end();
}















// function postAuction() {
//   // prompt for info about the item being put up for auction
//   inquirer
//     .prompt([
//       {
//         name: "item",
//         type: "input",
//         message: "What is the item you would like to Buy?"
//       },
//       {
//         name: "category",
//         type: "input",
//         message: "What category would you like to place your auction in?"
//       },
//       {
//         name: "startingBid",
//         type: "input",
//         message: "What would you like your starting bid to be?",
//         validate: function(value) {
//           if (isNaN(value) === false) {
//             return true;
//           }
//           return false;
//         }
//       }
//     ])




//     .then(function(answer) {
//       // when finished prompting, insert a new item into the db with that info
//       connection.query(
//         "INSERT INTO auctions SET ?",
//         {
//           product_name: answer.product_name,
//           department_name: answer.department_name,
//           category: answer.category,
//           price: answer.price,
//           stock_quantity: answer.stock_quantity
          
//         },
//         function(err) {
//           if (err) throw err;
//           console.log("Your auction was created successfully!");
//           // re-prompt the user for if they want to bid or post
//           // start();
//         }
//       );
//     });
// }




