
# GoogleForm-Clone_Backend 

This project provides a basic functinalties of google form.

APi endpoints for testing on postman:

For Server Testing :(GET)

http://localhost:3000/ping


To Input new Data:(POST)

http://localhost:3000/submit

Read Data:(GET)

http://localhost:3000/read

Delete Data:(DELETE)

http://localhost:3000/delete

Update Data:(PUT)

http://localhost:3000/update

Search Data by email id(GET)

http://localhost:3000/search




## Run Locally

Clone the project

```bash
  git clone https://github.com/vrajtalati/GoogleForm_Backend.git
```

Go to the project directory

Install dependencies

```bash
  npm i
```
envfile setup
```bash
MONGO_URI=mongodb+srv://talativraj0805:49DHJub6f2FAcFDg@cluster0.klekg5z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
PORT=3000


```


Start the server

```bash
   npm run dev
```


## Tech Stack

**Backend:** Typescript ,Express Server.
 
**Database:** MongoDb Cloud



