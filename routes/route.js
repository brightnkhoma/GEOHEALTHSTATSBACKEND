import express from 'express'
import {addDisease,addDistrict,addUser,getDiseaase,addHospital,getDistrict} from './controller.js'

const router = express.Router()

router.post('/adduser',addUser);
router.post('/adddisease',addDisease)
//router.post('/adddistrict',addDistrict)
router.get('/getdisease',getDiseaase)
router.post('/addhospital',addHospital)
router.get('/getdistrict',getDistrict)

export default router;