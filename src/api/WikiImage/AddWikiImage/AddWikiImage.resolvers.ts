import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import User from "../../../entities/User";
import WikiImage from "../../../entities/WikiImage";
import {
  AddWikiImageResponse,
  AddWikiImageMutationArgs
} from "../../../types/graph";

const resolvers: Resolvers = {
  Mutation: {
    AddWikiImage: privateResolver(
      async (
        _,
        args: AddWikiImageMutationArgs,
        { req }
      ): Promise<AddWikiImageResponse> => {
        const user: User = req.user;
        try {
          await WikiImage.create({
            ...args,
            user
          }).save();
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
