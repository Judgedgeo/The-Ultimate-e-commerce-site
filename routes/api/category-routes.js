const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    attributes:[
      'id',
      'category_name',
    ],
    include:[
      {
        model: Product,
        attributes:['id', 'product_name', 'price','stock','category_id']
      }
    ]
  }).then(categoryData => {
    res.json(categoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).send(err);
  });
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    where: {
      id: req.params.id
    },
    attributes:[
      'id',
      'category_name',
    ],
    include:[
      {
        model: Product,
        attributes:['id', 'product_name', 'price','stock','category_id']
      }
    ]
  })
  .then((categoryData =>{
    res.json(categoryData);
  }))
  .catch(err => {
    console.log(err);
    res.status(500).send(err);
  });
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name : req.body.category_name
  })
  .then(request => res.json({
    message: 'Your category has been added successfully'}))
  .catch(err =>{
    console.log(err);
    res.status(400).json(err);
  })

});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where:{
        id: req.params.id
      }
    }
  )
  .then(updateRequestData => {
    if(!updateRequestData){
      res.status(404).json({message: 'There is no category found at this id'});
      return;
    }
    res.json({message: `You have successfully updated this category`});
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where:{
      id: req.params.id
    }
  })
  .then(categoryData => {
    if(!categoryData){
      res.status(404).json({ message: 'No category found with that id please try again.'});
      return;
    }
    res.json({message: 'Category has been delete successfully'})
  })
    .catch(err =>{
      console.log(err);
      res.status(500).json(err);
    })
});


module.exports = router;