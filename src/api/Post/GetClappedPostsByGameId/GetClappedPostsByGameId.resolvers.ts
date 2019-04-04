import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import Post from "../../../entities/Post";

const resolvers: Resolvers = {
  Query: {
    GetClappedPostsByGameId: privateResolver(async (_, args, { req }) => {
      const { user } = req;
      try {
        const { gameId } = args;
        const filteredClaps = user.clapsAsSender.filter(clap => {
          if (clap.postId && clap.post.gameId === gameId) {
            return true;
          } else {
            return false;
          }
        });
        const posts = filteredClaps.map(clap =>
          Post.findOne(
            { id: clap.postId },
            {
              relations: ["user", "game"]
            }
          )
        );
        return {
          ok: true,
          error: null,
          posts
        };
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          posts: null
        };
      }
    })
  }
};

export default resolvers;
