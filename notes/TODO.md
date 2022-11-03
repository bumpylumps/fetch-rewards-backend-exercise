# Foundation

## Getting started: 
    1) Init git, link repo
    2) Init node
    3) Install express, nodemon
    4) mkdir control
    5) mkdir model
    6) mkdir routes
    7) touch server
    8) touch db <-- using mem not Mongo, js file should be fine
    9) Init middleware
    10) touch api routes
    11) touch api controller
    12) touch transaction model
    13) touch LICENSE.md (MIT) 
    14) mkdir images <-- for User instructions in README.md
    15) Init gitignore (for node modules)


# Meat

## Server
    1) import dependencies
    2) declare middleware
    3) Init port
    4) Init api listeners: 
        - (POST) Add transactions for specific payer and date
        - (PUT) Spend points using rules declared, return list of { "payer": <string>, "points": <int> } for each call
        - (GET) Return all payer point balances

## Routes
    1) import dependencies
    2) Init routes for: 
        - (POST) Add transaction
        - (PUT) Spend points
        - (GET) Get balances

## Controller
    1) Import dependencies
    2) Declare functions for: 
        - (POST) Add Transaction
        - (PUT) Spend Points
        - (GET) Get balances
    3) Export module

## Model
    - Since we aren't using a DB (for demo purposes) a constructor is adequate

    - Instead of declaring required value types, gutter rails should be in functions themselves (i.e. points must be ints, payers must be strings in caps, dates as strings)

    1) Declare "schema" (not real schema, constructor object)
    2) Define properties for: 
        - payer (string)
        - points (int)
        - timestamp (date)
    3) Export "schema" (as module)

# Potatoes

## Docs
    1) Init README if git doesn't
    2) List tech used, license
    3) Describe build process
    4) User Instructions <-- with pic snips
        - GET REPO
            - go to https://github.com/bumpylumps/fetch-rewards-backend-exercise
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
    5) Optimizations
    6) Learned while building
    7) Plugs + Thank you

