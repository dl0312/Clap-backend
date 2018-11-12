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
          let parentCategory: Category | null = null;
          let childrenCategories: Category[] = [];
          let category;
          if (parentId && (childrenIds && childrenIds.length !== 0)) {
            // have both parent and children
            parentCategory = await Category.findOne({
              where: { id: parentId }
            });
            childrenCategories = await Category.find({
              where: { id: In(childrenIds) }
            });
            category = await Category.create({
              parent: parentCategory,
              children: childrenCategories,
              name
            }).save();
          } else if (parentId) {
            // have only parent
            parentCategory = await Category.findOne({
              where: { id: parentId }
            });
            category = await Category.create({
              parent: parentCategory,
              children: childrenCategories,
              name
            }).save();
          } else if (childrenIds && childrenIds.length !== 0) {
            // have only child
            childrenCategories = await Category.find({
              where: { id: In(childrenIds) }
            });
            category = await Category.create({
              parent: parentCategory,
              children: childrenCategories,
              name
            }).save();
          } else {
            // have no relation
            category = await Category.create({
              parent: parentCategory,
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
