const User = require('../models/User');

// Create a new user 

exports.createUser =  async(req,res) => {
    try{
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get user

exports.getUser =  async(req,res) => {
    try{
        const user = await User.find(req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    
}

// Get all users

exports.getAllUsers = async(req,res) => {
    try{
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Update user

exports.updateUser = async (req, res) => {
    try {
        const { username } = req.body;

        // Check if username is being updated
        if (username) {
            // Look for another user with the same username
            const existingUser = await User.findOne({ username });

            // If another user has the same username, block the update
            if (existingUser && existingUser._id.toString() !== req.params.id) {
                return res.status(400).json({ message: "Username already taken" });
            }
        }

        // Proceed with the update
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Delete user

exports.deleteUser = async(req,res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
