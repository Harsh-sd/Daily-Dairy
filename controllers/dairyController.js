const Dairy = require("../models/dairy");
//localhost:3000/addDairy
exports.addDairy = async (req, res, next) => {
    try {
      const title=req.body.title;
      const description=req.body.description;
      console.log("Title:", title); // Add this line for debugging
      console.log("Description:", description);
        if (!title || !description) {
            return res.status(400).send({ message: "Title and description are required." });
        }

        const dairy = new Dairy({
            title: title,
            description: description
        });

        const savedDairy = await dairy.save();
        res.status(201).send({ message: "Dairy form successfully created.", dairy: savedDairy });
        console.log(savedDairy);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal server error." });
    }
};
//localhost:3000/editDairy/:dairyId
exports.editDairy= async(req,res,next)=> {
    try {
        const title=req.body.title;
        const description=req.body.description;
        const dairyId=req.params.dairyId;
         //if we wanna use curly braces then ({_id:dairyId})
        const existDairy=await Dairy.findById(dairyId);
        if(!existDairy) {
            return res.status(404).send({ message: "Dairy not found" });
        }
       existDairy.title=title;
       existDairy.description=description;
      
        const saveDairy = await existDairy.save();
        res.status(201).send({ message: "Dairy updated successfully.", dairy: saveDairy });
        console.log(saveDairy);
                
        
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal server error." });
    }
};
//localhost:3000/deleteDairy/:dairyId
exports.deleteDairy= async (req,res,next)=> {
    try {
        const title=req.body.title;
        const description=req.body.description;
        const dairyId=req.params.dairyId;
         
        const existDairy=await Dairy.findByIdAndDelete(dairyId);
        //204 status code for deleting the file
        res.status(404).send({ message: "Dairy deleted successfully.", dairy: existDairy });
        console.log(existDairy);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal server error." });
    }
};
//localhost:3000/dairy
exports.getDairy= async (req,res,next)=> {
    try {
        const allDairy=await Dairy.find();
        res.status(200).send({message:"fetched all Dairies successfully" , dairy:allDairy});
        console.log(allDairy);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal server error." });
    }
   
};


