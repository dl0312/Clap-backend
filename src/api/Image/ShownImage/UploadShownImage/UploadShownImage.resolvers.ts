import { Resolvers } from "../../../../types/resolvers";
import { createWriteStream } from "fs";
import uuid from "uuid";
import ShownImage from "../../../../entities/ShownImage";
import privateResolver from "../../../../utils/privateResolver";
import User from "../../../../entities/User";
const imgDir = "./public/uploads";

const storeUpload = ({ stream, id, path }) =>
  new Promise((resolve, reject) => {
    stream
      .pipe(createWriteStream(path))
      .on("finish", () => resolve({ id, path }))
      .on("error", reject);
  });

const resolvers: Resolvers = {
  Mutation: {
    UploadShownImage: privateResolver(async (parent, { file }, { req }) => {
      const user: User = req.user;
      console.log(file);
      const { stream } = await file;
      // const stream = createReadStream;
      const id = uuid.v4();
      const newFileName = `${id}`;
      const path = `${imgDir}/${newFileName}`;
      await storeUpload({ stream, id, path });
      const shownImage = await ShownImage.create({
        url: newFileName,
        userId: user.id
      }).save();
      console.log(shownImage);
      return { ok: true, error: null, shownImage };
    })
  }
};

export default resolvers;
