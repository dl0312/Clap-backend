import { Resolvers } from "../../../types/resolvers";
import User from "../../../entities/User";
import privateResolver from "../../../utils/privateResolver";
import WikiImage from "../../../entities/WikiImage";
import cleanNullArgs from "../../../utils/cleanNullArg";

const resolvers: Resolvers = {
  Mutation: {
    EditWikiImage: privateResolver(async (_, args, { req }) => {
      const user: User = req.user;
      try {
        const wikiImage: WikiImage | undefined = await WikiImage.findOne({
          id: args.wikiImageId
        });
        if (wikiImage) {
          if (wikiImage.userId === user.id) {
            const notNull = cleanNullArgs(args);
            await WikiImage.update({ id: args.wikiImageId }, { ...notNull });
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
          return {
            ok: false,
            error: "Have no WikiImage with this ID"
          };
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
