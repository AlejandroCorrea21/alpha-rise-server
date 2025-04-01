const router = require("express").Router();

// ℹ️ Test Route. Can be left and used for waking up the server if idle
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const authRouter = require("./auth.routes")
router.use("/auth", authRouter)

const userRouter = require("./user.routes")
router.use("/users", userRouter)

const commentRouter = require("./comment.routes")
router.use("/comments", commentRouter)

const resourceRouter = require("./resource.routes")
router.use("/resources", resourceRouter)

module.exports = router;
