const { Router } = require("express");
const userRouter = Router();
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config.js");
const { User, Account } = require("../db/db.js");
const { authMiddleware } = require("../middleware/authMiddleware.js");

const signupBody = zod.object({
  username: zod.string(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});

const signinBody = zod.object({
  username: zod.string(),
  password: zod.string(),
});

//Signup
userRouter.post("/signup", async function (req, res) {
  const { success } = signupBody.safeParse(req.body);

  if (!success) {
    res.status(411).json({
      message: "Incorrect inputs",
    });
  }

  const existingUser = await User.findOne({ username: req.body.username });
  if (existingUser) {
    res.status(411).json({
      message: "Email already taken",
    });
  }

  const newUser = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });

  const userId = newUser._id;

  const newUserAccount = await Account.create({
    userId: userId,
    balance: (Math.random() * 10000) + 1,
  })

  const token = jwt.sign({ userId }, JWT_SECRET);

  res.status(200).json({
    message: "User created successfully",
    token: token,
  });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Signin
userRouter.post("/signin", async function (req, res) {
  const { success } = signinBody.safeParse(req.body);

  if (!success) {
    res.status(411).json({
      message: "Incorrect inputs",
    });
  }

  const existingUser = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (!existingUser) {
    res.status(411).json({
      message: "Error while logging in",
    });
  } else {
    const userId = existingUser._id;
    const token = jwt.sign({ userId }, JWT_SECRET);

    res.status(200).json({
      token,
    });
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const userUpdateBody = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

userRouter.put("/", authMiddleware, async function (req, res) {
  console.log("hi");
  const { success } = userUpdateBody.safeParse(req.body);

  if (!success) {
    res.status(411).json({
      message: "Incorrect inputs",
    });
  }

  const existingUser = await User.findById(req.userId);
  if (!existingUser) {
    res.status(411).send("User doesnt exist");
  } else {
    await User.updateOne({ _id: req.userId }, req.body);

    res.status(200).json({
      message: "User updated successfully",
    });
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////

userRouter.get("/bulk", authMiddleware, async function (req, res) {
  const filter = req.query.filter;
  console.log(filter);

  if (!filter) {
    res.status(200).json({
      User: await User.find({}),
    });
  } else {
    const allUsers = await User.find({});
    
    //My Method
    const filteredUsers = allUsers.filter((user) => {
      return user.firstName.includes(filter) || user.lastName.includes(filter);
    });

    //Harkirats Method
    const findUser = await User.find({
      $or: [{
        firstName: {
          $regex: filter,
        }
      }, {
        lastName: {
          $regex: filter,
        }
      }]
    })

    res.status(200).json({
      // User: findUser.map((user) => {
      //   return {
      //     firstName: user.firstName,
      //     lastName: user.lastName,
      //     username: user.username,
      //     password: user.password
      //   }
      // }),

      User: filteredUsers
    });
  }
});

module.exports = {
  userRouter,
};
