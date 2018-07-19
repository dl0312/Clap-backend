import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import {
  GetAllPostsQueryArgs
  //   GetAllPostsResponse
} from "../../../types/graph";
import Post from "../../../entities/Post";

const resolvers: Resolvers = {
  Query: {
    GetAllPosts: privateResolver(
      async (_, args: GetAllPostsQueryArgs, { req }) => {
        try {
          const limitedPosts = await Post.find({ take: args.limit });
          if (limitedPosts) {
            return {
              ok: true,
              error: null,
              posts: limitedPosts
            };
          } else {
            return {
              ok: false,
              error: "has no posts",
              posts: null
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
