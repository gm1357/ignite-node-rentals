import express from "express";

const app = express();

app.get("/", (req, res) => res.send({ message: "Hello World!" }));

app.post("/", (req, res) => {
    const { name } = req.body;

    return res.send({ name });
});

app.listen(3333);
