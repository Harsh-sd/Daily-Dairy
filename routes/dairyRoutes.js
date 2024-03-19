const express = require("express");
const isAuth=require("../middleware/isAuth");
const dairyController = require("../controllers/dairyController");

const router = express.Router();
//for adding dairy 
router.post("/addDairy",isAuth ,  dairyController.addDairy);
//for editing the existing diary
router.put("/editDairy/:dairyId" ,isAuth ,  dairyController.editDairy );
//for deleting the specific Dairy
router.delete("/deleteDairy/:dairyId" ,isAuth , dairyController.deleteDairy );
//to get all the dairies
router.get("/dairy" ,isAuth ,  dairyController.getDairy );
module.exports = router;
