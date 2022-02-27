const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
    // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [Product]
    });
    res.json(categoryData)
  } catch (err) {
    console.log(err)
    res.status(400).json(err)
  }

});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryGetId = await Category.findOne({
      where: {
        id: req.params.id
      },
      include: [Product]
    })
    if (!categoryGetId) {
      res.status(404).json({ message: "There wasn't a category found associated with this number" })
      return;
    }
    res.json(categoryGetId)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryPost = await Category.create({
      category_name: req.body.category_name
    })
    res.json(categoryPost)
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryUpdate = await Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
    if (!categoryUpdate) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }
    res.json(categoryUpdate);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryDestroy = await Category.destroy({
      where: {
        id: req.params.id,
      },
    })
    if (!categoryDestroy) {
      res.status(404).json({ message: "No category found with this id" });
      return;
    }
    res.json(categoryDestroy);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
