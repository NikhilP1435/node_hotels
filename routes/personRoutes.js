const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');
// POST route to add a person
router.post('/', async (req, res) => {
    try {
        //Assuming the request body contains the person data 
        const data = req.body
        //    Create a new Person document using the Mongoose model
        const newPerson = new Person(data);
        //   Save the new person to the database
        const response = await newPerson.save();
        console.log('data saved');
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' })
    }
});

// Get method to get the pereson
router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' })
    }
});

router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType;
        if (workType == 'chef' || workType == 'manager' || workType == 'waiter') {
            const response = await Person.find({ work: workType });
            console.log('response fetched');
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'Invalid work type' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' })
    }
});

router.put('/:id',async(req,res)=>{
    try{
    const personId = req.params.id;
    const updatedPersonData = req.body;

   const response = await Person.findByIdAndUpdate(personId, updatedPersonData,{
    new:true,
    runValidators:true
   }) 
   if(!response){
    return res.status(404).json({error:'Person not found'});
   }
   console.log('data updated');
   res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' })
    }
});

module.exports = router