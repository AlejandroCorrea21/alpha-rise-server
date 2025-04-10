const router = require("express").Router();

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

const uploadRoutes = require("./upload.routes");
router.use("/upload", uploadRoutes);

module.exports = router;