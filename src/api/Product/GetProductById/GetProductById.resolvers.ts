import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import Product from "../../../entities/Product";
import {
  GetProductByIdResponse,
  GetProductByIdQueryArgs
} from "../../../types/graph";

const resolvers: Resolvers = {
  Query: {
    GetProductById: privateResolver(
      async (
        _,
        args: GetProductByIdQueryArgs,
        { req }
      ): Promise<GetProductByIdResponse> => {
        const { productId } = args;
        try {
          const product = await Product.findOne(
            { id: productId },
            { relations: ["category"] }
          );
          if (product) {
            return {
              ok: true,
              error: null,
              product
            };
          } else {
            return {
              ok: false,
              error: "Have no product with this ID",
              product: null
            };
          }
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            product: null
          };
        }
      }
    )
  }
};

export default resolvers;
