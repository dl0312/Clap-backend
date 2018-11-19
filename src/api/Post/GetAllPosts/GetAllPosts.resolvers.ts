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
      const { user } = req;
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
          return {
            ok: false,
            error: "Type is not Valid",
            posts: null
          };
        }
        if (limitedPosts) {
          if (user) {
            return {
              ok: true,
              error: null,
              posts: limitedPosts
            };
          } else {
            return {
              ok: true,
              error: null,
              posts: limitedPosts
            };
          }
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
