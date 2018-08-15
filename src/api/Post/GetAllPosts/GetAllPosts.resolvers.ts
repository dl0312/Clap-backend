import { Resolvers } from "../../../types/resolvers";
import {
  GetAllPostsQueryArgs,
  GetAllPostsResponse
} from "../../../types/graph";
import Post from "../../../entities/Post";

const resolvers: Resolvers = {
  Query: {
    GetAllPosts: async (
      _,
      args: GetAllPostsQueryArgs,
      { req }
    ): Promise<GetAllPostsResponse> => {
      try {
        const limitedPosts = await Post.find({
          take: args.limit,
          relations: ["category", "category.wikiImages", "user"]
        });
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
  }
};

export default resolvers;
