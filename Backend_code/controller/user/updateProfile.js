const userModel = require("../../models/userModel");
const bcrypt = require('bcryptjs');

async function updateUserController(req, res) {
    try {
        const { userId, name, email, profilePic, password } = req.body;

        const payload = {
            ...(name && { name }),
            ...(email && { email }),
            ...(profilePic && { profilePic })
        };

        // If password is provided, hash it before updating
        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            payload.password = hashedPassword;
        }

        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            payload,
            { new: true }
        );

        res.json({
            success: true,
            data: updatedUser,
            message: "User profile updated successfully"
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message || 'Error updating profile'
        });
    }
}

module.exports = updateUserController;
