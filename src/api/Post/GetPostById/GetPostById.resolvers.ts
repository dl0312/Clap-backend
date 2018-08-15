import { Resolvers } from "../../../types/resolvers";
import {
  GetPostByIdResponse,
  GetPostByIdQueryArgs
} from "../../../types/graph";
import Post from "../../../entities/Post";

const resolvers: Resolvers = {
  Query: {
    GetPostById: async (
      _,
      args: GetPostByIdQueryArgs,
      { req }
    ): Promise<GetPostByIdResponse> => {
      const { postId } = args;
      try {
        const post = await Post.findOne(
          { id: postId },
          {
            relations: [
              "category",
              "category.wikiImages",
              "user",
              "comments",
              "comments.user"
            ]
          }
        );
        if (post) {
          return {
            ok: true,
            error: null,
            post
          };
        } else {
          return {
            ok: false,
            error: "Have no post with this ID",
            post: null
          };
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          post: null
        };
      }
    }
  }
};

export default resolvers;
