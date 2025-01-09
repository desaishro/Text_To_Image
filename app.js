const express = require('express');
const fetch = require('node-fetch'); // Use require for compatibility

const app = express();
const port = 3000;

// Serve static files
app.use(express.static('public'));

// Route to generate image
app.get('/generate-image', async (req, res) => {
    const { text } = req.query;

    if (!text) {
        return res.status(400).json({ error: "Text parameter is required." });
    }

    try {
        const apiUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(text)}`;
        const response = await fetch(apiUrl);
        const imageUrl = response.url;

        // Return the generated image URL
        res.json({ imageUrl });
    } catch (error) {
        console.error("Error generating image:", error);
        res.status(500).json({ error: "Failed to generate image. Please try again." });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
