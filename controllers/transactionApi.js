const Transaction = require('../model/Transaction');
const db = require('../database');


module.exports = { 
    addTransaction : async(req, res) => {
        console.log('Success')
    }, 
    spendPoints : async(req, res) => {
        console.log('Success')
        
    },
    getBalance : async(req, res) => {
        try {
            res.status(200);
             console.log('Success')
        } catch (err) {
            console.log(err)
        }
    }
}