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
      const { limit, type } = args;
      try {
        let limitedPosts;
        if (type === "createdAt") {
          limitedPosts = await Post.find({
            order: {
              createdAt: "DESC"
            },
            take: limit,
            relations: [
              "category",
              "category.parent",
              "category.wikiImages",
              "user"
            ]
          });
        } else if (type === "updatedAt") {
          limitedPosts = await Post.find({
            order: {
              updatedAt: "DESC"
            },
            take: limit,
            relations: [
              "category",
              "category.parent",
              "category.wikiImages",
              "user"
            ]
          });
        } else {
          return { ok: false, error: "Type is not Valid", posts: null };
        }
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
