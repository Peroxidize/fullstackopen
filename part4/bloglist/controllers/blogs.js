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

module.exports = blogsRouter;
