import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { errorHandler } from '../error/error.js'
import {disease,district,user,hospital} from '../model/model.js'



export const addDistrict = async(req,res,next)=>{
    try {
        
        const {name,location} = req.body;
        const exists = await district.findOne({name});
        if(exists) return res.status(400).json(`district ${name} already exists`)
        const dis = new district({_id:new mongoose.Types.ObjectId,name,location})
        await dis.save()

        res.status(200).json(`district ${name} added successifully!`)

    } catch (error) {
        res.status(400).json(error.message)
       // next(errorHandler(500,error.message))
    }

}

export const addDisease = async(req,res,next)=>{
    try {
        const {name,causes,count,location,numberOfDeaths,numberOfRecoveries,recommendation,email,_hospital} = req.body
        const admin = await user.findOne({email})
        if(!admin) return res.status(500).json("You are not authorised to add this data")
        const loc = await district.findOne({name:location})
        if(!loc) return res.status(500).json("this location does not exist")
        const _hosp = await hospital.findOne({name:_hospital})
        if(!_hosp) return res.status(400).json(`${_hospital} does not exist or try to spell it correctly and capitalize each first character of a word`)
        const dis = new disease({causes,count,location:loc._id,name,numberOfDeaths,recommendation,numberOfRecoveries,author:admin._id,hospital:_hosp._id});

        await dis.save();
        res.status(400).json(`added ${name} successifully`)
    } catch (error) {
        res.status(400).json(error.message)
        //next(errorHandler(500,error.message))
        
    }
}

export const addUser = async(req,res,next)=>{
    try {
        
        const {email,image,name,password} = req.body;
        const _user = await user.findOne({email})
        if(_user) return  res.status(400).json(`user ${name} already exists!`)
        const encryptedPassword = bcrypt.hashSync(password,10)
        const admin = new user({image,name,email,password:encryptedPassword})
        await admin.save();
       
        res.status(200).json(`welcome ${name} to geohealthstats!!!!`)
    } catch (error) {
        res.status(400).json(error.message)
       // next(errorHandler(500,error.message))
    }
}

export const getDiseaase = async(req,res,next)=>{
    try {
        
        const {name} = req.body
        const data = await disease.find({name}).populate(['location','author'])
        if(!data) return res.status(500).json(`disease ${name} in not recorded in our database`)
        res.status(200).json(data)

    } catch (error) {
        res.status(400).json(error.message)
        //next(500,errorHandler(500,error.message))

    }
}

export const addHospital = async(req,res,next)=>{
    try {
        
        const {name,location,_district} = req.body;
        const exist = await hospital.findOne({name});
        if(exist) return res.status(500).json(`${name} already exists!`)
        const hospitalDistrict = await district.findOne({name:_district})
        if(!hospitalDistrict) return res.status(500).json(`districts ${_district} does not exist or try to spell it correctly and capitalise the first character`)
        const hosp = new hospital({_id:new mongoose.Types.ObjectId,name,district:hospitalDistrict._id,location})
        await hosp.save()
        res.status(200).json(`hospital ${name} saved successifully!`)
    } catch (error) {
        res.status(400).json(error.message)
    }
}


export const getDistrict = async (req,res,next)=>{
    try {
        
        const _res = await district.find();
        res.status(200).json(_res)
    } catch (error) {
        res.status(400).json(error.message)
       // next(errorHandler(500,error.message))
    }
}

export const getDistrictHospitals = async(req,res,next)=>{
    try {
        
        const {_district} = req.body;
        const dist = await district.findOne({name:_district})
        if(!dist) return res.status(400).json(`${_district} does not exist`);
        const hosp = await hospital.find({district:dist._id})
        res.status(200).json(hosp)
    } catch (error) {
        res.status(500).json(error.message)
    }

    
}