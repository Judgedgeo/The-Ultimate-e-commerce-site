const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
    include:[
      {
        model: Product
      }
  ]
  })
  .then(tagData => res.json(tagData))
  .catch(err =>{
    console.log(err);
    res.status(500).json(err);
});
  // be sure to include its associated Product data
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
    where:{
      id : req.params.id
    },
    include:[
      {
        model: Product
      }
  ]
  })
  .then(tagData => res.json(tagData))
  .catch(err =>{
    console.log(err);
    res.status(500).json(err);
});
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  // create a new tag
  /* req.body should look like this ..
  {
    "tag_name":"orange"
  }
*/
  Tag.create(req.body)
  .then((post) =>{
    if(req.body.tag_name.length){
      res.status(200).json(post);
      return console.log(`\n\n\n New tag added`);
    }
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });

});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body,{
    where:{
      id: req.params.id
    }
  })
  .then(tagData => {
    if(tagData > 0){
      res.status(200).json(tagData);
      return console.log(`\n\n\n Tag has been update`);
    }
    res.status(404).json({message: 'There is no tag found at this id'});
    return;
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where:{
      id: req.params.id
    }
  })
  .then(tagData => {
    if(!tagData){
      res.status(404).json({ message: 'No Tag found with that id please try again.'});
      return;
    }
    res.json({message: 'Tag has been delete successfully'})
  })
    .catch(err =>{
      console.log(err);
      res.status(500).json(err);
    })
});


module.exports = router;