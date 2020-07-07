const express=require('express')
const Article=require('../models/articles')

const router=express.Router()

router.get('/new',(req,res)=>{
    res.render('articles/new',{article:new Article()})

})

router.get('/edit/:slug',async(req,res)=>{
    // console.log(req.params.slug)
    const article= await Article.findOne({slug :req.params.slug})
    // console.log(article)
    res.render('articles/edit',{article:article})

})

router.get('/:slug',async(req,res)=>{
  const article=await Article.findOne({ slug  : req.params.slug})
  if(article==null) res.redirect('/')
  res.render('articles/show',{article :article})
})

router.delete('/:id',async(req,res)=>{
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})


router.post('/',async(req,res,next)=>{
   req.article=new Article()
   next()
},saveandredirect("new"))

router.put('/:slug',async(req,res,next)=>{
 req.article=await Article.findOne({slug:req.params.slug})
 next()
},saveandredirect('edit'))

function saveandredirect(path){
 return async(req,res)=>{
    let article = req.article
    article.title=req.body.title,
    article.description=req.body.description,
    article.markdown=req.body.markdown

      try{
         article=await  article.save()
         res.redirect(`/articles/${article.slug}`)
      }
      catch(e){
        res.render(`articles/${path}`,{article : article})
      }
 }
}

module.exports=router