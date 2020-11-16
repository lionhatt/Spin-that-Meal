const db = require("../../models");
// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../../config/middleware/isAuthenticated");

module.exports = function (app) {
    // GET route for getting all items
    app.get("/api/play-lists", isAuthenticated, (req, res) => {
        db.PlayList.findAll({

        }).then((result) => {
            res.render("management/play-lists", { PlayList: result });
        });
    });

    // Get route for retrieving a single item
    app.get("/api/play-lists/:id", isAuthenticated, (req, res) => {
        db.PlayList.findOne({
            where: {
                id: req.params.id
            }
        }).then((result) => {
            res.render("management/play-lists-edit", result);
        });
    });

    // POST route for saving new
    app.post("/api/play-lists", isAuthenticated, (req, res) => {
        const { name, UserId } = req.body;
        db.PlayList.create({
            name, UserId
        }).then((result) => {
            res.json(result);
        });
    });

    // PUT route for updating
    app.put("/api/play-lists", isAuthenticated, (req, res) => {
        const {id, name } = req.body;
        db.PlayList.update({
            name
        }, {
            where: {
                id: id
            }
        }).then((result) => {
            res.json(result);
        });
    });

    // DELETE route for deleting
    app.delete("/api/play-lists/:id", isAuthenticated, (req, res) => {
        db.PlayList.destroy({
            where: {
                id: req.params.id
            }
        }).then((result) => {
            res.json(result);
        });
    });
};