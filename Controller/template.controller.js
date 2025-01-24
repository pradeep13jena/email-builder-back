import TemplateModel from "../Models/template.model.js";

export const getTemplate = async (req, res) => {
  try {
    const template = await TemplateModel.findOne();

    if (!template) {
      return res.status(404).send("Template not found");
    }

    res.status(200).json(template);
  } catch (error) {
    console.error("Error fetching template:", error);
    res.status(500).send("Error loading template");
  }
};

export const addITem = async (req, res) => {
  const { type, content, style } = req.body;

  try {
    const template = await TemplateModel.findOne();

    if (!template) {
      return res.status(404).send("Template not found");
    }

    const newItem = { type, content, style };
    template.items.push(newItem);

    await template.save();

    const newTemplate = await TemplateModel.findOne();
    res.status(200).json(newTemplate);
  } catch (error) {
    res.status(500).send("Error adding item", error);
  }
};

export const deleteItem = async (req, res) => {
  const { _id } = req.body;

  try {
    const template = await TemplateModel.findOne();

    if (!template) {
      return res.status(404).send("Template not found");
    }

    template.items = template.items.filter(
      (item) => item._id.toString() !== _id.toString()
    );
    await template.save();

    const newTemplate = await TemplateModel.findOne();
    res.status(200).json(newTemplate);
  } catch (err) {
    res.status(500).send("Error deleting item", err);
  }
};

export const moveUp = async (req, res) => {
  const { _id } = req.body;

  try {
    const template = await TemplateModel.findOne();

    if (!template) {
      return res.status(404).send("Template not found");
    }

    const index = template.items.findIndex(
      (item) => item._id.toString() === _id
    );

    if (index === -1) {
      return res.status(404).send("Item not found");
    }

    if (index === 0) {
      return res.status(400).send("Item is already at the top");
    }

    const temp = template.items[index - 1];
    template.items[index - 1] = template.items[index];
    template.items[index] = temp;

    await template.save();

    const updatedTemplate = await TemplateModel.find();
    res.status(200).json(updatedTemplate[0]);
  } catch (err) {
    res.status(500).send("Error moving item", err);
  }
};

export const moveDown = async (req, res) => {
  const { _id } = req.body;

  try {
    const template = await TemplateModel.findOne();

    if (!template) {
      return res.status(404).send("Template not found");
    }

    const index = template.items.findIndex(
      (item) => item._id.toString() === _id
    );

    if (index === -1) {
      return res.status(404).send("Item not found");
    }

    if (index === template.items.length - 1) {
      return res.status(400).send("Item is already at the bottom");
    }

    const temp = template.items[index + 1];
    template.items[index + 1] = template.items[index];
    template.items[index] = temp;

    await template.save();

    const updatedTemplate = await TemplateModel.find();
    res.status(200).json(updatedTemplate[0]);
  } catch (err) {
    res.status(500).send("Error moving item", err);
  }
};

export const editTextStyle = async (req, res) => {
  const { _id } = req.params;
  const newStyles = req.body;

  try {
    const template = await TemplateModel.findOne();

    if (!template) {
      return res.status(404).json({ message: "Template not found" });
    }

    const item = template.items.find((item) => item._id.toString() === _id);

    if (!item) {
      return res.status(404).json({ message: "Item not found in template" });
    }

    if (item.type === "text") {
      for (const key in newStyles) {
        if (item.style[key] === newStyles[key]) {
          delete item.style[key];
        } else {
          // Otherwise, update/add the new property
          item.style[key] = newStyles[key];
        }
      }
    }

    // console.log(item)
    await template.save();

    const newTemplate = await TemplateModel.findOne();
    res.status(200).json(newTemplate);
  } catch (err) {
    console.error("Error updating styles:", err);
    res
      .status(500)
      .json({ message: "Error updating styles", error: err.message });
  }
};

export const changeText = async (req, res) => {
  const { _id } = req.params;
  const { text } = req.body;

  try {
    const template = await TemplateModel.findOne();

    if (!template) {
      return res.status(404).json({ message: "Template not found" });
    }

    const item = template.items.find((item) => item._id.toString() === _id);

    if (!item) {
      return res.status(404).json({ message: "Item not found in template" });
    }

    if (item.type === "text" || item.type === "button") {
      item.content = text;
      await template.save();
    }

    const newTemplate = await TemplateModel.findOne();
    res.status(200).json(newTemplate);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating text", error: error.message });
  }
};

export const addLink = async (req, res) => {
  const { _id } = req.params;
  const { link } = req.body;

  console.log(_id, link);
  try {
    const template = await TemplateModel.findOne();

    if (!template) {
      return res.status(404).json({ message: "Template not found" });
    }

    const item = template.items.find((item) => item._id.toString() === _id);

    if (!item) {
      return res.status(404).json({ message: "Item not found in template" });
    }

    item.link = link;

    await template.save();

    const newTemplate = await TemplateModel.findOne();
    res.status(200).json(newTemplate);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding link", error: error.message });
  }
};
