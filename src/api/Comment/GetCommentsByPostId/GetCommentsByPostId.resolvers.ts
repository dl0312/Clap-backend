import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import Comment from "../../../entities/Comment";
import {
  GetCommentsByPostIdResponse,
  GetCommentsByPostIdQueryArgs
} from "../../../types/graph";

const resolvers: Resolvers = {
  Query: {
    GetCommentsByPostId: privateResolver(
      async (
        _,
        args: GetCommentsByPostIdQueryArgs,
        { req }
      ): Promise<GetCommentsByPostIdResponse> => {
        const { postId } = args;
        try {
          const comments = await Comment.find({ postId });
          if (comments) {
            return {
              ok: true,
              error: null,
              comments
            };
          } else {
            return {
              ok: false,
              error: "Has no comment in this post",
              comments: null
            };
          }
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            comments: null
          };
        }
      }
    )
  }
};

export default resolvers;
