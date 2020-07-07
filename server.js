const express=require('express')
const article_router=require('./routes/articles')
const mongoose=require('mongoose')
const app=express()
const method_override=require('method-override')
const Article=require('./models/articles')
mongoose.connect('mongodb://localhost/Blog',{useNewUrlParser:true, useUnifiedTopology: true,useCreateIndex:true })
app.set('view engine','ejs')

app.use(express.urlencoded({extended:false}))

app.use(method_override('_method'))

app.get('/',async(req,res)=>{
 const articles=await Article.find().sort({
     createdAt :'desc'
 })
res.render("articles/index",{articles : articles})
})

app.use('/articles',article_router)
app.listen(3000)