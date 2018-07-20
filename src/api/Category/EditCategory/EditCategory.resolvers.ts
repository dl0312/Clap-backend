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
            if (parentIds && childrenIds) {
              // have both parent and children
              parentCategories = await Category.find({
                where: { id: In(parentIds) }
              });
              childrenCategories = await Category.find({
                where: { id: In(childrenIds) }
              });
              await Category.update(
                { id: categoryId },
                {
                  parent: parentCategories,
                  children: childrenCategories,
                  name
                }
              );
            } else if (parentIds) {
              // have only parent
              parentCategories = await Category.find({
                where: { id: In(parentIds) }
              });
              await Category.update(
                { id: categoryId },
                {
                  parent: parentCategories,
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
