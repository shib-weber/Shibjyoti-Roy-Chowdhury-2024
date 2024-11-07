const express = require('express');
//const mongoose = require('mongoose');
//const {Lyrics} = require('../models/notes')
const path = require('path')
const bodyParser= require('body-parser');
//const fft = require("fft-js").fft;


const router=express.Router()

router.use(express.json());
router.use(bodyParser.json())
router.use(express.urlencoded({extended:true}))
router.use(bodyParser.urlencoded({extended:false}))
router.use(express.static(path.join(__dirname,'public')));

router.get('/',(req,res)=>{
    res.render('main')
})

module.exports = router