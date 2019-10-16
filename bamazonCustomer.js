var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'number41',
    database: 'bamazon'
});

connection.connect(function(err){
    if(err)throw err;
    // console.log('connection success');
    makeTable();
})

function makeTable(){
    connection.query('SELECT * FROM products', function(err, res){
        for(var i = 0; i < res.length; i++){
            console.log(res[i].item_id + " || " + res[i].product_name + " || " + res[i].department_name + " || " + res[i].price + " || " + res[i].stock_quantity + "\n");
        }
        promptCustomer(res);
    })
}

function promptCustomer(res){
    inquirer.prompt([
        {
            type: 'input',
            name: 'choice',
            message: 'What item would you like to purchase? (Type Q to exit)'
        }
    ]).then(function(answer){
        var correct = false;
        if(answer.choice.toUpperCase()=="Q"){
            process.exit();
        }
        for(var i = 0; i < res.length; i++){
            if(res[i].product_name==answer.choice){
                correct = true;
                var product = answer.choice;
                var price = res[i].price;
                var id = i;
                inquirer.prompt({
                    type: 'input',
                    name: 'quantity',
                    message: 'How many would you like to buy?',
                    validate: function(value){
                        if(isNaN(value)==false){
                            return true;
                        } else{
                            return false;
                        }
                    }
                }).then(function(answer){
                    if((res[id].stock_quantity-answer.quantity) > 0){
                        connection.query("UPDATE products SET stock_quantity='"+(res[id].stock_quantity-answer.quantity)+"' WHERE product_name= '"+ product+"'", function(err, res2){
                            console.log('************************************');
                            console.log('Product purchased for $' + (price*answer.quantity) + '!');
                            console.log('************************************');
                            makeTable();
                        })
                    } else{
                        console.log("Insufficient quantity!");
                        promptCustomer(res);
                    }
                })
            }
        }
        if(i==res.length && correct==false){
            console.log('************************************');
            console.log("Not a valid selection!");
            console.log('************************************');
            promptCustomer(res);
        }
    })
}


