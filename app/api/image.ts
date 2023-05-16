import formidable from "formidable";
import { NextApiHandler, NextApiRequest } from "next";
import path from "path";
import fs from "fs/promises";

export const config = {
  api: {
    bodyParser: false,
  },
};

const readFile = (
  req: NextApiRequest,
  saveLocally?: boolean
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  const options: formidable.Options = {};
  if (saveLocally) {
    options.uploadDir = path.join(process.cwd(), "/public/images/postPhotos");
    options.filename = (name, ext, path, form) => {
      return Date.now().toString() + "_" + path.originalFilename;
      // return path.originalFilename;
    };
  }
  const form = formidable(options);
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};
const handler: NextApiHandler = async (req, res) => {
  try {
    await fs.readdir(
      path.join(process.cwd() + "/public", "/images", "/postPhotos")
    );
  } catch (error) {
    await fs.mkdir(
      path.join(process.cwd() + "/public", "/images", "/postPhotos")
    );
  }
  await readFile(req, true);
  res.json({ done: "ok" });
  //   const form = formidable({});
  //   form.parse(req, (err, fields, files) => {});
};

export default handler;
