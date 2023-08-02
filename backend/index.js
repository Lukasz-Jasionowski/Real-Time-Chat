require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { default: axios } = require("axios");

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post("/authenticate", async (req, res) => {
    const { username } = req.body;

    try {
        const resp = await axios.put("https://api.chatengine.io/users/",
            { username: username, secret: username, first_name: username },
            { headers: { "private-key": process.env.API_KEY } }
        );
        return res.status(resp.status).json(resp.data);
    } catch (error) {
        return res.status(error.response.status).json(error.response.data)
    };

    return res.json({ username: username, secret: "sha256..." });
});
app.listen(process.env.PORT || 3001) ;