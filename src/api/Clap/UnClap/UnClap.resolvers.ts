import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import User from "../../../entities/User";
import Post from "../../../entities/Post";
import Clap from "../../../entities/Clap";

const resolvers: Resolvers = {
  Mutation: {
    UnClap: privateResolver(async (_, args, { req }) => {
      const user: User = req.user;
      const { postId } = args;
      try {
        const post = await Post.findOne({ id: postId });
        if (post) {
          if (post.userId !== user.id) {
            const clap = await Clap.findOne({
              senderId: user.id,
              receiverId: post.userId,
              postId
            });
            if (clap) {
              clap.remove();
              return {
                ok: true,
                error: null
              };
            } else {
              return {
                ok: false,
                error: "Clap on this post doesn't exist"
              };
            }
          } else {
            return {
              ok: false,
              error: "You can't clap yourself"
            };
          }
        } else {
          return { ok: false, error: "Has no Post with that ID" };
        }
      } catch (error) {
        return {
          ok: false,
          error: "Clap on this post doesn't exist"
        };
      }
    })
  }
};

export default resolvers;
