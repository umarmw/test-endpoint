const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");

const app = express();

// Enable CORS for all origins (adjust as needed)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = express.Router();

router.post("/submit", (req, res) => {
  const { "first-name": firstName, "last-name": lastName, email, "zip-code": zipCode, motorsports, "car communities": carCommunities, "product info": productInfo, "opt in": optIn } = req.body;
  
  const formData = {
    firstName,
    lastName,
    email,
    zipCode,
    motorsports: motorsports === "true",
    carCommunities: carCommunities === "true",
    productInfo: productInfo === "true",
    optIn: optIn === "on",
  };
  
  console.log("Received form data:", formData);
  
  res.status(200).json({ message: "Form submitted successfully", data: formData });
});

app.use("/.netlify/functions/api", router);

module.exports.handler = serverless(app);
