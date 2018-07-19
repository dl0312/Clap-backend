import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import User from "../../../entities/User";

const resolvers: Resolvers = {
  Mutation: {
    FollowUser: privateResolver(async (_, args, { req }) => {
      const user: User = req.user;
      try {
        const followedUser = await User.findOne(
          { id: args.userId },
          { relations: ["following"] }
        );
        if (followedUser) {
          if (followedUser !== user) {
            await User.update({ id: user.id }, { following: [followedUser] });
            return {
              ok: true,
              error: null
            };
          } else {
            return {
              ok: false,
              error: "Yon can't follow yourself"
            };
          }
        } else {
          return {
            ok: false,
            error: "Have no User with that Id"
          };
        }
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
