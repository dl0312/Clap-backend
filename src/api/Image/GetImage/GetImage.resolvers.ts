import { Resolvers } from "../../../types/resolvers";
import { createReadStream } from "fs";

const resolvers: Resolvers = {
  Query: {
    GetImage: async (parent, { path }) => {
      const image = createReadStream(path);
      console.log(image);
      return { ok: true, error: null, image };
    }
  }
};

export default resolvers;
