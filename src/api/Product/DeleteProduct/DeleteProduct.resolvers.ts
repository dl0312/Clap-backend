import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { DeleteProductResponse } from "../../../types/graph";
import Product from "../../../entities/Product";

const resolvers: Resolvers = {
  Mutation: {
    DeleteProduct: privateResolver(
      async (_, args, { req }): Promise<DeleteProductResponse> => {
        const { productId } = args;
        try {
          const product = await Product.findOne({ id: productId });
          if (product) {
            product.remove();
            return {
              ok: true,
              error: null
            };
          }
          return {
            ok: false,
            error: "You can't delete nothing"
          };
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
