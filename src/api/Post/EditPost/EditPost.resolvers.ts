import Post from "../../../entities/Post";
import User from "../../../entities/User";
import { EditPostMutationArgs, EditPostResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import cleanNullArgs from "../../../utils/cleanNullArg";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
  Mutation: {
    EditPost: privateResolver(
      async (
        _,
        args: EditPostMutationArgs,
        { req }
      ): Promise<EditPostResponse> => {
        const user: User = req.user;
        try {
          const post: Post | undefined = await Post.findOne({
            id: args.postId
          });
          if (post) {
            if (post.userId === user.id) {
              const notNull = cleanNullArgs(args);
              await Post.update({ id: args.postId }, { ...notNull });
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
              error: "Has no Post with given Post ID"
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
