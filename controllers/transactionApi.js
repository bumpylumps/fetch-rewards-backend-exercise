//import dependencies
//get Transaction class from model dir
const Transaction = require('../model/Transaction');
//get transaction data from database
const db = require('../database');

//export required functions for route
module.exports = { 
    //add transaction function
    addTransaction : async(req,res) => {

        try {

        /*Normally edge cases for the request body would be handled by our DB schema, 
        but since we don't have an external DB to connect to, 
        edge cases are set here
        */

        //check if request body is in proper format
        //if payer is not a string, throw error
        if(typeof(req.body.payer) !== 'string'){
            throw 'Error: Payer must be a string'
        //if points is not a number, throw error
        } else if(typeof(req.body.points) !== "number"){
            throw `Error: Points must be a number`
        }


        //create new class instance of Transaction with request data
        let newTransaction = new Transaction(req.body.payer.toUpperCase(), req.body.points);
        
        //declare variable for ease of access to db.balances
        let balances = db.balances

        //declare variable for finding payer in db.balances
        const balance = balances.find(balance => balance.payer === req.body.payer.toUpperCase())
        
        //add instance to db transactions array
        db.transactions.push(newTransaction);
        
   
        //test if transaction payer exists in balance array
        if(balance){
        //if it does, add points to balance
            balance.points += req.body.points
        } else {
        //if not, push transaction payer and points to balance array
            balances.push({
                payer: newTransaction.payer,
                points: newTransaction.points
            })
        }
        
        //respond with transactions and server status
        res.json(db.transactions)

        } catch(err) {
            console.log(err)
        }
    }, 

    //add spend points function
    spendPoints : async(req, res) => {
        //try subtracting points from request
        try {
        //intialize record for spending transactions
        //get transactions array, declare as variable
        //get balances array, declare as variable
        //sort transactions array by timestamp
        //check if subtracting points from first transaction would make payer negative
        //if it does, subtract payer balance from request total, set payer balance to 0, and push transaction to transactions array and spending transactions array
        //if it doesn't, subtract req points total from payer balance, add transaction to transaction array and spending transactions array
        //if request total is above 0, move on to next payer in balance array and repeat above steps until total is 0

        //when total request points is 0, respond with spending transactions array
        
        console.log('Success')
         //if there's an error, return and console.log(err)
        } catch(err) {
            console.log(err);
        }
    },

    //add get balance function
    getBalance : async(req, res) => {
        //try getting balance array from db
        try {
        //initalize object to push balances to
        let finalBalance = []
        
        //loop through balance array and push payers and points to balances array
        for(let i = 0; i < db.balances.length; i++){
            finalBalance.push([db.balances[i].payer, db.balances[i].points])
        }

       //convert finalBalance array into properly formatted Object
       //Assign map of finalBalance into an object with the proper key: value pairs
        finalBalance = Object.assign({}, ...finalBalance.map(key => ({[key[0]]:key[1]})))

        //respond with finalBalance object
        res.json(finalBalance);

       //if there's an error, return and console.log(err)
    } catch(err) {
        console.log(err);
    }
    }
}