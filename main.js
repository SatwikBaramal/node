const express=require('express')
const app=express()
const usercollection=require('./modules/user')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.set('view engine','ejs')

app.get('/abcdwe',function(req,res){
    res.send("hello")
})

app.get('/home',function(req,res){
    res.render("home")
})

app.post('/create', async function(req, res) {
    let { name, email, imageUrl } = req.body;

    // Assuming usercollection is your Mongoose model for users
    let createdUser = await usercollection.create({
        name: name,
        email: email,
        Image: imageUrl
    });

    res.redirect('/read')
});

app.get('/read',async function(req,res){
    let Allusers = await usercollection.find()
    res.render("Read",{users:Allusers})
})

app.get('/edit/:userid',async function(req,res){
    let user=await usercollection.findOne({_id:req.params.userid})
    res.render("update",{user:user})
})

app.post('/update/:userid',async function(req,res){
    let {name,email,imageUrl}=req.body
    await usercollection.findOneAndUpdate({_id:req.params.userid},{name:name,email:email,Image:imageUrl},{new:true})
    res.redirect('/read')
})


app.get('/delete/:userid',async function(req,res){
    await usercollection.findOneAndDelete({_id:req.params.userid})
    res.redirect('/read')
})
app.listen(3001)