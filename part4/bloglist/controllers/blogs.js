const mongoose = require("mongoose");
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({}).populate("user");

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

blogsRouter.delete("/:id", async (request, response) => {
    const id = request.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(400).send({ error: "malformatted id" });
    }

    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
        return response.status(404).send({ error: "no matching id" });
    }

    response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
    const id = request.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(400).send({ error: "malformatted id" });
    }

    if (!request.body || !request.body.likes) {
        return response.status(400).send({ error: "missing property likes" });
    }

    const likes = request.body.likes;

    const blog = await Blog.findById(id);

    if (!blog) {
        return response.status(404).send({ error: "no matching id" });
    }

    blog.likes = likes;

    const result = await blog.save();

    response.status(200).json(result);
});

module.exports = blogsRouter;
