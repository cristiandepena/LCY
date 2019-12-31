const database = require('../../config/database');
const Category = database.import('../models/productCategories');

// Get all categories
const getCategories = (req, res) => {
  const categories = Category.findAll({
    raw: true,
    attributes: ['CategoryId', 'Description'],
    where: {
      Active: true
    }
  })
    .then(category => {
      const response = {
        count: category.length,
        categories: category.map(category => {
          return {
            id: category.CategoryId,
            description: category.Description,
            type: 'GET',
            url: 'localhost:8080/productCategories/' + category.CategoryId
          };
        })
      };
      res.status(200).json({
        Categories: response
      });
    });
};

// Get category by id
const getCategoryById = (req, res) => {
  const id = req.params.categoryId;
  if (!id) {
    res.status(401).json({
      message: 'Invalid id'
    });
  } else {
    const category = Category.findAll({
      where: {
        CategoryId: id
      }
    }).then(
      category => {
        const response = {
          Categories: category.map(category => {
            return {
              id: category.CategoryId,
              description: category.Description,
              active: category.Active,
              type: 'GET'
            };
          })
        };
        res.status(200).json({
          response
        });
      }
    );
  }
};

// Create category
const createCategory = (req, res, next) => {
  const category = Category.create({
    Description: req.body.description,
    CreatedBy: req.body.createdBy
  }).then(row => {

    res.status(201).json({
      createdCategory: row.dataValues,
      message: 'Handling POST request to /ProductCategories',
    });
  }).catch(err => {
    res.status(500).json({
      error: err.message
    });
  });
};

// Update category
const updateCategory = (req, res) => {
  const id = req.params.categoryId;
  const description = req.body.description;

  if (!id) {
    res.status(500).json({
      message: 'Invalid Id'
    });
  } else {
    Category.update({
      Description: description
    }, {
      where: {
        CategoryId: id
      }
    })
      .then(count => {
        const response = {
          message: `${count} Rows updated`,
          type: 'PATCH'
        };
        res.status(200).json({
          response
        });
      });

  }
};

// Delete category
const deleteCategory = (req, res) => {
  const id = req.params.categoryId;
  if (!id) {
    res.status(500).json({
      message: 'Invalid Id'
    });
  } else {
    Category.destroy({
      where: {
        CategoryId: id
      }
    })
      .then(count => {
        const response = {
          message: `${count} Rows deleted`,
          type: 'DELETE'
        };
        res.status(200).json({
          response
        });
      });

  }
};

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};