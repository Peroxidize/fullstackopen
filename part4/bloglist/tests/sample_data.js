const listWithOneBlog = [
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
        likes: 5,
        __v: 0,
    },
];

const blogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0,
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0,
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0,
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0,
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0,
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0,
    },
];

const users = [
    {
        _id: "650b0000a1b2c300d4e50001",
        username: "sam",
        passwordHash: "$2b$10$examplehashsam0000000000000000000000",
        name: "Sam Rivera",
        blogs: [],
    },
    {
        _id: "650b0000a1b2c300d4e50002",
        username: "mira",
        passwordHash: "$2b$10$examplehashmira000000000000000000000",
        name: "Mira Chen",
        blogs: [],
    },
    {
        _id: "650b0000a1b2c300d4e50003",
        username: "tony",
        passwordHash: "$2b$10$examplehashtony000000000000000000000",
        name: "Tony Alvarez",
        blogs: [],
    },
];

const blogs_new = [
    {
        _id: "650b0000a1b2c300d4e50101",
        title: "Intro to Functional Programming",
        author: "Jordan Lee",
        url: "https://example.org/functional-programming",
        likes: 128,
        user: null,
    },
    {
        _id: "650b0000a1b2c300d4e50102",
        title: "Scaling PostgreSQL for Analytics",
        author: "Dana Park",
        url: "https://example.org/scaling-postgres",
        likes: 64,
        user: null,
    },
    {
        _id: "650b0000a1b2c300d4e50103",
        title: "Design Systems: Principles and Trade-offs",
        author: "Alex Morgan",
        url: "https://example.org/design-systems",
        likes: 21,
        user: null,
    },
    {
        _id: "650b0000a1b2c300d4e50104",
        title: "Beginner's Guide to Web Accessibility",
        author: "Priya Nair",
        url: "https://example.org/web-accessibility",
        likes: 9,
        user: null,
    },
];

module.exports = {
    listWithOneBlog,
    blogs,
    users,
    blogs_new,
};
