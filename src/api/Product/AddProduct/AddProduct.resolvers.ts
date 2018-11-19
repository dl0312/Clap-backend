import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import Product from "../../../entities/Product";
import Category from "../../../entities/Category";
import {
  AddProductMutationArgs,
  AddProductResponse
} from "../../../types/graph";

const resolvers: Resolvers = {
  Mutation: {
    AddProduct: privateResolver(
      async (
        _,
        args: AddProductMutationArgs,
        { req }
      ): Promise<AddProductResponse> => {
        const { name, price, categoryId } = args;
        try {
          const category = await Category.findOne({ id: categoryId });
          await Product.create({ name, price, category }).save();
          return {
            ok: true,
            error: null
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
