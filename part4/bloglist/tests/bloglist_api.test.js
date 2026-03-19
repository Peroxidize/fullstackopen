const { test, after, beforeEach } = require("node:test");
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

test("notes are returned as json", async () => {
    await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/)
        .expect(response => {
            response.body.length;
        }, 6);
});

after(async () => {
    await mongoose.connection.close();
});
