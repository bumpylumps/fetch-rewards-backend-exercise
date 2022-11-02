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
    5) Optimizations
    6) Learned while building
    7) Plugs + Thank you

