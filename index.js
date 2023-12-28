const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { checkForAuthentication, restrictTo } = require("./middlewares/auth");
const URL = require("./models/url");
const { connectToMongoose } = require("./connect");
require("dotenv").config();

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");

const app = express();
const PORT = 4000;

const uri = "mongodb+srv://admin-sakhi:WJGxzK2zx0b5sIrz@cluster0.egoec3k.mongodb.net/?retryWrites=true&w=majority";
connectToMongoose(uri).then(() => console.log("Mongodb connected"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);
app.use("/styles", express.static("styles"));

app.use("/url", restrictTo(["NORMAL", "ADMIN"]), urlRoute);
app.use("/user", userRoute);
app.use("/", staticRoute);

app.get("/url/:shortid", async (req, res) => {
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
  console.log(entry.redirectUrl);
  res.redirect(entry.redirectUrl);
});

app.listen(PORT, () => console.log("Server started at port ", PORT));
