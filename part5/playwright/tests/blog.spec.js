const { beforeEach, describe, test, expect } = require("@playwright/test");
const helper = require("./helper");

describe("Blog app", () => {
    beforeEach(async ({ page, request }) => {
        await request.post("http://localhost:3003/api/testing");
        await request.post("http://localhost:3003/api/users", {
            data: {
                name: "Felix Kjellberg",
                username: "pewdiepie",
                password: "marziapie123",
            },
        });
    });

    test("shows login form by default", async ({ page }) => {
        await page.goto("http://localhost:5173");

        await expect(page.getByLabel("username")).toBeVisible();
        await expect(page.getByLabel("password")).toBeVisible();
    });

    describe("Login", () => {
        test("succeeds with correct credentials", async ({ page }) => {
            await page.goto("http://localhost:5173");
            await helper.loginWith(page, "pewdiepie", "marziapie123");

            await expect(
                page.getByText("Felix Kjellberg logged in")
            ).toBeVisible();
        });

        test("fails with wrong credentials", async ({ page }) => {
            await page.goto("http://localhost:5173");
            await helper.loginWith(page, "pewdiepie", "incorrectpassword");

            await expect(
                page.getByText("invalid username or password")
            ).toBeVisible();
        });
    });

    describe("When logged in", () => {
        beforeEach(async ({ page }) => {
            await page.goto("http://localhost:5173");
            await helper.loginWith(page, "pewdiepie", "marziapie123");
        });

        test("a new blog can be created and can be liked", async ({ page }) => {
            const blog = {
                title: "Our old man is old",
                author: "Felix Kjellberg",
                url: "youtube.com",
            };
            await helper.createBlog(page, blog);

            await expect(
                page.getByText("Our old man is old Felix Kjellberg")
            ).toBeVisible();
        });

        describe("Already has 1 blog", () => {
            beforeEach(async ({ page }) => {
                const blog = {
                    title: "Our old man is old",
                    author: "Felix Kjellberg",
                    url: "youtube.com",
                };
                await helper.createBlog(page, blog);
            });

            test("blog can be liked", async ({ page }) => {
                await page.getByRole("button", { name: "view" }).click();
                await page.getByRole("button", { name: "like" }).click();

                await expect(page.getByText("likes 1")).toBeVisible();
            });

            test("blog can be deleted", async ({ page }) => {
                await page.getByRole("button", { name: "view" }).click();
                page.on("dialog", async dialog => {
                    await dialog.accept();
                });
                await page.getByRole("button", { name: "remove" }).click();

                await expect(page.getByText("blog deleted")).toBeVisible();
            });
        });

        describe("Already has 3 blogs", () => {
            const blog = {
                title: "Our old man is old",
                author: "Felix Kjellberg",
                url: "youtube.com",
            };

            const blog2 = {
                title: "I Fixed Youtube!",
                author: "Felix Kjellberg",
                url: "youtube.com",
            };

            const blog3 = {
                title: "I Trained My Own AI",
                author: "Felix Kjellberg",
                url: "youtube.com",
            };

            test.beforeEach(async ({ page }, testInfo) => {
                testInfo.setTimeout(testInfo.timeout + 10000);

                await helper.createBlog(page, blog);
                await page.waitForTimeout(250);
                await helper.createBlog(page, blog2);
                await page.waitForTimeout(250);
                await helper.createBlog(page, blog3);
                await page.waitForTimeout(250);

                await helper.likeBlog(page, blog.title, "view");
                await helper.likeBlog(page, "likes", "like");
                await page.waitForTimeout(250);
                await helper.likeBlog(page, blog.title, "hide");

                await helper.likeBlog(page, blog2.title, "view");
                await page.waitForTimeout(100);
                await helper.likeBlog(page, "likes", "like");
                await page.waitForTimeout(250);
                await helper.likeBlog(page, blog2.title, "hide");
                await page.waitForTimeout(100);
                await helper.likeBlog(page, blog2.title, "view");
                await page.waitForTimeout(100);
                await helper.likeBlog(page, "likes", "like");
                await page.waitForTimeout(250);
                await helper.likeBlog(page, blog2.title, "hide");

                await helper.likeBlog(page, blog3.title, "view");
                await page.waitForTimeout(100);
                await helper.likeBlog(page, "likes", "like");
                await page.waitForTimeout(250);
                await helper.likeBlog(page, blog3.title, "hide");
                await page.waitForTimeout(100);
                await helper.likeBlog(page, blog3.title, "view");
                await page.waitForTimeout(100);
                await helper.likeBlog(page, "likes", "like");
                await page.waitForTimeout(250);
                await helper.likeBlog(page, blog3.title, "hide");
                await page.waitForTimeout(100);
                await helper.likeBlog(page, blog3.title, "view");
                await page.waitForTimeout(100);
                await helper.likeBlog(page, "likes", "like");
                await page.waitForTimeout(250);
                await helper.likeBlog(page, blog3.title, "hide");
                await page.waitForTimeout(250);
            });

            test("blogs are arranged in the order according to the likes", async ({
                page,
            }) => {
                const blogs = page.getByTestId("blog");

                await expect(blogs.nth(0)).toContainText(blog3.title);
                await expect(blogs.nth(1)).toContainText(blog2.title);
                await expect(blogs.nth(2)).toContainText(blog.title);
            });
        });
    });
});
