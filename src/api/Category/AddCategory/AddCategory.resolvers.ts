import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import Category from "../../../entities/Category";
import {
  AddCategoryMutationArgs,
  AddCategoryResponse
} from "../../../types/graph";
import { In } from "../../../../node_modules/typeorm";

const resolvers: Resolvers = {
  Mutation: {
    AddCategory: privateResolver(
      async (
        _,
        args: AddCategoryMutationArgs,
        { req }
      ): Promise<AddCategoryResponse> => {
        const { parentId, childrenIds, name } = args;
        try {
          let parentCategory: Category | undefined;
          let childrenCategories: Category[];
          if (parentId && childrenIds) {
            // have both parent and children
            parentCategory = await Category.findOne({ id: parentId });
            childrenCategories = await Category.find({
              where: { id: In(childrenIds) }
            });
            await Category.create({
              parent: parentCategory,
              children: childrenCategories,
              name
            }).save();
          } else if (parentId) {
            // have only parent
            parentCategory = await Category.findOne({ id: parentId });
            await Category.create({
              parent: parentCategory,
              name
            }).save();
          } else if (childrenIds) {
            // have only child
            childrenCategories = await Category.find({
              where: { id: In(childrenIds) }
            });
            await Category.create({
              children: childrenCategories,
              name
            }).save();
          } else {
            // have no relation
            await Category.create({
              name
            }).save();
          }
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
