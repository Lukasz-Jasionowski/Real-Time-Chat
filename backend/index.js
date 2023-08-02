import "dotenv/config";
import express from "express";
import cors from "cors";
import fetch from "isomorphic-unfetch";

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post("/authenticate", async (req, res) => {
    const { username } = req.body;

    try {
        const resp = await fetch("https://api.chatengine.io/users/", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "private-key": process.env.API_KEY,
            },
            body: JSON.stringify({
                username: username,
                secret: username,
                first_name: username,
            }),
        });
        const data = await resp.json();
        return res.status(resp.status).json(data);
    } catch (error) {
        return res.status(error.status || 500).json(error.message || "Something went wrong");
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
