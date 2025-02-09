const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
require("./database/db.js");
const path = require("path");
const socketServer = require("./socketServer.js");
const authRoutes = require("./routes/authRoutes.js");
const friendInvitationRoutes = require("./routes/friendInvitationRoutes.js");

const app = express();
app.use(express.json());
app.use(cors());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/friend-invitation", friendInvitationRoutes);

const server = http.createServer(app);
socketServer.registerSocketServer(server);

const PORT = process.env.PORT || process.env.API_PORT;

// when we build the application of client end we need to
// specify it here
// When in production or CI environment, serve the React build
// if (["production", "ci"].includes(process.env.NODE_ENV)) {
//   app.use(express.static(path.join(__dirname, "../client/build")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
//   });
// }

server.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
