import { Resolvers } from "src/types/resolvers";
import Post from "../../../entities/Post";
import moment = require("moment");

const resolvers: Resolvers = {
  Query: {
    GetRisingPostsByGameId: async (_, args, { req }) => {
      try {
        const { gameId } = args;
        const toDay = moment(new Date());
        const posts = await Post.find({
          where: { gameId },
          order: {
            view: "DESC"
          },
          relations: ["user"]
        });
        const filterdPosts = [];
        posts.map(post => {
          //   console.log(toDay.diff(moment(post.updatedAt), "days") < 15);
          if (toDay.diff(moment(post.updatedAt), "days") <= 15) {
            filterdPosts.push(post);
          }
        });

        return {
          ok: true,
          error: null,
          posts: filterdPosts
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
