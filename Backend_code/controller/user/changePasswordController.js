const userModel = require("../../models/userModel");
const bcrypt = require('bcryptjs');

async function changePasswordController(req, res) {
    try {
        const { email, newPassword } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        await user.save();

        res.json({ success: true, message: "Password changed successfully" });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message || 'Error changing password' });
    }
}

module.exports = changePasswordController;
