const Category = require("../models/category")
const slugify = require("slugify")

// Following is a recursive function to cover all the categories along with their sub-categories
const createCategories = ( categories, parentId = null ) => {

    const categoryList = [];
    let category;

    if (parentId == null) {
        category = categories.filter(cat => cat.parentId == undefined)
    } else {
        category = categories.filter(cat => cat.parentId == parentId)
    }

    
    for (let cat of category) {
        categoryList.push({
            _id : cat._id,
            name : cat.name,
            slug : cat.slug,
            parentId: cat.parentId,
            children : createCategories(categories, cat._id)
        })
    }

    return categoryList;
}

exports.addCategory = (req, res) => {
    const categoryObj = {
        name : req.body.name,
        slug : slugify(req.body.name)     
    }

    if (req.file) {
        categoryObj.categoryImage = process.env.API + '/public/' + req.file.filename;
    }

    if (req.body.parentId) {
        categoryObj.parentId = req.body.parentId;
    }

    const cat = new Category(categoryObj);
    cat.save((error, category) => {
        if (error) {
            return res.status(400).json({ error });
        }
        if (category) {
            return res.status(201).json({ category })
        }
    })
}

exports.getCategories = (req, res) => {
    Category.find({})
    .exec((error, categories) => {
        if (error) {
            return res.status(400).json({ error });
        }
        if (categories) {
            // Return the categroies in a nested formatted format using below function
            const categoryList = createCategories(categories);
            res.status(200).json({ categoryList });
        }
    })
}