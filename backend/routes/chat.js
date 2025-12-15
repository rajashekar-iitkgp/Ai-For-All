const router = require('express').Router();

router.post('/', (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ reply: "Please say something!" });
        }

        const lowerMsg = message.toLowerCase();
        let reply = "I'm not sure how to answer that. Try asking about 'features', 'gpt3', or say 'hello'!";

        // Rules
        if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('hey')) {
            reply = "Hello there! Welcome to Ai-For-All. How can I help you today?";
        } else if (lowerMsg.includes('name') || lowerMsg.includes('who are you')) {
            reply = "I am the Ai-For-All Assistant. I'm here to guide you through our website.";
        } else if (lowerMsg.includes('gpt3') || lowerMsg.includes('openai')) {
            reply = "GPT-3 is a powerful AI model by OpenAI. Our website explores its potential and applications.";
        } else if (lowerMsg.includes('feature') || lowerMsg.includes('do')) {
            reply = "We offer insights into AI Case Studies, a Library of information, and a blog about the future of AI.";
        } else if (lowerMsg.includes('sign up') || lowerMsg.includes('register') || lowerMsg.includes('login')) {
            reply = "You can sign up or login using the buttons in the top right corner of the page.";
        } else if (lowerMsg.includes('price') || lowerMsg.includes('cost') || lowerMsg.includes('free')) {
            reply = "Currently, all resources on Data-For-All are completely free to access!";
        } else if (lowerMsg.includes('bye') || lowerMsg.includes('goodbye')) {
            reply = "Goodbye! Have a wonderful day exploring AI.";
        }

        res.json({ reply });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
