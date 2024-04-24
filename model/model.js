import mongoose from "mongoose";


const DiseaseSchema = new mongoose.Schema({    
    name : String,
    location : {type:mongoose.Schema.Types.ObjectId, ref:"Districts"},
    count : String,
    causes : String,
    numberOfRecoveries: String,
    numberOfDeaths: String,
    recommendation : String,
    author : {type:mongoose.Schema.Types.ObjectId,ref:"User"},
    hospital: {
        type: mongoose.Schema.Types.ObjectId, ref:"Hospital"
    }


},{timestamps:true})

const districtSchema = new mongoose.Schema({
    _id:{type:mongoose.Schema.Types.ObjectId},
    name: {type:String,unique:true},
    location: String
},)

const userSchema = new mongoose.Schema({
    name: {type:String, unique:true},
    email: {type:String,unique:true},
    password : String,
    image : String,
    hospital: {type:mongoose.Schema.Types.ObjectId,ref:"Hospital"}
})

const hospitalSchema = new mongoose.Schema({
    _id:{type:mongoose.Schema.Types.ObjectId},
    name : {
        type: String,
        unique : true
    },
    location : String,
    district: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Districts"
    }
})

const user = mongoose.model("User", userSchema)
const disease = mongoose.model("Disease",DiseaseSchema)
const district = mongoose.model("Districts",districtSchema)
const hospital = mongoose.model("Hospital",hospitalSchema)

export {user,disease,district,hospital}