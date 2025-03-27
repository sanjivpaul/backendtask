import { transporter } from "../../middlewares/mail.transporter.js";
import { User } from "../../models/user/user.model.js";
import crypto from "crypto";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.log(
      "Something went wrong while generating access and refresh token",
      error
    );

    throw error;
  }
};

const registerUser = async (req, res) => {
  const { fullName, email, username, password } = req.body;

  console.log(fullName, email, username, password);

  try {
    if (
      [fullName, email, username, password].some(
        (field) => !field || field.trim() === ""
      )
    ) {
      return res.status(400).send({ message: "All fields are required" });
    }

    const existedUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existedUser) {
      return res
        .status(409)
        .send({ message: "User with email already exists" });
    }

    const user = await User.create({
      fullName,
      email,
      password,
      username: username.toLowerCase(),
    });

    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    if (!createdUser) {
      return res
        .status(500)
        .send({ message: "Something went wrong while registering the user" });
    }

    return res.status(201).send({
      message: "User Registered Successfully",
      data: createdUser,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    return res
      .status(500)
      .send({ message: "Internal Server Error On Register" });
  }
};

const loginUser = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    if (!username && !email) {
      return res.status(400).send({
        message: "Email or username is required for login",
      });
    }

    const user = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (!user) {
      return res.status(400).send({
        message: "User does not exist!",
      });
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
      return res.status(401).send({
        message: "incorrect password",
      });
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user._id
    );

    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(201)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .send({
        message: "User Logged in Successfully",
        user: loggedInUser,
        accessToken,
        refreshToken,
      });
  } catch (error) {
    console.error("Error login user:", error);
    return res.status(500).send({ message: "Internal Server Error On Login" });
  }
};

const forgetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) {
      return res.status(400).send({
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).send({
        message: "User does not exist!",
      });
    }

    const otp = crypto.randomInt(100000, 999999).toString();

    const mailOptions = {
      from: "codedevks@gmail.com",
      to: user.email,
      subject: "Your OTP Code from [coodersG]",
      // text: `Your OTP code is ${otp}. It is valid for 10 minutes.`,
      html: `
      <html>
        <body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f4f4f4;">
          <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
            <h2 style="color: #333;">Hello, ${user.username}</h2>
            <p style="color: #555;">
              Your One-Time Password (OTP) is <strong style="font-size: 24px; color: #007BFF;">${otp}</strong>.
            </p>
            <p style="color: #555;">
              This OTP is valid for the next 10 minutes. Please use it to complete your process.
            </p>
            <p style="color: #555;">
              If you did not request this code, please ignore this email or contact support.
            </p>
            <hr style="margin: 20px 0; border: 0; border-top: 1px solid #e0e0e0;">
            <footer style="color: #777; font-size: 12px;">
              <p>Thank you,</p>
              <p><strong>[coodersG]</strong></p>
              <p><a href="https://www.coodersg.com" style="color: #007BFF;">Visit our website</a></p>
            </footer>
          </div>
        </body>
      </html>
    `,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).send({
      message: `OTP sent to your registered email ${user.email}`,
      OTP: otp,
      status: 201,
    });
  } catch (error) {
    console.log("OTP:", error);

    res.status(500).send("Failed to send OTP.");
  }
};

const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    if (!email || !newPassword) {
      return res.status(400).send({
        message: "Email and new password are required",
      });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).send({
        message: "User does not exist!",
      });
    }

    user.password = newPassword;
    await user.save();
    res.status(201).send({
      message: "Password has been successfully updated.",
    });
  } catch (error) {
    res.status(500).send("Failed to reset password.");
  }
};

export { registerUser, loginUser, forgetPassword, resetPassword };
