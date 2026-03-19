const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const sampleData = require("./sample_data");
const Blog = require("../models/blog");

const api = supertest(app);

beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(sampleData.blogs);
});

test("bloglists are returned as json", async () => {
    await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/)
        .expect(response => {
            response.body.length;
        }, 6);
});

test("bloglist identifier is named id", async () => {
    await api.get("/api/blogs").expect(response => {
        response.body[0].id;
    }, sampleData.blogs[0]._id);
});

test("blog has been added to database successfully", async () => {
    const sample = {
        title: "STOP USING AI",
        author: "Pewdiepie",
        url: "https://youtube.com/",
        likes: 69,
    };

    await api
        .post("/api/blogs")
        .send(sample)
        .expect(201)
        .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");

    assert.strictEqual(response.body.length, sampleData.blogs.length + 1);
});

after(async () => {
    await mongoose.connection.close();
});
