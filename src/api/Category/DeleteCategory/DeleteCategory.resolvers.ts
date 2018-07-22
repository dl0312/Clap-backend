import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import {
  EditCategoryMutationArgs,
  EditCategoryResponse
} from "../../../types/graph";
import Category from "../../../entities/Category";

const resolvers: Resolvers = {
  Mutation: {
    DeleteCategory: privateResolver(
      async (
        _,
        args: EditCategoryMutationArgs,
        { req }
      ): Promise<EditCategoryResponse> => {
        const { categoryId } = args;
        try {
          const category = await Category.findOne({ id: categoryId });
          if (category) {
            category.remove();
            return {
              ok: true,
              error: null
            };
          }
          return {
            ok: false,
            error: "Has no category with this ID"
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
