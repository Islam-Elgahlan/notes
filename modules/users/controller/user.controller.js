const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");



// Start  get all users //
const getAllUsers = async (req, res) => {
    const users = await User.find({}, "-password");
    res.status(StatusCodes.OK).json({ message: "Allusers", data: users });
};
// End  get all users //

// Start get specific user by id //
const getUser = async (req, res) => {
    let { id } = req.params;
    try {
        const user = await User.findOne({ _id: id })
        res.status(StatusCodes.OK).json({ message: "user", data: user })
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: "Erro", data: error })
    }
}
// End get specific user by id //

// Start add new user  //
const signUp = async (req, res) => {
    const { name, email, password, role, avatar } = req.body;
    console.log(req.file);
    try {
        const user = await User.findOne({ email });
        if (user) {
            res
                .status(StatusCodes.BAD_REQUEST)
                .json({ message: "email is already exist" });
        } else {
            let imgUrl = process.env.IMGURL + req.file.filename;
            const newUser = new User({
                name,
                email,
                password,
                role,
                avatar: imgUrl,
            });
            await newUser.save();
            res
                .status(StatusCodes.CREATED)
                .json({ message: "registered", data: imgUrl });
            console.log(imgUrl);
        }
    } catch (error) {
        res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "error", data: error });
    }
};
// End add new user  //

// Start SignIn   //
const signIn = async (req, res) => {
    let { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        // console.log(user);
        if (!user) {
            res.Status(StatusCodes.BAD_REQUEST).json({ message: "invalid email" });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            res
                .status(StatusCodes.BAD_REQUEST)
                .json({ message: "invalid email or password" });
        }
        var token = jwt.sign(
            { id: user._id, email: user.email, name: user.name, role: user.role },
            "shhhhh"
        );

        // console.log(token);
        return res.status(StatusCodes.OK).json({
            token: token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
        });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: "error", error });
    }
};
// End SignIn    //

// start Delete User //
const deleteUser = async (req, res) => {
    let { id } = req.params;
    try {
      const user = await User.deleteOne({ _id: id });
      res.json({ message: "user deleted", data: user });
    } catch (error) {
      res.json({ message: "error in delete", data: error });
    }
  };
  // End Delete User //

  //Start Update User //
const updateUser = async (req, res) => {
 
    try {
      let { id } = req.params;
      // let updated = req.body;
      name = req.body.name;
      email = req.body.email;
      password = req.body.password;
      // avatar = imgUrl;
      let options = { new: true };
      let newUrl = process.env.IMGURL + req.file.filename;
      const user = await User.findById(id);
      if (!user) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: "user not found" });
      } else {
        let URL = user.avatar;
        URL = newUrl; 
        const updatedUser = await User.findByIdAndUpdate(id, {name , email , password , avatar:URL }, options);
        await updatedUser.save();
        res.json({ message: "updated", data: updatedUser });
      }
    } catch (error) {
      res.json({ message: "error", data: error });
    }
  };
  //Start Update User //

  //Start Remove from Received Notes //
  const removeReceived = async (req, res) =>{
    let { id } = req.params;
    try {
        const user = await User.findById(req.user.id);
        let received_notes_id = user.received_notes ;
        for(let i =0 ; i < received_notes_id.length ; i++){
            received_notes_id = received_notes_id.filter((p) => p != id);
            user.received_notes = received_notes_id;
        }
        user.save()
        res.json({ message: "received_notes_id", data: user });
    } catch (error) {
        res.json({ message: "error in delete", data: error });
    }
  }
  //End Remove from Received Notes //


module.exports = {
    getAllUsers,
    getUser,
    signUp,
    signIn,
    deleteUser,
    updateUser,
    removeReceived
};