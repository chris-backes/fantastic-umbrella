const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [Product],
    })
    res.json(tagData)
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagGetId = await Tag.findOne({
      where: {
        id: req.params.id
      },
      include: [Product],
    })
    if (!tagGetId) {
      res.status(404).json({ message: "There wasn't a tag found associated with this number" })
      return;
    }
    res.json(tagGetId)
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const postTag = await Tag.create({
      tag_name: req.body.tag_name
    })
    res.json(postTag)
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTag = await Tag.update(
      {
        tag_name: req.body.tag_name,
      },
      {
        where: {
          id: req.params.id
        }
      })
    if (!updateTag) {
      res.status(404).json({ message: "There wasn't a tag found associated with this number" })
      return;
    }
    res.json(updateTag)
  } catch (err) {
    console.log(err)
    res.json(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagDestroy = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    })
    if (!tagDestroy) {
      res.status(404).json({ message: "No product found with this id" });
      return;
    }
    res.json(tagDestroy);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
