import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import Category from "../../../entities/Category";
import { GetAllCategoriesResponse } from "../../../types/graph";

const resolvers: Resolvers = {
  Query: {
    GetAllCategories: privateResolver(
      async (_, __, { req }): Promise<GetAllCategoriesResponse> => {
        try {
          const categories = await Category.find({
            relations: ["parent", "children", "wikiImages"]
          });
          if (categories) {
            return {
              ok: true,
              error: null,
              categories
            };
          } else {
            return {
              ok: false,
              error: "have no category",
              categories: null
            };
          }
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            categories: null
          };
        }
      }
    )
  }
};

export default resolvers;
