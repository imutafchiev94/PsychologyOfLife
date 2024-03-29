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



    let verificationLink = `http://localhost:3000/user/emailverification/${emailToken}`;

    let email = await mail.sendMail({
      from: "Psychology of life <admin@psychologyoflife.live>",
      to: `${user.firstName} ${user.lastName} "${user.email}"`,
      subject: "Verify your email",
      text: `Please click on the link to verify your email ${verificationLink}`,
    });


    return await user.save();
  } else {
    return { message: "User alredy exist" };
  }
};

async function login({ username, password }) {
  let user = await User.findOne({ username }).populate("role").lean();

  if (!user) {
    throw { message: "Wrong Credentials" };
  }

  let isMatch = await bcrypt.compare(password, user.passwordHash);

  if (!isMatch) {
    throw { message: "Wrong Credentials" };
  }

  if(!user.isEmailConfirmed) {
    throw { message: "Email is not verified. Please verify your email first!" };
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
        throw { err };
      }
      userId = decoded._id;
    }
  );


  let user = await User.findById(userId);
  await user.set({ isEmailConfirmed: true });
  await user.save();
}
 
module.exports = {
  register,
  login,
  validateEmail,
};
