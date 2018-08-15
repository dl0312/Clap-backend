import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import User from "../../../entities/User";
import WikiImage from "../../../entities/WikiImage";

const resolvers: Resolvers = {
  Mutation: {
    DeleteWikiImage: privateResolver(async (_, args, { req }) => {
      const user: User = req.user;
      try {
        const wikiImage = await WikiImage.findOne({ id: args.wikiImageId });
        if (wikiImage) {
          if (wikiImage.userId === user.id) {
            wikiImage.remove();
            return {
              ok: true,
              error: null
            };
          } else {
            return {
              ok: false,
              error: "Not Authorized"
            };
          }
        } else {
          return { ok: false, error: "Have no WikiImage with this ID" };
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message
        };
      }
    })
  }
};

export default resolvers;
