import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import Post from "../../../entities/Post";
import { GetPostsByKeywordQueryArgs } from "../../../types/graph";
import { Like } from "../../../../node_modules/typeorm";

const resolvers: Resolvers = {
  Query: {
    GetPostsByKeyword: privateResolver(
      async (_, args: GetPostsByKeywordQueryArgs, { req }) => {
        const { searchType, keyword } = args;
        try {
          const filteredByTitle = await Post.find({
            where: { title: Like(`%${keyword}%`) }
          });
          const filteredByBody = await Post.find({
            where: { body: Like(`%${keyword}%`) }
          });
          switch (searchType) {
            case "TITLE":
              return {
                ok: true,
                error: null,
                filterdPosts: filteredByTitle
              };
              break;
            case "BODY":
              return {
                ok: true,
                error: null,
                filterdPosts: filteredByBody
              };
              break;
            // case "BOTH":
            //   const filteredByBoth =  filteredByTitle + filteredByBody;
            //   return {
            //     ok: true,
            //     error: null,
            //     filterdPosts: filteredByBoth
            //   };
            //   break;
            default:
              return {
                ok: false,
                error: "Wrong keyword",
                filterdPosts: null
              };
              break;
          }
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            filterdPosts: null
          };
        }
      }
    )
  }
};

export default resolvers;
