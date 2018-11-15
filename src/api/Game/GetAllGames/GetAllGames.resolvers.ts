import { Resolvers } from "../../../types/resolvers";
import Game from "../../../entities/Game";

const resolvers: Resolvers = {
  Query: {
    GetAllGames: async (_, __, { req }) => {
      try {
        const games = await Game.find({ order: { id: "ASC" }, take: 50 });
        return {
          ok: true,
          error: null,
          games
        };
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          games: null
        };
      }
    }
  }
};

export default resolvers;
