const dummy = blogs => {
    return 1;
};

const totalLikes = blogs => {
    if (blogs.length === 1) {
        return blogs[0].likes;
    }

    if (blogs.length === 0) {
        return 0;
    }

    const sum = (total, blog) => {
        return total + blog.likes;
    };

    return blogs.reduce(sum, 0);
};

const favoriteBlog = blogs => {
    if (blogs.length === 0) {
        return null;
    }

    if (blogs.length === 1) {
        return blogs[0];
    }

    const mostLikes = (greatest, blog) => {
        if (blog.likes > greatest.likes) {
            return blog;
        }

        return greatest;
    };

    return blogs.reduce(mostLikes, blogs[0]);
};

const mostBlogs = blogs => {
    if (blogs.length === 0) {
        return null;
    }

    if (blogs.length === 1) {
        return { author: blogs[0].author, blogs: 1 };
    }

    const countBlogs = (blogs, currentBlog) => {
        const index = blogs.findIndex(
            blog => blog.author === currentBlog.author
        );

        if (index === -1) {
            return blogs.concat({ author: currentBlog.author, blogs: 1 });
        }

        const copy = blogs[index];
        copy.blogs += 1;

        return blogs.toSpliced(index, 1, copy);
    };

    const findMax = (greatest, current) => {
        if (current.blogs > greatest.blogs) {
            return current;
        }

        return greatest;
    };

    const blogsList = blogs.reduce(countBlogs, []);

    return blogsList.reduce(findMax, blogsList[0]);
};

const mostLikes = blogs => {
    if (blogs.length === 0) {
        return null;
    }

    if (blogs.length === 1) {
        return { author: blogs[0].author, likes: blogs[0].likes };
    }

    const countLikes = (blogs, currentBlog) => {
        const index = blogs.findIndex(
            blog => blog.author === currentBlog.author
        );

        if (index === -1) {
            return blogs.concat({
                author: currentBlog.author,
                likes: currentBlog.likes,
            });
        }

        const copy = blogs[index];
        copy.likes += currentBlog.likes;

        return blogs.toSpliced(index, 1, copy);
    };

    const findMax = (greatest, current) => {
        if (current.likes > greatest.likes) {
            return current;
        }

        return greatest;
    };

    const blogsList = blogs.reduce(countLikes, []);

    return blogsList.reduce(findMax, blogsList[0]);
};

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
};
