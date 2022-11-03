//import dependencies
//get Transaction class from model dir
const Transaction = require('../model/Transaction');


//get transaction data from database
const db = require('../database');
const { transactions } = require('../database');

//export required functions for route
module.exports = { 
    //add transaction function
    addTransaction : async(req,res) => {

        try{

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
    
    spendPoints : async(req,res) => {

        //get total points to spend from request
        let total = req.body.points

        //declare array for transactions
        let withdrawals = []  

        //sort transactions array by timestamp
        let sortedTransactions = db.transactions.slice().sort((a,b) => a.timestamp - b.timestamp)
        
        //loop through transactions to collect withdrawals from payers
        for(let i = 0; i < sortedTransactions.length; i++){

            //if total is smaller than transaction points
            if(total < sortedTransactions[i].points){
            //push new transaction to withdrawals
                withdrawals.push(new Transaction(sortedTransactions[i].payer, (0 - total)))
            //set total to 0
                total = 0; 
            //end loop
                break;
            //if total is larger than transaction points
            } else if(total > sortedTransactions[i].points){
            //push new transaction to withdrawals
                withdrawals.push(new Transaction(sortedTransactions[i].payer, (0 - sortedTransactions[i].points)))
            //subtract transaction points from total
                total -= sortedTransactions[i].points
            } 

            //end loop if total === 0
            if(total <= 0){
                break;
            }
        }

        //set array to combine transactions with same payers
        let finalValues = []

        //loop through withdrawals, push payers and points to new array
       for(let i =0; i < withdrawals.length; i++){
        //look for payer in finalValues array
        let found = finalValues.find(balance => balance.payer === withdrawals[i].payer)
        //if they exist in there,     
        if(found){
        //increment their points by withdarwals[i]'s points
                found.points += withdrawals[i].points
            } else {  
        //if they aren't in there, push payer and points to finalValues array
                finalValues.push({"payer" : withdrawals[i].payer, "points" :  withdrawals[i].points})

            }
       }

       //subtract balances from db.balances array
       //error object to send if balance is not in db
         const noRecordErr = {
            "Error" : "no record of balance found in db"
        }
        
       //error object to send if balances too low
        const noBalanceErr = {
            "Error" : "not enough points in balance for withdrawal"
        }

       //get balances
       let balances = db.balances
       //loop through final values
       finalValues.forEach(transaction => {
        let found = balances.find(balance => balance.payer === transaction.payer)
        
        if(!found){
            res.json(noRecordErr)
        } else if(found && found.points - transaction.points > 0){
            //subtract final values from balances in db
            found.points += transaction.points 
        }

       })
       
       //check balances in DB after transactions
       balances.forEach(x => x.points < 0 ? res.json(noBalanceErr) : x)
       //if below 0, throw err, break

      
        //if total still has points after looping 
        if(total > 0){
        //send an error as response
            res.json(noBalanceErr)
        } else {
        //otherwise return final values
        res.json(finalValues)
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


