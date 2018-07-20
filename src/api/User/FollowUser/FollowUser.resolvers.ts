import { Resolvers } from "../../../types/resolvers";
import User from "../../../entities/User";
import {
  FollowUserMutationArgs,
  FollowUserResponse
} from "../../../types/graph";

const resolvers: Resolvers = {
  Mutation: {
    FollowUser: async (
      _,
      args: FollowUserMutationArgs,
      { req }
    ): Promise<FollowUserResponse> => {
      const user: User = req.user;
      try {
        const followedUser = await User.findOne({ id: args.userId });
        if (followedUser) {
          if (followedUser.id !== user.id) {
            user.following = [...[followedUser]];
            user.save();
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
    }
  }
};

export default resolvers;
