import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import Product from "../../../entities/Product";
import {
  GetProductsByCategoryResponse,
  GetProductsByCategoryQueryArgs
} from "../../../types/graph";
import { getConnection } from "../../../../node_modules/typeorm";

const resolvers: Resolvers = {
  Query: {
    GetProductsByCategory: privateResolver(
      async (
        _,
        args: GetProductsByCategoryQueryArgs,
        { req }
      ): Promise<GetProductsByCategoryResponse> => {
        const { categoryId } = args;
        try {
          //   const products = await Product.find({
          //     categoryId: categoryId
          //     relations: ["category"]
          //   });

          const products = await getConnection()
            .getRepository(Product)
            .createQueryBuilder("product")
            .leftJoinAndSelect("product.category", "category")
            .where("product.categoryId = :categoryId", { categoryId })
            .orderBy("post.id", "DESC")
            .getMany();
          if (products) {
            return {
              ok: true,
              error: null,
              products
            };
          } else {
            return {
              ok: false,
              error: "Have no product with this ID",
              products: null
            };
          }
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            products: null
          };
        }
      }
    )
  }
};

export default resolvers;
