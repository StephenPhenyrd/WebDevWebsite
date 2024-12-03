import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  location: { type: String, required: true },
  barRating: { type: Number, required: true },
  drinkChoice: { type: String, required: true },
  drinkRating: { type: Number, required: true },
  review: { type: String, required: true },
});

export default mongoose.models.Review || mongoose.model("Review", ReviewSchema);