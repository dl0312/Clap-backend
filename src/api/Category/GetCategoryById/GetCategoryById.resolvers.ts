import { Resolvers } from "../../../types/resolvers";
import {
  GetCategoryByIdQueryArgs,
  GetCategoryByIdResponse
} from "../../../types/graph";
import Category from "../../../entities/Category";

const resolvers: Resolvers = {
  Query: {
    GetCategoryById: async (
      _,
      args: GetCategoryByIdQueryArgs,
      { req }
    ): Promise<GetCategoryByIdResponse> => {
      const { categoryId } = args;
      try {
        const category = await Category.findOne(
          { id: categoryId },
          {
            relations: [
              "parent",
              "parent.wikiImages",
              "children",
              "children.wikiImages",
              "wikiImages",
            ]
          }
        );
        if (category) {
          return {
            ok: true,
            error: null,
            category
          };
        } else {
          return {
            ok: false,
            error: "Have no category with this ID",
            category: null
          };
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          category: null
        };
      }
    }
  }
};

export default resolvers;
