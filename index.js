import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose';
import router from './routes/route.js';

const app = express();
app.use(cors())
app.use(express.json())

await mongoose.connect('mongodb+srv://allan:allan@geohealthstats.ovuh04d.mongodb.net/?retryWrites=true&w=majority&appName=GEOHEALTHSTATS').then(()=>console.log("Mongo DB connected"))


app.use((err,req,res,next)=>{
    const statuscode = err.statuscode || 500;
    const message = err.message || 'Internal server error'

    return res.status(statuscode).json({
        success : false,
        statuscode,
        message
    })
})
app.use('/ghs',router)

const PORT = process.env.PORT || 4000

app.listen(PORT,(()=>console.log(`server listening on port ${PORT}`)))