import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import User from "../../../entities/User";
import Comment from "../../../entities/Comment";

const resolvers: Resolvers = {
  Mutation: {
    DeleteComment: privateResolver(async (_, args, { req }) => {
      const user: User = req.user;
      try {
        const comment = await Comment.findOne({ id: args.commentId });
        if (comment) {
          if (comment.userId === user.id) {
            comment.remove();
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
          return { ok: false, error: "Has no Comment with given Comment ID" };
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message
        };
      }
    })
  }
};

export default resolvers;
