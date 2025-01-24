import { imagerSize, imageUpload } from "../Controller/image.controller.js";
import {
  getTemplate,
  addITem,
  deleteItem,
  moveUp,
  moveDown,
  editTextStyle,
  changeText,
  addLink,
} from "../Controller/template.controller.js";
import {
  chaneFontSize,
  changeColor,
  makeBold,
  makeItalic,
  makeUnderline,
  textAlign,
} from "../Controller/textStyle.controller.js";

export const template = (app) => {
  app.get("/template", getTemplate), app.post("/template/add", addITem);
  app.delete("/template/delete", deleteItem);
  app.put("/template/moveup", moveUp);
  app.put("/template/movedown", moveDown);
  app.put("/template/updateStyle/:_id", editTextStyle);
  app.put("/template/edittext/:_id", changeText);
  app.put("/template/addlink/:_id", addLink);
  app.put("/template/fontSize/:_id", chaneFontSize);
  app.put("/template/textalign/:_id", textAlign);
  app.put("/template/changecolor/:_id", changeColor);
  app.put("/template/italic/:_id", makeItalic);
  app.put("/template/bold/:_id", makeBold);
  app.put("/template/underline/:_id", makeUnderline);
  app.put("/template/image/:_id", imageUpload);
  app.put("/template/resize/:_id", imagerSize);
};
