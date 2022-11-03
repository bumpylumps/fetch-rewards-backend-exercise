//import dependencies
//get Transaction class from model dir
const Transaction = require('../model/Transaction');
//get transaction data from database
const db = require('../database');
const { patch } = require('../routes/transactionApi');

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
        
        //declare variable for points for easy access
        let points = req.body.points

        //intialize record for spending transactions
        let withdrawals = []
        
        //get transactions array, declare as variable
        //copy and sort transactions array by timestamp
        let sortedTransactions = db.transactions.slice().sort((a,b) => a.timestamp - b.timestamp)
        
        //get balances array, declare as variable
        let balances = db.balances;
        
        
        //initalize iterator to travel sortedTransactions
        let i = 0; 

       
        
        //while points are greater than 0
        while(points >= 0 && i <= sortedTransactions.length -1){

        //declare variable to find payer in balance array
        let balancePayer = db.balances.find(balance => balance.payer === sortedTransactions[i].payer) 
        
        //check if points are less than current sortedTransaction
        if(points < sortedTransactions[i].points){
            
            //if yes
            //add new transaction for the withdrawal
            const withdrawal = new Transaction(sortedTransactions[i].payer, (0-points))
            
            //subtract points from balancePayer
            balancePayer.points -= points
            
            //push transaction to withdrawal array
            withdrawals.push(withdrawal)
            
            //push transaction to db.transactions array
            db.transactions.push(withdrawal)
            
            //set points to 0
            points = 0
            
            //end loop 
            break;
        } else {
        //subtract points from earliest transaction in sortedTransactions
        points -= sortedTransactions[i].points
        
        //and subtract transaction points from parallel balance payer
        balancePayer.points -= sortedTransactions[i].points;
        
        //create new Transaction
        const withdrawal = new Transaction(sortedTransactions[i].payer, (0-sortedTransactions[i].points))
        
        //push to current transactions
        withdrawals.push(withdrawal)
        
        //push to db transactions
        db.transactions.push(withdrawal)
        
        //increment i
        i++
        }
    }
        
        

        //when total request points is 0, respond with spending transactions array
        res.json(withdrawals)
        //console.log(db.transactions)
        console.log(db.transactions)
        //if there's an error, return and console.log(err)
        } catch(err) {
            console.log(err);
        }
    },

    //add get balance function
    getBalance : async(req, res) => {
        //try getting balance array from db
        try {
        //initalize array to push balances to
        let finalBalance = []
        
        //loop through balance array and push payers and points to balances array
        for(let i = 0; i < db.balances.length; i++){
            finalBalance.push([db.balances[i].payer, db.balances[i].points])
        }

       //convert finalBalance array into properly formatted Object
       //Assign map of finalBalance to an object with the proper key:value pairs
        finalBalance = Object.assign({}, ...finalBalance.map(key => ({[key[0]]:key[1]})))

        //respond with finalBalance object
        res.json(finalBalance);

       //if there's an error, return and console.log(err)
        } catch(err) {
            console.log(err);
        }
    }
}