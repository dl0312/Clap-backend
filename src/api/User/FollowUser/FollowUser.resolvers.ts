import { Resolvers } from "../../../types/resolvers";
import User from "../../../entities/User";
import {
  FollowUserMutationArgs,
  FollowUserResponse
} from "../../../types/graph";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
  Mutation: {
    FollowUser: privateResolver(
      async (
        _,
        args: FollowUserMutationArgs,
        { req }
      ): Promise<FollowUserResponse> => {
        const user: User = req.user;
        try {
          const followedUser = await User.findOne({ id: args.userId });
          if (followedUser) {
            /*

          have to check if you already follow user

          */
            const followingWithoutFollowedUser = await user.following.filter(
              followingUser => followingUser.id !== followedUser.id
            );
            const isFollowingHaveFollowedUser =
              followingWithoutFollowedUser.length !== user.following.length;
            console.log(`is following? ${isFollowingHaveFollowedUser}`);
            if (isFollowingHaveFollowedUser) {
              return {
                ok: false,
                error: `you already follow this user ${isFollowingHaveFollowedUser}`
              };
            }
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
    )
  }
};

export default resolvers;
