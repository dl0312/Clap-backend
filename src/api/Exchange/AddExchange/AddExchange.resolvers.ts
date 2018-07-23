import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import User from "../../../entities/User";
import Product from "../../../entities/Product";
import Exchange from "../../../entities/Exchange";
import {
  AddExchangeMutationArgs,
  AddExchangeResponse
} from "../../../types/graph";

const resolvers: Resolvers = {
  Mutation: {
    AddExchange: privateResolver(
      async (
        _,
        args: AddExchangeMutationArgs,
        { req }
      ): Promise<AddExchangeResponse> => {
        const buyer: User = req.user;
        const { productId } = args;
        try {
          const product = await Product.findOne({ id: productId });
          await Exchange.create({ buyer, product }).save();
          product.stock -= 1;
          product.save();
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
