const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

const users = [];

app.get("/", (req, res) => {
    res.send("Server is Running");
});

app.post("/signup", (req, res) => {
    const { username, email, password, dob } = req.body;

    if (!username) {
        return res.status(400).json({ error: "Username cannot be empty" });
    }
    if (!email) {
        return res.status(400).json({ error: "Email cannot be empty" });
    }
    if (!password || password.length < 8 || password.length > 16) {
        return res.status(400).json({ error: "Password length should be greater than 8 and less than or equal to 16" });
    }
    if (!dob) {
        return res.status(400).json({ error: "Date of birth cannot be empty" });
    }

    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).json({ error: "Email is already registered" });
    }

    const newUser = { username, email, password, dob };
    users.push(newUser);

    res.status(201).json({ message: "User signed up successfully", user: newUser });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
