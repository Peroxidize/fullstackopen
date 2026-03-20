const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const sample_data = require("./sample_data");
const User = require("../models/user");

const api = supertest(app);

beforeEach(async () => {
    await User.deleteMany({});
    await User.insertMany(sample_data.users);
});

describe("POST", async () => {
    test("invalid username (2 chars long or less)", async () => {
        const user = {
            username: "da",
            password: "askjhdasj",
        };

        await api.post("/api/users").send(user).expect(400);
    });

    test("invalid password (2 chars long or less)", async () => {
        const user = {
            username: "ksibidi",
            password: ".1",
        };

        await api.post("/api/users").send(user).expect(400);
    });
});

after(async () => {
    await mongoose.connection.close();
});
