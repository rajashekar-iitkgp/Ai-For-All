const router = require('express').Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');
const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 300 }); // Cache for 5 minutes

// Initial Blog Data
const initialBlogs = [
    {
        title: "GPT-3 and Open AI is the future. Let us exlore how it is?",
        content: "GPT-3 is a cutting-edge language model that uses deep learning to produce human-like text. It has a wide range of applications from translation to content generation.",
        image_url: "blog01"
    },
    {
        title: "The Impact of AI on Modern Education",
        content: "Artificial Intelligence is reshaping how we learn and teach. From personalized learning paths to automated grading, the possibilities are endless.",
        image_url: "blog02"
    },
    {
        title: "Understanding Neural Networks",
        content: "Neural networks are the backbone of modern AI. Inspired by the human brain, they enable computers to learn from data patterns.",
        image_url: "blog03"
    },
    {
        title: "Ethics in AI Development",
        content: "As AI becomes more powerful, ethical considerations are paramount. We must ensure AI is developed responsibly and without bias.",
        image_url: "blog04"
    },
    {
        title: "Future of Robotics and AI",
        content: "When robotics meets AI, we get autonomous machines capable of performing complex tasks. The future holds exciting developments in this field.",
        image_url: "blog05"
    }
];

// Seed Blogs if empty
const seedBlogs = async () => {
    try {
        const check = await pool.query("SELECT * FROM blogs");
        if (check.rows.length === 0) {
            for (let blog of initialBlogs) {
                await pool.query(
                    "INSERT INTO blogs (title, content, image_url) VALUES ($1, $2, $3)",
                    [blog.title, blog.content, blog.image_url]
                );
            }
            console.log("Seeded initial blogs");
        }
    } catch (err) {
        console.error("Error seeding blogs", err);
    }
};

seedBlogs();

// GET All Blogs (Protected)
router.get('/', authorization, async (req, res) => {
    try {
        // Check Cache
        const cachedBlogs = cache.get("allBlogs");
        if (cachedBlogs) {
            return res.json(cachedBlogs);
        }

        const allBlogs = await pool.query("SELECT * FROM blogs ORDER BY blog_id ASC");

        // Set Cache
        cache.set("allBlogs", allBlogs.rows);

        res.json(allBlogs.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// GET Single Blog (Protected)
router.get('/:id', authorization, async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await pool.query("SELECT * FROM blogs WHERE blog_id = $1", [id]);

        if (blog.rows.length === 0) {
            return res.status(404).json("Blog not found");
        }

        res.json(blog.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Update Blog (Admin Only)
router.put('/:id', authorization, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const userId = req.user;

        // Check if user is admin
        const user = await pool.query("SELECT role FROM users WHERE user_id = $1", [userId]);

        if (user.rows[0].role !== 'admin') {
            return res.status(403).json("Not Authorized");
        }

        const updateBlog = await pool.query(
            "UPDATE blogs SET title = $1, content = $2 WHERE blog_id = $3 RETURNING *",
            [title, content, id]
        );

        // Invalidate Cache
        cache.del("allBlogs");
        if (cache.get(`blog_${id}`)) cache.del(`blog_${id}`); // If we cached single blogs too

        res.json(updateBlog.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
