import { Resolvers } from "../../../types/resolvers";
import Game from "../../../entities/Game";

const resolvers: Resolvers = {
  Query: {
    GetGameById: async (_, args, { req }) => {
      const { gameId } = args;
      try {
        const game = await Game.findOne({ id: gameId });
        if (game) {
          return {
            ok: true,
            error: null,
            game
          };
        } else {
          return {
            ok: false,
            error: "Has no Game with that ID",
            game: null
          };
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          game: null
        };
      }
    }
  }
};

export default resolvers;
