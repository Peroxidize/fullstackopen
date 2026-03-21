const mongoose = require("mongoose");
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const { userExtractor } = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({}).populate("user");

    response.status(200).json(blogs);
});

blogsRouter.post("/", userExtractor, async (request, response) => {
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

    const user = request.user;

    const blogObject = {
        title: title,
        author: author,
        url: url,
        likes: likes,
        user: user._id,
    };

    const blog = new Blog(blogObject);

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", userExtractor, async (request, response) => {
    const id = request.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(400).send({ error: "malformatted id" });
    }

    const user = request.user;
    const blog = await Blog.findById(id);

    if (!blog) {
        return response.status(404).send({ error: "no matching id" });
    }

    if (blog.user.toString() !== user._id.toString()) {
        return response
            .status(401)
            .json({ error: "not the author of the blog" });
    }

    user.blogs = user.blogs.filter(blog => blog._id.toString() !== id);
    await user.save();

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

    const savedBlog = await blog.save();

    response.status(200).json(savedBlog);
});

module.exports = blogsRouter;
