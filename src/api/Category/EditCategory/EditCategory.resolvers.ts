import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import {
  EditCategoryMutationArgs,
  EditCategoryResponse
} from "../../../types/graph";
import Category from "../../../entities/Category";
import { In } from "../../../../node_modules/typeorm";

const resolvers: Resolvers = {
  Mutation: {
    EditCategory: privateResolver(
      async (
        _,
        args: EditCategoryMutationArgs,
        { req }
      ): Promise<EditCategoryResponse> => {
        const { categoryId, parentId, childrenIds, name } = args;
        try {
          console.log(childrenIds, childrenIds.length === 0);
          const category = await Category.findOne(
            { id: categoryId },
            { relations: ["parent", "children"] }
          );
          if (category) {
            let parentCategory: Category | null = null;
            let childrenCategories: Category[] = [];
            if (parentId && childrenIds.length !== 0) {
              // have both parent and children
              parentCategory = await Category.findOne({
                where: { id: parentId }
              });
              childrenCategories = await Category.find({
                where: { id: In(childrenIds) }
              });
            } else if (parentId) {
              // have only parent
              parentCategory = await Category.findOne({
                where: { id: parentId }
              });
            } else if (childrenIds.length !== 0) {
              // have only child
              childrenCategories = await Category.find({
                where: { id: In(childrenIds) }
              });
            } else {
              // have no relation
            }
            category.parent = parentCategory;
            category.children = childrenCategories;
            category.name = name;
            category.save();
            // await Category.update(
            //   { id: categoryId },
            //   { parent: parentCategories, children: childrenCategories, name }
            // );
            return {
              ok: true,
              error: null
            };
          } else {
            return {
              ok: false,
              error: "Has no Categoroy with given ID"
            };
          }
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
