require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const cors = require("cors");

// importing user context
const User = require("./model/user");
const Contact = require("./model/contact");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");

const app = express();
app.use(cors());

app.use(express.json());

// Signup
app.post("/signup", async (req, res) => {
  // Our signup logic starts here
  try {
    // Get user input
    const { full_name, email, password } = req.body;

    // Validate user input
    if (!(email && password && full_name)) {
      return res.status(400).send({ detail: "All input is required" });
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res
        .status(409)
        .send({ detail: "User Already Exist. Please Sign in" });
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      full_name,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );

    // save user token
    user.token = token;

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }

  // Our signup logic ends here
});

// Signin
app.post("/signin", async (req, res) => {
  // Our Sign in logic starts here
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send({ detail: "All input is required" });
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      // user
      res.status(200).json(user);
    } else {
      res.status(400).send({ detail: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
  }
  // Our sign in logic ends here
});

app.post("/create-contact", auth, async (req, res) => {
  try {
    const { full_name, email, phone, address, user_id, image } = req.body;

    if (!(email && full_name && phone && address)) {
      return res.status(400).send({ detail: "All input is required" });
    }

    if (!image) {
      return res.status(400).send({ detail: "Please upload image" });
    }

    const oldContact = await Contact.findOne({ phone, user_id });

    if (oldContact) {
      return res
        .status(409)
        .send({ detail: "Contact number Exist with different name." });
    }

    // Create Contact in our database
    const contact = await Contact.create({
      user_id,
      full_name,
      phone,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      address,
      image,
    });

    res.status(201).json(contact);
  } catch (err) {
    console.log(err);
  }
});

// add favourite
app.put("/favourite", auth, async (req, res) => {
  const { contact_id, user_id, favourite } = req.body;

  try {
    const userId = await Contact.findOne({ user_id, contact_id });

    if (userId) {
      const contact = await Contact.findByIdAndUpdate(contact_id, {
        favourite,
      });

      return res.status(200).json(contact);
    }
  } catch (error) {
    console.log(error);
  }
});

// get all contacts
app.get("/fetch-contacts", auth, async (req, res) => {
  try {
    const { user_id } = req.query;

    const user = await Contact.findOne({ user_id });

    const contact = await Contact.find({ user_id });

    res.status(200).json(contact);
  } catch (err) {
    console.log(err);
  }
});

// get all contacts
app.get("/user-detail", auth, async (req, res) => {
  try {
    const { user_id } = req.query;

    const user = await User.findById(user_id);

    // Check if account exists
    if (!user) {
      return res.status(404).send({ detail: "User does not exist" });
    }

    const userDetail = {
      id: user._id,
      full_name: user.full_name,
      email: user.email,
      favrite: user.favrite,
    };

    res.status(200).json(userDetail);
  } catch (err) {
    console.log(err);
  }
});

app.delete("/remove-contact", auth, async (req, res) => {
  const { _id, user_id } = req.query;

  const oldContact = await Contact.findOne({ _id, user_id });

  // Check if account exists
  if (!oldContact) {
    return res.status(404).send({ detail: "User does not exist" });
  }

  try {
    if (_id && user_id) {
      const contact = await Contact.deleteOne({ _id, user_id });
      return res.status(200).json(contact);
    }
  } catch (error) {
    console.log(error);
  }
});

app.put("/update-contact", auth, async (req, res) => {
  try {
    const { full_name, email, phone, address, user_id, _id, image } = req.body;

    const contactData = { full_name, email, phone, address, image };

    if (!(email && full_name && phone && address)) {
      return res.status(400).send({ detail: "All input is required" });
    }

    if (!image) {
      return res.status(400).send({ detail: "Please upload image" });
    }

    const oldContact = await Contact.findOne({
      ...contactData,
    });

    if (oldContact) {
      return res.status(409).send({ detail: "Already Updated." });
    }

    const contact = await Contact.findByIdAndUpdate(_id, contactData);

    res.status(200).json(contact);
  } catch (err) {
    console.log(err);
  }
});

module.exports = app;
