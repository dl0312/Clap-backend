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
        const { parentIds, childrenIds, name } = args;
        try {
          let parentCategories: Category[];
          let childrenCategories: Category[];
          if (parentIds && childrenIds) {
            // have both parent and children
            parentCategories = await Category.find({
              where: { id: In(parentIds) }
            });
            childrenCategories = await Category.find({
              where: { id: In(childrenIds) }
            });
            await Category.create({
              parent: parentCategories,
              children: childrenCategories,
              name
            }).save();
          } else if (parentIds) {
            // have only parent
            parentCategories = await Category.find({
              where: { id: In(parentIds) }
            });
            await Category.create({
              parent: parentCategories,
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
