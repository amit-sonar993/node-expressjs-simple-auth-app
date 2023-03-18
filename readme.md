# Setup guide

## Setup requirement 
 - Node.js version = v18.14.2
 - Yarn version = 1.22.19

### Clone the project using
`git clone https://github.com/amit-sonar993/node-expressjs-simple-auth-app.git`

### Install dependencies
`yarn install`

### Create .env file and Copy the content of .env.example file and update the variable(s) name

`cp .env.example .env`

### Setup db for different environment

** This will create the database and create tabel(s) based on APP_ENV variable set in .env file (e.g: development)**
`yarn setup-db`

** This will create the database and create tabel(s) for Test environemnt which is going to be used for runing tests **

`setup-test-db`


### Finally we can now run the app 

`yarn run dev `




## List of API ENDPOINT(S)

** Required header(s) **
`
Content-Type: application/json

Accept:  application/json

`



- `http://localhost:5000/auth/register`

- `http://localhost:5000/auth/login`


### To Run tests

`yarn test`