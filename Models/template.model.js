import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  type: { type: String, required: true },
  content: { type: String, required: true },
  style: { type: Object, required: true },
  position: { type: Object, required: false },
  link: { type: String, required: false },
});

const templateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  items: [itemSchema],
});

const TemplateModel = mongoose.model("Template", templateSchema);
export default TemplateModel;
