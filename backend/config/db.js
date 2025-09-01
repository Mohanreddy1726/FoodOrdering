import mongoose from 'mongoose';
export const connectDB = async () => {
    await mongoose.connect ('mongodb+srv://mohananika123:Anika123@cluster0.0ckbv6x.mongodb.net/food-del').then(()=> {
        console.log("DB Connected")
    })
}
