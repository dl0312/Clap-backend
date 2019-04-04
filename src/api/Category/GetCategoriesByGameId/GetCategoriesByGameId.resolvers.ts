import { Resolvers } from "../../../types/resolvers";
import Category from "../../../entities/Category";

const resolvers: Resolvers = {
  Query: {
    GetCategoriesByGameId: async (_, args, { req }) => {
      try {
        const { gameId } = args;
        const categories = await Category.find({
          where: gameId,
          relations: ["parent", "children", "wikiImages"]
        });
        return {
          ok: true,
          error: null,
          categories
        };
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          categories: null
        };
      }
    }
  }
};

export default resolvers;
