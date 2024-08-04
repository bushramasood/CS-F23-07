const UserModel = require('../../models/userModel');

const userProfile = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.json({
            success: true,
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                profilePic: user.profilePic || 'No profile picture',
                role: user.role,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message || 'Error fetching user profile' });
    }
};

module.exports = userProfile;
