/*
    Since we aren't using an external database for this exercise, 
    a db object is initalized to hold a record of our transactions 
    and current points balances

*/

//initialize object to hold our transactions and balances
let db = {
    transactions : [],
    balances: []
}



//export db array to be used in transactionApi controller
module.exports = db;