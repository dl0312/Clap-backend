import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { AddImageMutationArgs, AddImageResponse } from "../../../types/graph";
import Image from "../../../entities/Image";

const resolvers: Resolvers = {
  Mutation: {
    AddImage: privateResolver(
      async (
        _,
        args: AddImageMutationArgs,
        { req }
      ): Promise<AddImageResponse> => {
        try {
          await Image.create({ ...args }).save();
          return {
            ok: true,
            error: null
          };
        } catch (error) {
          return {
            ok: false,
            error: error.message
          };
        }
      }
    )
  }
};

export default resolvers;
