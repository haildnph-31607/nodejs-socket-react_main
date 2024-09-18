import Auth from "../models/Auth.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";
import dotenv from "dotenv";

dotenv.config();
const { JWT_ACCESS } = process.env;

const createToken = (_id) => {
  const jwtkey = JWT_ACCESS;
  return jwt.sign({ _id }, jwtkey, {
    expiresIn: "1d",
  });
};

export const register = async (req, res) => {
  try {

    const { name, email, password } = req.body;

    let user = await Auth.findOne({ email });

    if (user) return res.status(400).json("Email đã tồn tại trên hệ thống");

    if (!name || !email || !password)
      return res.status(400).json("Vui lòng điền đủ thông tin");

    if (!validator.isEmail(email))
      return res.status(400).json("Vui lòng điền đúng định dạng email");

    user = new Auth({ name, email, password });
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(user.password, salt);

    await user.save();
    const token = createToken(user._id);
    res.status(200).json({ _id: user._id, name, email, token });

  } catch (error) {

    res.status(500).json({
      name: error.name,
      message: error.message,
    });

  }
};
export const login = async (req,res)=>{
try {
  const {email,password} = req.body
  const user = await Auth.findOne({email})

  if(!user) return res.status(400).json("Email không tồn tại trên hệ thống")

  if(!email || !password) return res.status(400).json("Vui lòng điền đủ thông tin")
    
  const log = await bcryptjs.compare(password,user.password)  

  if(!log) return res.status(400).json("MậT khẩu không đúng ")

    const token = createToken(user._id)
    res.status(200).json({
      _id:user._id,
      name:user.name,
      email,
      token
    })
} catch (error) {
  return  res.status(500).json({
    name:error.name,
    message:error.message,
  })
}
};
export const findUser = async(req,res) =>{
  const _id = req.params.id
    try {
      const data = await Auth.findById(_id)
      return res.status(200).json(data)
    } catch (error) {

      return  res.status(500).json({
        name:error.name,
        message:error.message,
      })

    }
}
export const getAll = async(req,res) =>{
 
    try {

      const data = await Auth.find()
      return res.status(200).json(data)

    } catch (error) {

      return  res.status(500).json({
        name:error.name,
        message:error.message,
        
      })

    }
}