import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import User from "../../../entities/User";
import Comment from "../../../entities/Comment";
import {
  AddCommentMutationArgs,
  AddCommentResponse
} from "../../../types/graph";

const resolvers: Resolvers = {
  Mutation: {
    AddComment: privateResolver(
      async (
        _,
        args: AddCommentMutationArgs,
        { req }
      ): Promise<AddCommentResponse> => {
        const user: User = req.user;
        const { postId, parentCommentId, body, level } = args;
        if (parentCommentId) {
          const parentComment = await Comment.findOne({ id: parentCommentId });
          await Comment.create({
            postId,
            parentComment,
            body,
            user,
            level
          }).save();
          return { ok: true, error: null };
        }
        try {
          await Comment.create({ postId, body, level, user }).save();
          return {
            ok: true,
            error: null
          };
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
