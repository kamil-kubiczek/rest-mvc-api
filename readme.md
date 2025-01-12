## About project

This project is example of small REST API based on Express.js and Prisma ORM. It's not production ready but can be helpful for you. **Feel free to fork or get inspired.**


**Project status: 🟢Ready to use**

**Warning: 🟡Code has not been tested production**


## Features

API enables consumer to manage account and account's blog posts.


**Account**

-  register with email and password
-  login with email and password
-  authentificate using cookie with JWT token
-  refresh JWT token
-  delete account along with data related to user

**Post**

-  create post with HTML content
-  get post
-  update post with new HTML content
-  publish post
-  unpublish post
-  delete post

## Tools used

-  TypeScript with Zod schemas
-  Express.js
-  Postgres
-  Prisma ORM
-  Docker
-  Bun as package manager
-  Bun with Node support as runtime
-  Manual testing with Postman

 
## Installation

Install npm dependencies using bun: 
```
bun install
```

 
## How to start API

In root directory in CLI type 
```
bun app.ts
```
Now API works!


## Testing
API is tested in Postman.
**Postman collection:** [Click here](https://www.postman.com/restaurant-backend-developers-team/rest-mvc-like-api/invite?wid=85118222-57ae-45d1-8396-1c45bf3be135) - remember to select `development` environment
