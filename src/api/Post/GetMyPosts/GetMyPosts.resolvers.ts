import User from "../../../entities/User";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { GetMyPostsResponse } from "../../../types/graph";

// GetMyPostsResponse error need to fix it later
const resolvers: Resolvers = {
  Query: {
    GetMyPosts: privateResolver(
      async (_, __, { req }): Promise<GetMyPostsResponse> => {
        try {
          const user = await User.findOne(
            { id: req.user.id },
            { relations: ["posts"] }
          );
          if (user) {
            return {
              ok: true,
              posts: user.posts,
              error: null
            };
          } else {
            return {
              ok: false,
              posts: null,
              error: "User not found"
            };
          }
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            posts: null
          };
        }
      }
    )
  }
};

export default resolvers;
