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
        assert.deepStrictEqual(result, []);
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
