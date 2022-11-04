

# Fetch Rewards Backend Exercise

This backend-oriented application handles 3 types of server requests: adding a transaction, getting balances, and spending points from those transactions. Best if used with the [Postman API platform](https://www.postman.com/)


![banner-photo](https://user-images.githubusercontent.com/89161501/199851930-a91cad65-67c3-44fd-af55-86ccdccdb04f.JPG)


## How To Use It: 

First you'll need to get the code itself. My repo is hosted on github and can be found [here:](https://github.com/bumpylumps/fetch-rewards-backend-exercise)

- click on fork (in the upper right portion of the screen) to clone repo into your github

    ![github-fork](https://user-images.githubusercontent.com/89161501/199853102-45c59bb9-3a26-49b6-a595-f27f6bcdc396.JPG)

- Go to  your forked repo, click on the green code dropdown menu and copy the given url

    ![github-url](https://user-images.githubusercontent.com/89161501/199853160-9d3a97c8-01c0-4e8b-9265-c24e486a12e1.JPG)

- open up your text editor of choice, and navigate to the folder you would like to hold the repository in

- once in the proper folder, enter the url you got from github (here it is if it didn't copy -> https://github.com/bumpylumps/fetch-rewards-backend-exercise.git )
   and enter "git clone https://github.com/bumpylumps/fetch-rewards-backend-exercise" into your terminal
   
- when that's finished downloading, enter "npm install" into the terminal to get the necessary dependencies

- once that's finished installing, enter "npm start" into the terminal to get the server fired up

# Once you are all set locally:

- open up Postman, you can get it from [here](https://www.postman.com/) if you haven't already
        

# To make necessary requests: 

ADD TRANSACTION 
***
In Postman, use the first tab to add transactions to db. There should be one automatically open when starting Postman:
    

   1) set the url tab to "POST"
    
   2) Enter http://localhost:8000/api/addTransaction into the address bar
    
   3) go to the "body" tab
   
   4) click on the "raw" item and use the dropdown menu on the left to set your request body to the "JSON" format
     
   5) provide properly formatted object to the body area -> {"payer" : (string), "points": (int)}
    
 ![postman-addTransaction](https://user-images.githubusercontent.com/89161501/199855099-6e8c9127-969b-4b4f-8d28-83610e7a9d93.JPG)

    
   6) click "Send" and recieve response object
    
![postman-addTransaction-results](https://user-images.githubusercontent.com/89161501/199855193-ea2acee7-d186-425f-b78d-fce3441e2a53.JPG)
    
    
GET BALANCES
***
In Postman, open a new tab
    
![postman-new-tab](https://user-images.githubusercontent.com/89161501/199855611-6fc76743-6715-4110-86fc-8ee15d426056.JPG)
    
    
1) Set the url area in your new tab to "GET" using the dropdown menu on the left

2)  Enter http://localhost:8000/api/getBalance into the address bar


 
![postman-getBalance](https://user-images.githubusercontent.com/89161501/199855947-6a45e3e2-c867-49c3-b3a5-a6c5e310f1bb.JPG)
	
3) click "Send" and recieve response object
	
	
![postman-getBalance-results](https://user-images.githubusercontent.com/89161501/199856000-d346cc43-bff8-40a8-ba30-270ab59447e0.JPG)


	
SPEND POINTS
***

In Postman, open a new tab: 
	
![postman-new-tab](https://user-images.githubusercontent.com/89161501/199856263-5484d0a0-cd13-4c85-8dd5-53d42a45beeb.JPG)

1) set url tab to the left of address bar to "POST"

2) enter http://localhost:8000/api/spendPoints in the address bar

3) go to the "body" tab and select the "raw" option

4) using the blue dropdown menu on the right, set your body request format to "JSON"

5) add properly formatted object into the request body area: ({"points": (int) })
	
![postman-spendPoints](https://user-images.githubusercontent.com/89161501/199856552-9340fc69-d459-4223-815b-e23ea2aaf283.JPG)

6) click on "Send" and recieve response object

![postman-spendPoints-results](https://user-images.githubusercontent.com/89161501/199856716-4a4f9916-b6d4-45a9-9759-779cfe24cf29.JPG)

** This should cover everything the app needs to do, feel free to reach out if you have any comments, questions, or concerns!


***

## How It's Made:

**Tech used:**  JavaScript, Express, Node, Nodemon

This was a great exercise in backend coding, especially for setting up servers, routes and server requests. Building the routes and controllers was pretty straightforward, but it was fun and creative to find a way to simulate a database without using MongoDB. Nodemon was also used to keep the server running during changes to save time during development. The functions inside of the controller took alot of finessing to get just right, but it was very creatively engaging to swap the data between objects and arrays. I attempted to cover all the edge cases I could, but would need some more input to feel more comfortable with the durability of the functions.  


## Optimizations
Given more time I would dive into the runtimes for my controller functions, and clean them up a bit. I would also do some more edge casing to tighten up those functions (spendPoints in particular). It would also be fun to build out a simple frontend to interact with rather than relying on server routes and Postman. I would also get it hosted. Also, right now if there's something that will make balances negative, an error object is sent instead of the normal response and the app will crash. It would be nice to tighten up that edge and build a function that checks those balances and handles them without breaking the app. 

## Lessons Learned:
I learn from everything I build! For this application I got way more comfortable with objects and manipulating their keys and values into different formats. I also sharpened up my logic skills, and had alot of fun building a simulated database to hold those objects while the server was live. 

## Thank you!

Thanks for taking the time to read through this README! For more info on me, or to reach out with questions, comments or concerns, you can find me at: 

* Email - alexander.fulop.art@gmail.com
* Twitter - [@alayfalupe](https://twitter.com/alayfalupe)
* Website - www.bumpsites.com

