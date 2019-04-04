import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import Game from "../../../entities/Game";
import { In } from "typeorm";
// import User from "../../../entities/User";

const resolvers: Resolvers = {
  Mutation: {
    EditMyGames: privateResolver(async (_, args, { req }) => {
      const { user } = req;
      const { gameIds } = args;
      try {
        console.log(gameIds);
        const games = await Game.find({
          where: { id: In(gameIds) }
        });
        user.games = games;
        // await User.update({ id: user.id }, { games });
        user.save();
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
    })
  }
};

export default resolvers;
