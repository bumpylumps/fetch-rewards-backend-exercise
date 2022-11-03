

# Fetch Rewards Backend Exercise

This backend-oriented application handles 3 types of server requests: adding a transaction, getting balances, and spending points from those transactions. Best if used with the [Postman API platform](https://www.postman.com/)


![banner-photo](https://user-images.githubusercontent.com/89161501/199851930-a91cad65-67c3-44fd-af55-86ccdccdb04f.JPG)


## How To Use It: 

    1) First you'll need to get the code itself. My repo is hosted on github and can be found [here:](https://github.com/bumpylumps/fetch-rewards-backend-exercise)
            - click on fork (in the upper right portion of the screen) to clone repo into your github
            - on your forked repo, click on the green code dropdown menu
            - copy the given url
        - open up your text editor of choice
        - navigate to the folder you would like to hold the repository in
        - once in the proper folder, enter "git clone https://github.com/bumpylumps/fetch-rewards-backend-exercise.git" into  the terminal
        - when that's finished downloading, enter "npm install" into the terminal to get the necessary dependencies
        - once that's finished installing, enter "npm start" into the terminal to get the server fired up
        - open up postman <-- provide link if needed
        - ADD TRANSACTION 
            -in postman, use first tab to add transactions to db
            - set url tab to post
            - use http://localhost:8000/api/addTransaction for address
            - go to body tab
            - click on raw item and use dropdown to set body to json format
            - provide proper object to body {"payer" : <string>, "points": <int>}
            - click send and recieve response object
        - GET BALANCES
            - in postman, open a new tab
            - set url tab to get
            - use http://localhost:8000/api/getBalance for address
            - click send and recieve response object (balances)
        - SPEND POINTS
            - in postman, open a new tab
            - set url tab to post
            - use http://localhost:8000/api/spendPoints for address
            - go to body tab
            - click on raw item and use dropdown to set body to json format
            - provide proper object to body {"points": <int>}
            - click on send and recieve body object


## How It's Made:

**Tech used:**  JavaScript, Express

This was a great exercise in backend coding, especially for setting up servers, routes and server requests. Building the routes and controllers was pretty straightforward, but it was fun and creative to find a way to simulate a database without using MongoDB. The functions inside of the controller took alot of finessing to get just right, but it was very creatively engaging to swap the data between objects and arrays. I attempted to cover all the edge cases I could, but would need some more input to feel more comfortable with the durability of the functions. 


## Optimizations
Given more time I would dive into the runtimes for my controller functions, and clean them up a bit. I would also do some more edge casing to tighten up those functions (spendPoints in particular). It would also be fun to build out a simple frontend to interact with rather than relying on server routes and Postman. I would also get it hosted. 

## Lessons Learned:
I learn from everything I build. For this application I got way more comfortable with objects and manipulating their keys and values into different formats. I also sharpened up my logic skills, and had alot of fun building a simulated database to hold those objects while the server was live. 



