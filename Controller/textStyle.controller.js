import TemplateModel from "../Models/template.model.js";

export const chaneFontSize = async (req, res) => {
  const { _id } = req.params;
  const newFont = req.body;

  try {
    const template = await TemplateModel.findOne();

    if (!template) {
      return res.staus(404).send("Template not found");
    }

    const item = template.items.find((item) => item._id.toString() === _id);

    if (!item) {
      return res.staus(404).send("Item not found");
    }

    item.style = { ...item.style, ...newFont };

    await template.save();

    const newTemplate = await TemplateModel.findOne();
    res.status(200).json(newTemplate);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating font", error: error.message });
  }
};

export const textAlign = async (req, res) => {
  const { _id } = req.params;
  const newAlignment = req.body;

  try {
    const template = await TemplateModel.findOne();

    if (!template) {
      return res.staus(404).send("Template not found");
    }

    const item = template.items.find((item) => item._id.toString() === _id);

    if (!item) {
      return res.status(404).send("Item not found");
    }

    item.style = { ...item.style, ...newAlignment };

    await template.save();

    const newTemplate = await TemplateModel.findOne();
    res.status(200).json(newTemplate);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating font", error: error.message });
  }
};

export const changeColor = async (req, res) => {
  const { _id } = req.params;
  const newColor = req.body;

  try {
    const template = await TemplateModel.findOne();

    if (!template) {
      return res.staus(404).send("Template not found");
    }

    const item = template.items.find((item) => item._id.toString() === _id);

    if (!item) {
      return res.status(404).send("Item not found");
    }

    if (item.type === "text") {
      console.log(item.type);
      item.style = { ...item.style, ...newColor };
      await template.save();
    }

    const newTemplate = await TemplateModel.findOne();
    res.status(200).json(newTemplate);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating font", error: error.message });
  }
};

export const makeItalic = async (req, res) => {
  const { _id } = req.params;

  try {
    const template = await TemplateModel.findOne();

    if (!template) {
      return res.staus(404).send("Template not found");
    }

    const item = template.items.find((item) => item._id.toString() === _id);

    if (!item) {
      return res.status(404).send("Item not found");
    }

    if (item.type === "text" || item.type === "button") {
      const currentFontStyle = item.style.fontStyle;
      const newFontStyle = currentFontStyle === "italic" ? "normal" : "italic";

      item.style = { ...item.style, fontStyle: newFontStyle };
      await template.save();
    }

    const newTemplate = await TemplateModel.findOne();
    res.status(200).json(newTemplate);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating font", error: error.message });
  }
};

export const makeBold = async (req, res) => {
  const { _id } = req.params;

  try {
    const template = await TemplateModel.findOne();

    if (!template) {
      return res.staus(404).send("Template not found");
    }

    const item = template.items.find((item) => item._id.toString() === _id);

    if (!item) {
      return res.status(404).send("Item not found");
    }

    if (item.type === "text" || item.type === "button") {
      const currentFontWeight = item.style.fontWeight;
      const newFontWeight = currentFontWeight === "bold" ? "normal" : "bold";

      item.style = { ...item.style, fontWeight: newFontWeight };
      await template.save();
    }

    const newTemplate = await TemplateModel.findOne();
    res.status(200).json(newTemplate);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating font", error: error.message });
  }
};

export const makeUnderline = async (req, res) => {
  const { _id } = req.params;

  try {
    const template = await TemplateModel.findOne();

    if (!template) {
      return res.staus(404).send("Template not found");
    }

    const item = template.items.find((item) => item._id.toString() === _id);

    if (!item) {
      return res.status(404).send("Item not found");
    }

    if (item.type === "text" || item.type === "button") {
      const currentTextDeco = item.style.textDecoration;
      const newTextDeco =
        currentTextDeco === "underline" ? "none" : "underline";

      item.style = { ...item.style, textDecoration: newTextDeco };
      await template.save();
    }

    const newTemplate = await TemplateModel.findOne();
    res.status(200).json(newTemplate);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating font", error: error.message });
  }
};
