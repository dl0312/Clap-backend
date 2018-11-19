import { Resolvers } from "../../../types/resolvers";
import Category from "../../../entities/Category";
import { In } from "../../../../node_modules/typeorm";
import {
  GetCategoriesByIdsQueryArgs,
  GetCategoriesByIdsResponse
} from "../../../types/graph";

const resolvers: Resolvers = {
  Query: {
    GetCategoriesByIds: async (
      _,
      args: GetCategoriesByIdsQueryArgs,
      { req }
    ): Promise<GetCategoriesByIdsResponse> => {
      const { categoriesIds } = args;
      try {
        if (categoriesIds.length === 0) {
          return {
            ok: true,
            error: null,
            categories: []
          };
        }
        const categories = await Category.find({
          where: { id: In(categoriesIds) }
          ,relations: ["parent","children","children.wikiImages","wikiImages"]
        },);
        if (categories) {
          return {
            ok: true,
            error: null,
            categories
          };
        } else {
          return {
            ok: false,
            error: "Have no category with this IDs",
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
  }
};

export default resolvers;
