const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const UserRole = require("../models/UserRole");
const mail = require("../config/mailConfig");

const register = async (data) => {
  let salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));

  let hash = await bcrypt.hash(data.password, salt);

  let role = await UserRole.findOne({ name: "user" });

  let user = await User.findOne({
    $or: [{ username: data.username }, { email: data.email }],
  }).exec();

  console.log(user);

  if (!user) {
    let userData = {
      username: data.username,
      passwordHash: hash,
      email: data.email,
      createdAt: Date.now(),
      createdBy: data.username,
      updatedAt: Date.now(),
      updatedBy: data.username,
      isDeleted: false,
      isEmailConfirmed: false,
      firstName: data.firstName,
      lastName: data.lastName,
      age: data.age,
      role: role,
    };

    user = await new User(userData);

    let emailToken = jwt.sign(
      { _id: user._id },
      process.env.MAIL_VALIDATION_SECRET
    );

    console.log(emailToken);

    let verificationLink = `http://localhost:3000/user/emailverification/${emailToken}`;

    let email = await mail.sendMail({
      from: "Psychology of life <admin@psychologyoflife.live>",
      to: `${user.firstName} ${user.lastName} "${user.email}"`,
      subject: "Verify your email",
      text: `Please click on the link to verify your email ${verificationLink}`,
    });

    console.log(email);

    return await user.save();
  } else {
    return { message: "User alredy exist" };
  }
};

async function login({ username, password }) {
  let user = await User.findOne({ username }).populate("role").lean();

  let role = await UserRole.findOne({ name: "admin" });

  if (!user) {
    return { message: "Wrong Credentials" };
  }

  let isMatch = await bcrypt.compare(password, user.passwordHash);

  if (!isMatch) {
    return { message: "Wrong Credentials" };
  }

  let token = jwt.sign(
    { _id: user._id, username: user.username, role: user.role.name },
    process.env.USER_SESION_SECRET
  );

  return token;
}

async function validateEmail(token) {
  let userId;
  await jwt.verify(
    token,
    process.env.MAIL_VALIDATION_SECRET,
    function (err, decoded) {
      if (err) {
        return { err };
      }
      userId = decoded._id;
    }
  );

  console.log(userId);

  let user = await User.findById(userId);
  console.log(user);
  await user.set({ isEmailConfirmed: true });
  await user.save();
}

module.exports = {
  register,
  login,
  validateEmail,
};
