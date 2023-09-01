const mongoose = require("mongoose");

// LINK
const linkConnectDb = `mongodb+srv://${process.env.USERNAMEDB}:${process.env.PASSWORDDB}@dbwebttt.v51nbla.mongodb.net/?retryWrites=true&w=majority`;

//connect mongoose
mongoose
  .connect(linkConnectDb)
  .then((_) => console.log("Connected mongoose success!..."), {
    useNewUrlParser: "true",
    useUnifiedTopology: "true",
  })
  .catch((err) => console.error(`Error: connect:::`, err));

// all executed methods log output to console
mongoose.set("debug", true);

// disable colors in debug mode
mongoose.set("debug", { color: false });

// get mongodb-shell friendly output (ISODate)
mongoose.set("debug", { shell: true });

module.exports = mongoose;
