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
        const { categoryId, parentIds, childrenIds, name } = args;
        try {
          const category = await Category.findOne(
            { id: categoryId },
            { relations: ["parent", "children"] }
          );
          if (category) {
            let parentCategories: Category[] = [];
            let childrenCategories: Category[] = [];
            if (parentIds.length !== 0 && childrenIds.length !== 0) {
              // have both parent and children
              parentCategories = await Category.find({
                where: { id: In(parentIds) }
              });
              childrenCategories = await Category.find({
                where: { id: In(childrenIds) }
              });
            } else if (parentIds.length !== 0) {
              // have only parent
              parentCategories = await Category.find({
                where: { id: In(parentIds) }
              });
            } else if (childrenIds.length !== 0) {
              // have only child
              childrenCategories = await Category.find({
                where: { id: In(childrenIds) }
              });
            } else {
              // have no relation
            }
            category.parent = parentCategories;
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
