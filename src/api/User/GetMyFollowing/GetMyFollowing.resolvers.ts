import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import User from "../../../entities/User";
import { GetMyFollowingResponse } from "../../../types/graph";
// import { GetMyFollowingResponse } from "../../../types/graph";

const resolvers: Resolvers = {
  Query: {
    GetMyFollowing: privateResolver(
      async (_, __, { req }): Promise<GetMyFollowingResponse> => {
        const user: User | undefined = await User.findOne(
          { id: req.user.id },
          { relations: ["following"] }
        );
        if (user === undefined) {
          return {
            ok: false,
            error: "who are you?",
            following: null
          };
        }
        try {
          const following = await user.following;
          return {
            ok: true,
            error: null,
            following
          };
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            following: null
          };
        }
      }
    )
  }
};

export default resolvers;
