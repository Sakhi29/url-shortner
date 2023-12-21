const express = require("express");
const urlRoute = require("./routes/url");
const URL = require("./models/url");
const { connectToMongoose } = require("./connect");
const app = express();
const PORT = 4000;

const uri = "mongodb://127.0.0.1:27017/short-url";
connectToMongoose(uri).then(() => console.log("Mongodb connected"));

app.use(express.json());

app.use("/url", urlRoute);

app.get("/:shortid", async (req, res) => {
  const shortId = req.params.shortid;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectUrl);
});

app.listen(PORT, () => console.log("Server started at port ", PORT));
