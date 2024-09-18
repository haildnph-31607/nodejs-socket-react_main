import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import router from './routes/index.js'

dotenv.config()

const {PORT,ASLAST_URI} = process.env

const app = express()

app.use(express.json())
app.use(cors())
mongoose.connect(ASLAST_URI).then(()=>{
    console.log("Connect succesfully cloud MongoDB");
    
})
app.use('/api',router)

app.listen(PORT,(req,res)=>{
    console.log(`Server running port ${PORT}`);
    
})
