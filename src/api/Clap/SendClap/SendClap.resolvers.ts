import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import User from "../../../entities/User";
import Clap from "../../../entities/Clap";
import Post from "../../../entities/Post";
import { SendClapResponse, SendClapMutationArgs } from "../../../types/graph";
import WikiImage from "../../../entities/WikiImage";

const resolvers: Resolvers = {
  Mutation: {
    SendClap: privateResolver(
      async (
        _,
        args: SendClapMutationArgs,
        { req }
      ): Promise<SendClapResponse> => {
        const user: User = req.user;
        const { postId, wikiImageId } = args;
        try {
          if (postId) {
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
          } else if (wikiImageId) {
            const wikiImage = await WikiImage.findOne({
              id: wikiImageId
            });
            if (wikiImage) {
              if (wikiImage.userId !== user.id) {
                const clap = await Clap.findOne({
                  senderId: user.id,
                  receiverId: wikiImage.userId,
                  wikiImageId
                });
                if (clap) {
                  clap.remove();
                  return { ok: true, error: null };
                } else {
                  await Clap.create({
                    senderId: user.id,
                    receiverId: wikiImage.userId,
                    wikiImageId
                  }).save();
                  return { ok: true, error: null };
                }
              } else {
                return { ok: false, error: "You can't clap yourself" };
              }
            } else {
              return { ok: false, error: "Has no WikiImage with that ID" };
            }
          } else {
            return {
              ok: false,
              error: "You didn't pass any Id"
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
