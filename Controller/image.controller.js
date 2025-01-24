import TemplateModel from "../Models/template.model.js";

export const imageUpload = async (req, res) => {
  const { _id } = req.params;
  const { content } = req.body;

  try {
    if (!content) {
      return res.status(400).json({ error: "No content uploaded" });
    }

    const template = await TemplateModel.findOne();
    const item = template.items.find((item) => item._id.toString() === _id);

    if (!item) {
      return res.status(400).json({ error: "No item found" });
    }

    if (item.type === "image") {
      item.content = content;
      await template.save();
    }

    const newTemplate = await TemplateModel.findOne();
    console.log(newTemplate);
    res.status(200).json(newTemplate);
  } catch (error) {
    console.error("Error during image upload:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const imagerSize = async (req, res) => {
  const { _id } = req.params;
  const { width, height } = req.body;

  if (!width && !height) {
    return res
      .status(400)
      .json({ error: "Please provide at least one of width or height" });
  }

  try {
    const template = await TemplateModel.findOne();

    if (!template) {
      return res.status(404).json({ error: "Template not found" });
    }

    const item = template.items.find((item) => item._id.toString() === _id);

    if (!item) {
      return res.status(400).json({ error: "No item found" });
    }

    if (item.type === "image") {
      if (width) {
        item.style.width = width;
      }

      if (height) {
        item.style.height = height;
      }

      template.markModified("items");
    }

    await template.save();

    const newTemplate = await TemplateModel.findOne();
    return res.status(200).json(newTemplate);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal server error" }, error.message);
  }
};
