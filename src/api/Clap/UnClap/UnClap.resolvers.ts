import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import User from "../../../entities/User";
import Post from "../../../entities/Post";
import Clap from "../../../entities/Clap";
import WikiImage from "../../../entities/WikiImage";

const resolvers: Resolvers = {
  Mutation: {
    UnClap: privateResolver(async (_, args, { req }) => {
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
                return {
                  ok: false,
                  error: "Clap on this wikiImage doesn't exist"
                };
              }
            } else {
              return { ok: false, error: "You can't clap yourself" };
            }
          } else {
            return { ok: false, error: "Has no WikiImage with that ID" };
          }
        } else {
          return { ok: false, error: "You didn't pass any Id" };
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
