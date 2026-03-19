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
    if (blogs.length === 1) {
        return blogs[0];
    }

    if (blogs.length === 0) {
        return blogs;
    }

    const mostLikes = (greatest, blog) => {
        if (blog.likes > greatest.likes) {
            return blog;
        }

        return greatest;
    };

    return blogs.reduce(mostLikes, blogs[0]);
};

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
};
