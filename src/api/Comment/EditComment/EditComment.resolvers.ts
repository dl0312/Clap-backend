import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import User from "../../../entities/User";
import Comment from "../../../entities/Comment";
import {
  EditCommentMutationArgs,
  EditCommentResponse
} from "../../../types/graph";

const resolvers: Resolvers = {
  Mutation: {
    EditComment: privateResolver(
      async (
        _,
        args: EditCommentMutationArgs,
        { req }
      ): Promise<EditCommentResponse> => {
        const user: User = req.user;
        const { body } = args;
        try {
          const comment = await Comment.findOne({ id: args.commentId });
          if (comment) {
            if (comment.userId === user.id) {
              await Comment.update({ id: args.commentId }, { body });
              return {
                ok: true,
                error: null
              };
            } else {
              return {
                ok: false,
                error: "Not Authorized"
              };
            }
          } else {
            return {
              ok: false,
              error: "Has no Comment with given Comment ID"
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
