import { Resolvers } from "../../../types/resolvers";
// import User from "../../../entities/User";
import Post from "../../../entities/Post";

const resolvers: Resolvers = {
  Query: {
    GetPostsByCategoryId: async (_, args, { req }) => {
      const { categoryId } = args;
      //   const user: User = req.user;
      try {
        const posts = await Post.find({
          where: {
            categoryId
          },
          relations: [
            "category",
            "category.wikiImages",
            "category.wikiImages.shownImage",
            "category.parent",
            "user",
            "comments",
            "comments.user",
            "comments.childrenComments",
            "comments.childrenComments.user"
          ]
        });
        if (posts) {
          return {
            ok: true,
            error: null,
            posts
          };
        } else {
          return {
            ok: false,
            error: "Have no post with this category ID",
            posts: null
          };
        }
      } catch (error) {
        return {
          ok: false,
          error: error.MessageChannel,
          posts: null
        };
      }
    }
  }
};

export default resolvers;
