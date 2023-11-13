const express = require("express");
const app = express();
require("dotenv").config(); /* To use environment variables, you need to use the dotenv module */
const port = process.env.PORT || 3333;
const memeberRouter = require("./routes/member_router");

app.use(
	express.json()
); /* The app.use() lets us use the express.json middleware. This middle ware handles incoming data as a JSON urlEncoded helps you parse incoming data from forms that are of content-type urlEncoded. express.json is used for put and post requests. */

app.use(
	"/members",
	memeberRouter
); /* when the client visits localhost:port/members, the functionality exported from the memeber_router file will handle the routing. */

app.listen(port, () => console.log(`server is running on port: ${port}`));
