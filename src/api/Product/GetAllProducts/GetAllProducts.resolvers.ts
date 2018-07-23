import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import Product from "../../../entities/Product";
import { GetAllProductsResponse } from "../../../types/graph";

const resolvers: Resolvers = {
  Query: {
    GetAllProducts: privateResolver(
      async (_, __, { req }): Promise<GetAllProductsResponse> => {
        try {
          const products = await Product.find();
          if (products) {
            return {
              ok: true,
              error: null,
              products
            };
          } else {
            return {
              ok: false,
              error: "There's no product",
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
