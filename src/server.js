const express = require("express");
const { authFactory, AuthError } = require("./auth");
const connectDB = require("./db");
const apiRoute = require("./route/route");
var helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const PORT = 3000;

// Connecting Mongo DB
connectDB();

const { JWT_SECRET } = process.env;

if (!JWT_SECRET) {
  throw new Error("Missing JWT_SECRET env var. Set it and restart the server");
}

const auth = authFactory(JWT_SECRET);
const app = express();

// Body Parser Built in with Express 4.16+
app.use(express.json());

// securing HTTP headers
app.use(helmet());

//MongoSanitize to Prevent NoSQL injections
app.use(
  mongoSanitize({
    replaceWith: "_",
  })
);

// Mounting Route
app.use("/", apiRoute);

// Generating Token
app.post("/auth", (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({ error: "invalid payload" });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "invalid payload" });
  }

  try {
    const token = auth(username, password);
    return res.status(200).json({ token });
  } catch (error) {
    if (error instanceof AuthError) {
      return res.status(401).json({ error: error.message });
    }
    next(error);
  }
});

app.use((error, _, res, __) => {
  console.error(
    `Error processing request ${error}. See next message for details`
  );
  console.error(error);

  return res.status(500).json({ error: "internal server error" });
});

app.listen(PORT, () => {
  console.log(`auth svc running at port ${PORT}`);
});
