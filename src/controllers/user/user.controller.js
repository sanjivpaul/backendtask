import { User } from "../../models/user/user.model.js";

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

export { registerUser, loginUser };
