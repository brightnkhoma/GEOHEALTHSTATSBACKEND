import express from 'express'
import {addDisease,addDistrict,addUser,getDiseaase,addHospital,getDistrict,getDistrictHospitals,getAllDiseases,getDiseases} from './controller.js'

const router = express.Router()

router.post('/adduser',addUser);
router.post('/adddisease',addDisease)
router.post('/adddistrict',addDistrict)
router.post('/getdisease',getDiseaase)
router.post('/addhospital',addHospital)
router.get('/getdistrict',getDistrict)
router.post('/getdistricthospitals',getDistrictHospitals)
router.post("/getalldiseases",getAllDiseases)
router.get('/getdiseaseslist',getDiseases)

export default router;