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
          const category = await Category.findOne(
            { id: categoryId },
            { relations: ["parent", "children"] }
          );
          if (category) {
            let parentCategory: Category | undefined;
            let childrenCategories: Category[];
            if (parentId && childrenIds) {
              // have both parent and children
              parentCategory = await Category.findOne({ id: parentId });
              childrenCategories = await Category.find({
                where: {
                  id: In(childrenIds)
                }
              });
              await Category.update(
                { id: categoryId },
                {
                  parent: parentCategory,
                  children: childrenCategories,
                  name
                }
              );
            } else if (parentId) {
              // have only parent
              parentCategory = await Category.findOne({ id: parentId });
              await Category.update(
                { id: categoryId },
                {
                  parent: parentCategory,
                  name
                }
              );
            } else if (childrenIds) {
              // have only child
              childrenCategories = await Category.find({
                where: { id: In(childrenIds) }
              });
              console.log(childrenCategories);
              await Category.update(
                { id: categoryId },
                { children: childrenCategories, name }
              );
            } else {
              // have no relation
              await Category.update({ id: categoryId }, { name });
            }
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
