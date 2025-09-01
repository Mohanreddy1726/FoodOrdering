import userModel from '../models/userModel.js';

// Add items to useer cart
const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1; // Add item with quantity 1
        } else {
            cartData[req.body.itemId] += 1; // Increment quantity if item already exists
        }
        await userModel.findByIdAndUpdate(
            req.body.userId,
            {cartData},
        );
        return res.json({ success: true, message: "Item added to cart successfully" });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Internal server error" });
    }
}

// removed items from user cart
const removeFromCart = async (req, res) => {
    try {
        const userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if (cartData[req.body.itemId]>0) {
            cartData[req.body.itemId] -= 1; // Decrement quantity
        }
        await userModel.findByIdAndUpdate(
            req.body.userId,
            {cartData},
        );
        return res.json({ success: true, message: "Item removed from cart successfully" });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Internal server error" });
        
    }
}

// Get user cart
const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({ success: true, cartData });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Internal server error" });
    }
}

export {addToCart, removeFromCart, getCart};