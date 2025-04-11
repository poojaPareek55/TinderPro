const express = require("express");
const connectDB = require("./config/database.js");
const ValidatData = require("./utilis/validation.js");
const User = require("./models/user.js");
const app = express();
const bcrypt = require("bcrypt");

app.use(express.json());

// always write the things in try-catch
app.post("/signup", async (req, res) => {
  const { firstName, lastName, emailId, password } = req.body;
  try {
    ValidatData(req);
    const hash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hash,
    });
    await user.save();
    res.send("added sucessfully");
  } catch (err) {
    res.send("Sign Up failed" + err.message);
  }
});
app.post("/login", async (req, res) => {
  const { emailId, password } = req.body;
  try {
    const f = await User.findOne({ emailId: emailId });

    if (f) {
      const pswd = await bcrypt.compare(password, f.password);
      if (!pswd) {
        throw new Error("invalid credentials");
      }
    } else {
      throw new Error("invalid credentials");
    }
    res.send("login sucessfully");
  } catch (err) {
    res.send(err.message);
  }
});
app.get("/user", async (req, res) => {
  try {
    const searchValue = req.body._id;
    const getData = await User.findById(searchValue);
    res.send(getData);
  } catch (err) {
    res.send("somthing went worng");
  }
});

app.patch("/patch/:userId", async (req, res) => {
  const updateValue = req.params?.userId;
  const val = updateValue.substring(0, updateValue.length - 1);

  try {
    const a = Object.keys(req.body).every((k) =>
      ["photoUrl", "skills", "about"].includes(k)
    );
    if (!a) {
      throw new Error("Update unsucessfull");
    }
    await User.findByIdAndUpdate({ _id: val }, req.body, {
      runValidators: true,
    });
    res.send("updated sucessfully");
  } catch (err) {
    res.send(err.message);
  }
});
app.delete("/delete", async (req, res) => {
  try {
    const deleteData = await User.findById(req.body._id);
    await User.deleteOne({ _id: deleteData });
    res.send("Deleted the data sucessfully.");
  } catch (err) {
    res.send("something went worng");
  }
});

connectDB()
  .then(() => {
    console.log("connected to the database");
    app.listen(8888, () => {
      console.log("server is runnig on the port number 8888");
    });
  })
  .catch((err) => {
    console.log(err);
  });

// create the server in the specific port number
