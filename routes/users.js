const express = require("express");
const usersRouter = express.Router();
const bcrypt = require("bcryptjs");

const { User, Campaign, Follow, Contribution } = require("../db/models");
const { asyncHandler, getS3Url } = require("../utils");
const { generateUserToken, loggedInUser } = require("../auth");

usersRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const { firstName, lastName, password, email } = req.body;

    const hashedPassword = await bcrypt.hash(password, 8);
    const user = await User.create({
      firstName,
      lastName,
      hashedPassword,
      email,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    //Give User token

    const token = generateUserToken(user);
    let { userId, profilePic } = user;
    profilePic = await getS3Url(profilePic);
    res.json({ userId, token, firstName, profilePic });
  })
);

usersRouter.post(
  "/login",
  asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email,
      },
    });

    let validPassword = false;
    if (user) {
      validPassword = bcrypt.compareSync(
        password,
        user.hashedPassword.toString()
      );
    }

    if (!user || !validPassword) {
      res.ok = false;
      res.status(401);
      res.json({ message: "The provided credentials were invalid." });
    } else {
      const token = generateUserToken(user);

      let { userId, firstName, profilePic } = user;
      profilePic = await getS3Url(profilePic);
      res.json({ userId, token, firstName, profilePic });
    }
  })
);

usersRouter.get(
  "/:id(\\d+)",
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    let userData = await User.findByPk(id, {
      include: [
        { model: Campaign },
        {
          model: Follow,
          include: [{ model: Campaign }, { model: User }],
        },
        { model: Contribution },
      ],
    });

    // console.log(userData);

    for (let follow of userData.Follows) {
      const { Campaign, User } = follow;
      let { campaignPic } = Campaign;
      Campaign.campaignPic = await getS3Url(campaignPic);
      // const { id, firstName } = User;
      // follow.User = { id, firstName };
    }

    for (let campaign of userData.Campaigns) {
      let { campaignPic } = campaign;
      campaign.campaignPic = await getS3Url(campaignPic);
    }

    const profilePic = await getS3Url(userData.profilePic);
    userData.profilePic = profilePic;

    console.log(userData.Follows[0]);
    res.json(userData);
  })
);

usersRouter.get(
  "/restore",
  loggedInUser,
  asyncHandler(async (req, res, next) => {
    if (req.user) {
      let { id, firstName, email, profilePic } = req.user;
      profilePic = await getS3Url(profilePic);
      res.json({ id, firstName, email, profilePic });
    } else {
      res.json(null);
    }
  })
);

module.exports = usersRouter;
