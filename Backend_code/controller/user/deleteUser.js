const userModel = require("../../models/userModel")


// Function to delete a user by ID
async function deleteUser(req, res) {
    try {
        const user = await userModel.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
                error: true
            });
        }

        res.json({
            message: "User deleted successfully",
            success: true,
            error: false
        });
    } catch (err) {
        res.status(500).json({
            message: err.message || "Server error",
            error: true,
            success: false
        });
    }
}
module.exports = deleteUser