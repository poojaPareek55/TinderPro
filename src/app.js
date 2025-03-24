const express = require("express");

// create the server in the specific port number
const app = express();

// app.get("/", (req, res) => {
//   res.send("hello world");
// });

app.get("/test", (req, res) => {
  res.send("what you want to see");
});
// a request handler funcation is app.use(path, callback)
app.use("/", (req, res) => {
  res.send("hello world 8");
});

app.listen(8888, () => {
  console.log("server is runnig on the port number 8888");
});

app.listen(8889, () => {
  console.log("server is runnig on the port number 8889");
});
