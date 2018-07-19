import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import User from "../../../entities/User";
import Comment from "../../../entities/Comment";
import {
  AddCommentMutationArgs,
  AddCommentResponse
} from "../../../types/graph";
import cleanNullArgs from "../../../utils/cleanNullArg";

const resolvers: Resolvers = {
  Mutation: {
    AddComment: privateResolver(
      async (
        _,
        args: AddCommentMutationArgs,
        { req }
      ): Promise<AddCommentResponse> => {
        const user: User = req.user;
        const notNull: any = cleanNullArgs(args);
        try {
          if (!notNull.parentCommentId) {
            await Comment.create({ ...notNull, user }).save();
          } else {
            await Comment.create({ ...notNull, user }).save();
          }
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
