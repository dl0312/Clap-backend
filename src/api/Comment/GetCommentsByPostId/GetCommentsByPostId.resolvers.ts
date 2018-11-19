import { Resolvers } from "../../../types/resolvers";
import Comment from "../../../entities/Comment";
import {
  GetCommentsByPostIdResponse,
  GetCommentsByPostIdQueryArgs
} from "../../../types/graph";
import { getManager } from "typeorm";

const resolvers: Resolvers = {
  Query: {
    GetCommentsByPostId: async (
      _,
      args: GetCommentsByPostIdQueryArgs,
      { req }
    ): Promise<GetCommentsByPostIdResponse> => {
      // const { postId } = args;
      try {
        const manager = getManager();
        // const { postId } = args;
        // const comments = await Comment.find({ postId });
        const comments = await manager.getTreeRepository(Comment).findTrees();
        // const comments = commentstrees.find({ postId :  postId });
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
  }
};

export default resolvers;
