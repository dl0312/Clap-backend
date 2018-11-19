import { Resolvers } from "../../../../types/resolvers";
// import { GraphQLUpload } from "apollo-upload-server";
import { createWriteStream } from "fs";
import uuid from "uuid";
import PostImage from "../../../../entities/PostImage";
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
    UploadPostImage: privateResolver(async (parent, { file }, { req }) => {
      const user: User = req.user;
      const { stream } = await file;
      const id = uuid.v4();
      const newFileName = `${id}`;
      const path = `${imgDir}/${newFileName}`;
      await storeUpload({ stream, id, path });
      await PostImage.create({ url: newFileName, userId: user.id });
      return { ok: true, error: null };
    })
  }
};

export default resolvers;
