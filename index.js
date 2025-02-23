const express = require("express");
const serverless = require("serverless-http");
const app = express();
const router = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
  
  res.status(200).json({ message: "Success", data: formData });
});

app.use("/.netlify/functions/api", router);

module.exports.handler = serverless(app);
