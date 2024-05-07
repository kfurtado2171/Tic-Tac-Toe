# Basic MERN Application

This is a simple Todo application that allows you to ad toggle and delete tasks.

## Step 1: Create Database
You need to create a MongoDB database. To do that, go to https://cloud.mongodb.com and create a database. Name it `Todo`. Copy the connection string (check the video in myCourses for the details).

After making the database, you have to update the `app.js` file.

```javascript
const uri = "mongodb+srv://<username>:<password>@----.----.mongodb.net"

```

## Step 2: Mount Backend

The backend is a Node.js server that uses Express and MongoDB.
Steps to follow:
    Clone the repository for the Backend and run the following commands:
    1. Install NPM
    2. Run the server
    3. Open http://localhost:5050 in your browser

## Step 3: Mount Frontend

The frontend is a React application and uses the backend to fetch and add to do tasks. Steps to follow:
    Clone the repository for the Frontend and run the following commands:
    1. Install NPM
    2. Run the server
    3. Open http://localhost:3000 in your browser


## Step 4: Update the style of frontend using Bootstrap and react bootstrap
You can use the components such as `<Row>`, `<Col>` and `<Button>` from react bootstrap. Also you can download bootstrap.min.css from https://bootswatch.com


## Optional Step Deployment (Bonus Points)

You can deploy the backend and frontend to either one of the following platforms:

- [Vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)
- [Render](https://render.com/)
- [Heroku](https://www.heroku.com/)
- [Digital Ocean](https://www.digitalocean.com/)
- [AWS](https://aws.amazon.com/)
- [GCP](https://cloud.google.com/)
- [Azure](https://azure.com/)
- [Gitpod](https://gitpod.io/)

## Updates and Changes


# Each Step has 25 points.
