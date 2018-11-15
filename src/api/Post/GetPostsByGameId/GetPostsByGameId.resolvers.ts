import { Resolvers } from "../../../types/resolvers";
import Post from "../../../entities/Post";

const resolvers: Resolvers = {
  Query: {
    GetPostsByGameId: async (_, args, { req }) => {
      const { gameId } = args;
      try {
        const posts = await Post.find({
          where: { gameId },
          order: {
            createdAt: "DESC"
          },
          relations: [
            "category",
            "category.parent",
            "category.wikiImages",
            "user"
          ]
        });
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
    }
  }
};

export default resolvers;
