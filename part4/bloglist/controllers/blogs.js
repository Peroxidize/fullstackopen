const mongoose = require("mongoose");
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({});

    response.status(200).json(blogs);
});

blogsRouter.post("/", async (request, response) => {
    const body = request.body;
    const title = body.title;
    const author = body.author;
    const url = body.url;
    let likes = body.likes;

    if (!title) {
        return response
            .status(400)
            .send({ error: "title property is missing" });
    }

    if (!url) {
        return response.status(400).send({ error: "url property is missing" });
    }

    if (!likes) {
        likes = 0;
    }

    const blogObject = {
        title: title,
        author: author,
        url: url,
        likes: likes,
    };

    const blog = new Blog(blogObject);

    const result = await blog.save();

    response.status(201).json(result);
});

blogsRouter.delete("/", async (request, response) => {
    if (!mongoose.Types.ObjectId.isValid(request.body.id)) {
        return response.status(400).send({ error: "malformatted id" });
    }

    const id = new mongoose.Types.ObjectId(request.body.id);

    const deletedBlog = await Blog.deleteOne({ _id: id });

    if (deletedBlog.deletedCount === 1) {
        return response.status(204).end();
    }

    response.status(404).send({ error: "id not found" });
});

module.exports = blogsRouter;
