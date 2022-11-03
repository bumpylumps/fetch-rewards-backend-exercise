//import necessary dependencies for functions
//get Transaction class from model dir
const Transaction = require('../model/Transaction');


//get transaction and balance data from database
const db = require('../database');


//export required functions for the routes in transactionApi.js
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

        /* make a new transaction and add it to the database */

        //create new class instance of Transaction with request data
        let newTransaction = new Transaction(req.body.payer.toUpperCase(), req.body.points);
        
        //declare variable for ease of access to db.balances
        let balances = db.balances

        //declare variable for finding payer in db.balances
        const balance = balances.find(balance => balance.payer === req.body.payer.toUpperCase())
        
        //add instance to db transactions array
        db.transactions.push(newTransaction);
        
        /*make sure that balances are properly updated */
   
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
    
    /* add spendPoints function */ 
    spendPoints : async(req,res) => {
        try {
        //get total points to spend from request, save in variable for ease of access
        let total = req.body.points

        //declare array to hold new transactions
        let withdrawals = []  

        //sort transactions array by timestamp (so oldest points are taken first)
        let sortedTransactions = db.transactions.slice().sort((a,b) => a.timestamp - b.timestamp)
        
        /* collecting transactions as they are created */

        //loop through transactions to create points withdrawals from payers
        for(let i = 0; i < sortedTransactions.length; i++){

            /* if total is smaller than transaction points */
            if(total < sortedTransactions[i].points){

            //push new transaction to withdrawals
                withdrawals.push(new Transaction(sortedTransactions[i].payer, (0 - total)))

            //set total to 0
                total = 0; 

            //end loop
                break;

            /* if total is larger than transaction points */

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

        /*combining our current collection of withdrawal transactions */

        //set array to hold and combine transactions with same payers
        let finalValues = []

        //loop through withdrawals, push payers and points to new array
       for(let i =0; i < withdrawals.length; i++){

        //look for payer in finalValues array
        let found = finalValues.find(balance => balance.payer === withdrawals[i].payer)

        //if they exist in there,     
        if(found){

        //increment their points by withdrawals[i]'s points 
                found.points += withdrawals[i].points
            } else {  

        //if they aren't in there, push payer and points to finalValues array
                finalValues.push({"payer" : withdrawals[i].payer, "points" :  withdrawals[i].points})

            }
       }

       /* special error objects to be sent as server responses */
       //error object to send if balance is not in db
         const noRecordErr = {
            "Error" : "no record of balance found in db"
        }
        
       //error object to send if balances too low
        const noBalanceErr = {
            "Error" : "not enough points in balance for withdrawal"
        }


        /*subtract balances from db.balances array */

       //get balances from db
       let balances = db.balances

       //loop through final values 
       finalValues.forEach(transaction => {

        //find matching payer accounts between db and finalValues array
        let found = balances.find(balance => balance.payer === transaction.payer)
        
        //if they aren't there, respond with error
        if(!found){
            res.json(noRecordErr)
        //if they are, and taking the points out of the payer's balance doesn't make them negative
        } else if(found && found.points - transaction.points > 0){

            //subtract final values from balances in db
            found.points += transaction.points 
        }

       })
       
       //check balances in DB after transactions
       //if below 0, throw err, break
       balances.forEach(x => x.points < 0 ? res.json(noBalanceErr) : x)

       
       /* send our batch of current withdrawals to our db transactions */
       //update transactions array in db
       withdrawals.forEach(x => db.transactions.push(x))

       /* final check to make sure points is 0, or send a response if somethings wrong */
        
       //if total still has points after looping 
        if(total > 0){
        
        //send an error as response
            res.json(noBalanceErr)
        
         //otherwise return final values    
        } else {
       
        res.json(finalValues)
        }

        //obligatory error grab if something else goes wrong
    } catch(err) {
        console.log(err)
    }


    },

    //add get balance function
    getBalance : async(req, res) => {
        
        try {
        /* collect balances from db */

        //initalize array to push balances to
        let finalBalance = []
        
        //loop through balance array (in db) and push payers and points values to balances array
        for(let i = 0; i < db.balances.length; i++){
            finalBalance.push([db.balances[i].payer, db.balances[i].points])
        }

       /* convert finalBalance array into properly formatted Object for response */
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


