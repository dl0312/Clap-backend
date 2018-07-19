import Post from "../../../entities/Post";
import User from "../../../entities/User";
import {
  DeletePostMutationArgs,
  DeletePostResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
  Mutation: {
    DeletePost: privateResolver(
      async (
        _,
        args: DeletePostMutationArgs,
        { req }
      ): Promise<DeletePostResponse> => {
        const user: User = req.user;
        try {
          const post = await Post.findOne({ id: args.postId });
          if (post) {
            // 주어진 ID에 해당하는 post 존재
            if (post.userId === user.id) {
              // 본인의 post
              post.remove();
              return {
                ok: true,
                error: null
              };
            } else {
              // 본인의 post가 아님
              return {
                ok: false,
                error: "Not Authorized"
              };
            }
          } else {
            // 해당하는 post 존재하지 않음
            return { ok: false, error: "Has no Post with given Post ID" };
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
