const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
    const response = await fetch(baseUrl);

    if (!response.ok) {
        throw new Error("Failed to fetch anecdotes");
    }

    const data = await response.json();
    return data;
};

const createAnecdote = async anecdote => {
    const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: anecdote, votes: 0 }),
    };

    const response = await fetch(baseUrl, options);

    if (!response.ok) {
        throw new Error("Failed to create anecdote");
    }

    return response.json();
};

const increaseVote = async anecdote => {
    const options = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ votes: anecdote.votes + 1 }),
    };

    const response = await fetch(`${baseUrl}/${anecdote.id}`, options);

    if (!response.ok) {
        throw new Error("Failed to increase vote");
    }

    return response.json();
};

export default { getAll, createAnecdote, increaseVote };
