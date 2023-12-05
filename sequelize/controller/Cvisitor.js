const models = require("../models/index");
const Visitor = models.Visitor;

exports.main = (req, res) => {
    res.render("index");
};

// GET /visitor
exports.get_visitors = (req, res) => {
    // [Before]
    // Visitor.getVisitors((result) => {
    //     console.log("Cvisitor.js >", result);
    //     res.render("visitor", { data: result });
    // });
    // [After]
    Visitor.findAll().then((result) => {
        console.log(result);
        res.render("visitor", { data: result });
    });
};

// POST /visitor
exports.post_visitor = (req, res) => {
    console.log(req.body);
    const { name, comment } = req.body;

    // [Before]
    // Visitor.postVisitor(req.body, (result) => {
    //     console.log(result);
    //     res.send({ id: result, name, comment });
    // });
    // [After]
    Visitor.create({
        name: name,
        comment: comment
    }).then((result) => {
        console.log(result);
        res.send(result);
    });
};

// GET /visitor => localhost:PORT/visitor?id=N
exports.get_visitor = (req, res) => {
    // [Before]
    // console.log(req.query);
    // Visitor.getVisitor(req.query.id, (result) => {
    //     console.log("Cvisitor.js >", result);
    //     res.send(result);
    // });

    // [After]
    Visitor.findOne({
        where: { id: req.query.id }
    }).then((result) => {
        console.log(result);
        res.send(result);
    });
};

// GET /visitor => localhost:PORT/visitor/:id
exports.get_visitor2 = (req, res) => {
    console.log(req.params); // { id: '4' }
    console.log(req.params.id); // 4

    // [Before]
    // Visitor.getVisitor(req.params.id, (result) => {
    //     console.log("Cvisitor.js >", result);
    //     res.send(result);
    // });

    // [After]
    Visitor.findOne({
        where: { id: req.params.id }
    }).then((result) => {
        console.log(result);
        res.send(result);
    });
};

// PATCH /visitor
exports.patch_visitor = (req, res) => {
    console.log(req.body);
    // [Before]
    // Visitor.patchVisitor(req.body, (result) => {
    //     console.log("patchVisitor Cvisitor.js >", result);
    //     res.send("수정 성공!");
    // });

    // [After]
    Visitor.update(
        {
            name: req.body.name,
            comment: req.body.comment
        },
        { where: { id: req.body.id } }
    )
        .then((result) => {
            console.log(result);
            res.send("수정 성공!");
        })
        .catch((err) => {
            console.log(err);
        });
};

// DELETE /visitor
exports.delete_visitor = (req, res) => {
    // console.log(req.body);
    // console.log(req.body.id);
    // [Before]
    // Visitor.deleteVisitor(req.body.id, (result) => {
    //     console.log("deleteVisitor CVisitor.js >", result);
    //     res.send("삭제 성공");
    // });

    // [After]
    Visitor.destroy({
        where: { id: req.body.id }
    }).then((result) => {
        console.log(result);
        res.send("삭제 성공!");
    });
};
