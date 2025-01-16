import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  title: String,
  path: String, 
  description: String,
  
});

const Image = mongoose.model('Image', imageSchema);

export default Image;
