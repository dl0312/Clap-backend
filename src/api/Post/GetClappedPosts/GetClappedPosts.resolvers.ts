import { Resolvers } from "src/types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import Post from "../../../entities/Post";

const resolvers: Resolvers = {
  Query: {
    GetClappedPosts: privateResolver(async (_, __, { req }) => {
      const { user } = req;
      try {
        console.log(user.clapsAsSender);
        const posts = user.clapsAsSender.map(
          clap =>
            clap.postId &&
            Post.findOne(
              { id: clap.postId },
              {
                relations: ["category", "category.wikiImages", "user"]
              }
            )
        );
        return {
          ok: true,
          error: null,
          posts: posts.filter(obj => obj)
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
