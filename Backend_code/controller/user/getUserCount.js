const User = require('../../models/userModel');

const getUserCount = async (req, res) => {
    try {
        const count = await User.countDocuments();
        console.log("Total Users Counted:", count); // Debug log
        res.json({ 
            success: true,
            error: false,
            data: count // Returning the count directly
        }); 
    }catch (error) {
        console.error("Error fetching user count:", error.message); // Error log
        res.status(500).json({ error: error.message });
    }
};

module.exports = getUserCount;