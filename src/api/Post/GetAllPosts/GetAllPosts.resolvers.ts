import { Resolvers } from "../../../types/resolvers";
import {
  GetAllPostsQueryArgs,
  GetAllPostsResponse
} from "../../../types/graph";
import Post from "../../../entities/Post";

const resolvers: Resolvers = {
  Query: {
    GetAllPosts: async (
      _,
      args: GetAllPostsQueryArgs,
      { req }
    ): Promise<GetAllPostsResponse> => {
      try {
        const limitedPosts = await Post.find({
          order: {
            id: "DESC"
          },
          take: args.limit,
          relations: [
            "category",
            "category.parent",
            "category.wikiImages",
            "category.wikiImages.shownImage",
            "user"
          ]
        });
        limitedPosts.forEach(post => {
          const d = new Date(post.createdAt);
          let month = "" + (d.getMonth() + 1);
          let day = "" + d.getDate();
          const year = d.getFullYear();

          if (month.length < 2) {
            month = "0" + month;
          }
          if (day.length < 2) {
            day = "0" + day;
          }
          post.createdAt = [year, month, day].join("-");
        });
        if (limitedPosts) {
          return {
            ok: true,
            error: null,
            posts: limitedPosts
          };
        } else {
          return {
            ok: false,
            error: "has no posts",
            posts: null
          };
        }
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
