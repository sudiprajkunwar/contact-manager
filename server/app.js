require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const cors = require("cors");

// google drive
const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");

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
    const { full_name, email, phone, address, user_id } = req.body;

    if (!(email && full_name && phone && address)) {
      return res.status(400).send({ detail: "All input is required" });
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

    // Check if account exists
    if (!user) {
      return res.status(404).send({ detail: "User does not have contacts." });
    }

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
    const { full_name, email, phone, address, user_id, _id } = req.body;

    const contactData = { full_name, email, phone, address };

    if (!(email && full_name && phone && address)) {
      return res.status(400).send({ detail: "All input is required" });
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

// google Drive

// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/drive.metadata.readonly"];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = "token.json";

// Load client secrets from a local file.
fs.readFile("credentials.json", (err, content) => {
  if (err) return console.log("Error loading client secret file:", err);
  // Authorize a client with credentials, then call the Google Drive API.
  authorize(JSON.parse(content), listFiles);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const { client_secret, client_id, redirect_uris } = credentials.web;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  console.log("Authorize this app by visiting this url:", authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("Enter the code from that page here: ", (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error("Error retrieving access token", err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log("Token stored to", TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

var fileMetadata = {
  name: "hello",
};
var media = {
  mimeType: "image/jpeg",
  body: fs.createReadStream("hello"),
};

/**
 * Lists the names and IDs of up to 10 files.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listFiles(auth) {
  const drive = google.drive({ version: "v3", auth });

  drive.files.list(
    {
      pageSize: 10,
      fields: "nextPageToken, files(id, name)",
    },

    (err, res) => {
      if (err) return console.log("The API returned an error: " + err);
      const files = res.data.files;
      if (files.length) {
        console.log("Files:");
        files.map((file) => {
          console.log(`${file.name} (${file.id})`);
        });
      } else {
        console.log("No files found.");
      }
    }
  );

  drive.files.create(
    {
      resource: fileMetadata,
      media: media,
      fields: "id",
    },
    function (err, file) {
      if (err) {
        // Handle error
        console.error(err);
      } else {
        console.log("File Id: ", file.id);
      }
    }
  );
}

module.exports = app;
