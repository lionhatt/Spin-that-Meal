const db = require("../../models");
// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../../config/middleware/isAuthenticated");

module.exports = function (app) {
    // GET route for getting all items
    app.get("/api/categories", isAuthenticated, (req, res) => {
        db.Category.findAll({}).then((result) => {
            // res.json(result);
            console.log(result);
            res.render("categories", {Category: result});
        });
    });

    // Get route for retrieving a single item
    app.get("/api/categories/:id", isAuthenticated, (req, res) => {
        db.Category.findOne({
            where: {
                id: req.params.id
            }
        }, (result) => {
            res.render("categories-edit", result);
        });
    });

    // POST route for saving new
    app.post("/api/categories", isAuthenticated, (req, res) => {
        const { name } = req.body;
        db.Category.create({ name }).then((result) => {
            res.json(result);
        });
    });

    // PUT route for updating
    app.put("/api/categories", isAuthenticated, (req, res) => {
        const { name } = req.body;
        db.Category.update({
            name
        }, {
            where: {
                id: req.body.id
            }
        }).then((result) => {
            res.json(result);
        });
    });

    // DELETE route for deleting
    app.delete("/api/categories/:id", isAuthenticated, (req, res) => {
        db.Category.destroy({
            where: {
                id: req.params.id
            }
        }).then((result) => {
            res.json(result);
        });
    });
};