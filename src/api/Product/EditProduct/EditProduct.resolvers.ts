import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import Product from "../../../entities/Product";
import cleanNullArgs from "../../../utils/cleanNullArg";
import {
  EditProductMutationArgs,
  EditProductResponse
} from "../../../types/graph";

const resolvers: Resolvers = {
  Mutation: {
    EditProduct: privateResolver(
      async (
        _,
        args: EditProductMutationArgs,
        { req }
      ): Promise<EditProductResponse> => {
        try {
          const product = await Product.findOne({ id: args.productId });
          if (product) {
            const notNull = cleanNullArgs(args);
            await Product.update({ id: args.productId }, { ...notNull });
            return {
              ok: true,
              error: null
            };
          } else {
            return {
              ok: false,
              error: "Has no product with this ID"
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
