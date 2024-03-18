const { Router } = require("express");
const { Account } = require("../db/db");
const { authMiddleware } = require("../middleware/authMiddleware");
const accRouter = Router();
const zod = require('zod');
const { default: mongoose } = require("mongoose");

// Get balance
accRouter.get("/balance", authMiddleware, async (req, res) => {
  const user = await Account.findOne({
    userId: req.userId,
  });

  if (!user) {
    res.status(404).json({
      message: "User not found",
    });
  } else {
    res.status(200).json({
      balance: user.balance,
    });
  }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////

const transferDetailBody = zod.object({
    to: zod.string(),
    amount: zod.number()
})

//Transfer Money
accRouter.post('/transfer', authMiddleware, async (req, res) => {

    //to make sure the database follows the ACID properties ie Atomic/ Consistent/ Integrity/ Durability
    //we have to add transction in it

    const session = await mongoose.startSession();
    await session.startTransaction(); 

    const { success } = transferDetailBody.safeParse(req.body);

    if (!success) {
        return res.status(400).json({ message: 'Invalid account' });
    }

    const { to, amount } = req.body;
    console.log(to, amount)

    const userId = req.userId;
    console.log(userId);
    const sendingUser = await Account.findOne({ userId });

    if( !sendingUser && sendingUser.balance > amount ){
        return res.status(400).json({ message: 'Invalid user-id' });
    }
    
    const recievingUser = await Account.findOne({ userId: to });
    console.log(recievingUser);

    if( !recievingUser ){
        return res.status(400).json({ message: 'Invalid user-id' });
    }

    await Account.updateOne({
        userId: req.userId
    }, {
        balance: sendingUser.balance - amount
    })

    await Account.updateOne({
        userId: to
    }, {
        balance: recievingUser.balance + amount
    })

    await session.commitTransaction();

    res.status(200).json({ message: 'Payment successful' });
})

module.exports = {
  accRouter,
};
