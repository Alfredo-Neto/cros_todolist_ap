# cros_todolist_api

---
## Requirements
- Node.js (v20.15.1 recommended)
- Yarn
- PostgreSQL

For development, you will only need Node.js and a node global package, Yarn, installed in your environement.


    $ node --version
    v20.15.1


###
### Yarn installation
  After installing node, this project will need yarn too, so just run the following command.

      $ npm install -g yarn

---

## Install

    $ git clone https://github.com/Alfredo-Neto/cros_todolist_ap.git
    $ cd cros_todolist_ap
    $ yarn install

## Configure app

create an .env file and put the following variables in it:

```dotenv
JWT_SECRET=your_secret_key
DATABASE_URL=postgres://user:password@localhost:5432/your_database
```

## Run the migrations
```
$ yarn prisma migrate dev
```

## Running the project

    $ yarn dev

## Simple build for production

    $ yarn start
