import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import User from "../../../entities/User";
import {
  UnfollowUserResponse,
  UnfollowUserMutationArgs
} from "../../../types/graph";

const resolvers: Resolvers = {
  Mutation: {
    UnfollowUser: privateResolver(
      async (
        _,
        args: UnfollowUserMutationArgs,
        { req }
      ): Promise<UnfollowUserResponse> => {
        const user: User | undefined = await User.findOne(
          { id: req.user.id },
          { relations: ["following"] }
        );
        if (!user) {
          return {
            ok: false,
            error: "who are you?"
          };
        }
        try {
          const unfollowedUser = await User.findOne({ id: args.userId });
          if (unfollowedUser) {
            const followingWithoutFollowedUser = await user.following.filter(
              followingUser => followingUser.id !== unfollowedUser.id
            );
            const isFollowingHaveFollowedUser =
              followingWithoutFollowedUser.length !== user.following.length;
            if (!isFollowingHaveFollowedUser) {
              return { ok: false, error: "follow user before unfollow" };
            }
            if (unfollowedUser.id !== user.id) {
              user.following = await user.following.filter(
                followinguser => followinguser.id !== unfollowedUser.id
              );
              user.save();
              return {
                ok: true,
                error: null
              };
            } else {
              return { ok: false, error: "Yon can't unfollow yourself" };
            }
          } else {
            return {
              ok: false,
              error: "Has no User with this ID"
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
