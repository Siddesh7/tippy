const express = require("express");
const userDeets = require("../model/userDeets");

const router = express.Router();
router.post("/create", async (req, res) => {
  // Create a new alert
  const jobs = new userDeets(req.body);
  console.log(req.body);
  try {
    await jobs.save();
    res.send(jobs);
  } catch (error) {
    res.send(error);
  }
});

router.get("/user", async (req, res) => {
  console.log(req.query);
  try {
    const medium = req.query.medium;
    const user = await userDeets.find({
      [medium]: req.query.user,
    });
    res.send(user);
  } catch (error) {
    res.send(error);
  }
});

router.patch("/user", async (req, res) => {
  try {
    await userDeets.updateOne(
      { name: req.body.name },
      {
        [req.body.field]: req.body.value,
      }
    );
    userDeets.save();
    res.send(200);
  } catch (error) {
    res.send(error);
  }
});
module.exports = router;
