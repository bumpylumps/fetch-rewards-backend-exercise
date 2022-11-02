// import dependencies
const express = require('express');
const app = express();

//import required route
const transactionApiRoutes = require("./routes/transactionApi")


//initialize port for transactionApi requests
const PORT = 8000;


//Body parsing for server responses
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//initialize listener for routes
app.use('/api', transactionApiRoutes)


//initialize PORT listener
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})