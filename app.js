import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
app.use(express.json({ limit: "1mb" }));
app.use(cors());

const porta = process.env.PORT || 3001;

app.listen(porta, () => {
    console.log('Server running on port: ' + porta);
});

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.post("/v1/predictions", async (request, response) => {
    const data = request.body.prompt;
    const PostData = {
        "version": "601eea49d49003e6ea75a11527209c4f510a93e2112c969d548fbb45b9c4f19f",
        "input": { "prompt": data }
    };

    const options = {
        method: 'POST',
        headers: {
            "Content-type": "application/json",
            "authorization": `Token r8_GJKheYikE5VlZAkqf5n4X4ps2Gm5HWB18XFgP`
        },
        body: JSON.stringify(PostData)
    };

    try {
        const rec = await fetch('https://api.replicate.com/v1/predictions', options);

        if (rec.status !== 201) {
            let error = await rec.json();
            response.statusCode = 500;
            response.end(JSON.stringify({ detail: error.detail }));
            return;
        }

        const prediction = await rec.json();
        response.statusCode = 201;
        response.end(JSON.stringify(prediction));
    } catch (error) {
        console.error("Error:", error);
        response.statusCode = 500;
        response.end(JSON.stringify({ detail: "Internal server error" }));
    }
});

app.get("/v1/predictions/:id", async (request, response) => {
    const photoID = request.params.id;

    try {
        const res = await fetch(
            "https://api.replicate.com/v1/predictions/" + photoID,
            {
                headers: {
                    Authorization: `Token r8_GJKheYikE5VlZAkqf5n4X4ps2Gm5HWB18XFgP`,
                    "Content-Type": "application/json",
                },
            }
        );

        if (res.status !== 200) {
            let error = await res.json();
            response.statusCode = 500;
            response.end(JSON.stringify({ detail: error.detail }));
            return;
        }

        const prediction = await res.json();
        response.end(JSON.stringify(prediction));
    } catch (error) {
        console.error("Error:", error);
        response.statusCode = 500;
        response.end(JSON.stringify({ detail: "Internal server error" }));
    }
});
