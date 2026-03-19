const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");
const sampleData = require("./sample_data");

test("dummy returns one", () => {
    const blogs = [];

    const result = listHelper.dummy(blogs);
    assert.strictEqual(result, 1);
});

describe("total likes", () => {
    test("of empty list is zero", () => {
        const result = listHelper.totalLikes([]);
        assert.strictEqual(result, 0);
    });

    test("when list has only one blog, equals the likes of that", () => {
        const result = listHelper.totalLikes(sampleData.listWithOneBlog);
        assert.strictEqual(result, 5);
    });

    test("of a bigger list is calculated right", () => {
        const result = listHelper.totalLikes(sampleData.blogs);
        assert.strictEqual(result, 36);
    });
});

describe("favorite blog", () => {
    test("of empty list", () => {
        const result = listHelper.favoriteBlog([]);
        assert.deepStrictEqual(result, null);
    });

    test("when list has only one blog, return the blog", () => {
        const result = listHelper.favoriteBlog(sampleData.listWithOneBlog);
        assert.deepStrictEqual(result, sampleData.listWithOneBlog[0]);
    });

    test("of most likes", () => {
        const result = listHelper.favoriteBlog(sampleData.blogs);
        assert.deepStrictEqual(result, sampleData.blogs[2]);
    });
});

describe("most blogs", () => {
    test("of empty list", () => {
        const result = listHelper.mostBlogs([]);
        assert.deepStrictEqual(result, null);
    });

    test("when list has only one blog, return the author and blogs", () => {
        const result = listHelper.mostBlogs(sampleData.listWithOneBlog);
        assert.deepStrictEqual(result, {
            author: sampleData.listWithOneBlog[0].author,
            blogs: 1,
        });
    });

    test("author with most blogs", () => {
        const result = listHelper.mostBlogs(sampleData.blogs);
        assert.deepStrictEqual(result, {
            author: "Robert C. Martin",
            blogs: 3,
        });
    });
});

describe("most likes", () => {
    test("of empty list", () => {
        const result = listHelper.mostLikes([]);
        assert.deepStrictEqual(result, null);
    });

    test("when list has only one blog, return the author and likes", () => {
        const result = listHelper.mostLikes(sampleData.listWithOneBlog);
        assert.deepStrictEqual(result, {
            author: sampleData.listWithOneBlog[0].author,
            likes: sampleData.listWithOneBlog[0].likes,
        });
    });

    test("author with most likes", () => {
        const result = listHelper.mostLikes(sampleData.blogs);
        assert.deepStrictEqual(result, {
            author: "Edsger W. Dijkstra",
            likes: 17,
        });
    });
});
