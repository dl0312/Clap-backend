import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import User from "../../../entities/User";
import Exchange from "../../../entities/Exchange";
import { getConnection } from "../../../../node_modules/typeorm";
import { GetMyExchangesResponse } from "../../../types/graph";

const resolvers: Resolvers = {
  Query: {
    GetMyExchanges: privateResolver(
      async (_, __, { req }): Promise<GetMyExchangesResponse> => {
        const user: User = req.user;
        try {
          const exchanges = await getConnection()
            .getRepository(Exchange)
            .createQueryBuilder("exchange")
            .leftJoinAndSelect("exchange.product", "product")
            .where("exchange.buyerId = :userId", { userId: user.id })
            .orderBy("exchange.id", "DESC")
            .getMany();
          if (exchanges) {
            return {
              ok: true,
              error: null,
              exchanges
            };
          } else {
            return {
              ok: false,
              error: "You don't have any exchanges",
              exchanges: null
            };
          }
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            exchanges: null
          };
        }
      }
    )
  }
};

export default resolvers;
