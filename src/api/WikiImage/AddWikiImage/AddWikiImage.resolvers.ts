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
          const wikiImage = await WikiImage.create({
            ...args,
            user
          }).save();
          return {
            ok: true,
            error: null,
            wikiImageId: wikiImage.id
          };
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            wikiImageId: null
          };
        }
      }
    )
  }
};

export default resolvers;
