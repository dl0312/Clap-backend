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
          let parentCategories: Category[] = [];
          let childrenCategories: Category[] = [];
          let category;
          if (parentIds && childrenIds) {
            // have both parent and children
            parentCategories = await Category.find({
              where: { id: In(parentIds) }
            });
            childrenCategories = await Category.find({
              where: { id: In(childrenIds) }
            });
            category = await Category.create({
              parent: parentCategories,
              children: childrenCategories,
              name
            }).save();
          } else if (parentIds) {
            // have only parent
            parentCategories = await Category.find({
              where: { id: In(parentIds) }
            });
            category = await Category.create({
              parent: parentCategories,
              children: childrenCategories,
              name
            }).save();
          } else if (childrenIds) {
            // have only child
            childrenCategories = await Category.find({
              where: { id: In(childrenIds) }
            });
            category = await Category.create({
              parent: parentCategories,
              children: childrenCategories,
              name
            }).save();
          } else {
            // have no relation
            category = await Category.create({
              parent: parentCategories,
              children: childrenCategories,
              name
            }).save();
          }
          return {
            ok: true,
            error: null,
            categoryId: category.id
          };
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            categoryId: null
          };
        }
      }
    )
  }
};

export default resolvers;
