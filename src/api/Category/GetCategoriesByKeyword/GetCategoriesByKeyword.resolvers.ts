import { Resolvers } from "../../../types/resolvers";
import { getConnection } from "../../../../node_modules/typeorm";
import Category from "../../../entities/Category";

const resolvers: Resolvers = {
  Query: {
    GetCategoriesByKeyword: async (_, args, { req }) => {
      const { keyword } = args;
      try {
        const categories = await getConnection()
          .getRepository(Category)
          .createQueryBuilder("category")
          .leftJoinAndSelect("category.parent", "parent")
          .leftJoinAndSelect("category.children", "children")
          .leftJoinAndSelect("category.wikiImages", "wikiImages")
          .where("lower(category.name) like :key", {
            key: `%${keyword.toLowerCase()}%`
          })
          .orderBy("category.id", "DESC")
          .getMany();
        return {
          ok: true,
          error: null,
          categories
        };
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          categories: null
        };
      }
    }
  }
};

export default resolvers;
