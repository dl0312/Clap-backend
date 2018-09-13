import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import User from "../../../entities/User";
import Clap from "../../../entities/Clap";
import Post from "../../../entities/Post";
import { SendClapResponse, SendClapMutationArgs } from "../../../types/graph";

const resolvers: Resolvers = {
  Mutation: {
    SendClap: privateResolver(
      async (
        _,
        args: SendClapMutationArgs,
        { req }
      ): Promise<SendClapResponse> => {
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
                await Clap.create({
                  senderId: user.id,
                  receiverId: post.userId,
                  postId
                }).save();
                return {
                  ok: true,
                  error: null
                };
              }
            } else {
              return {
                ok: false,
                error: "You can't clap yourself"
              };
            }
          } else {
            return {
              ok: false,
              error: "Has no Post with that ID"
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
