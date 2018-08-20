import { Resolvers } from "../../../types/resolvers";
import WikiImage from "../../../entities/WikiImage";
import {
  GetWikiImageByIdResponse,
  GetWikiImageByIdQueryArgs
} from "../../../types/graph";

const resolvers: Resolvers = {
  Query: {
    GetWikiImageById: async (
      _,
      args: GetWikiImageByIdQueryArgs,
      { req }
    ): Promise<GetWikiImageByIdResponse> => {
      const { wikiImageId } = args;
      try {
        const wikiImage = await WikiImage.findOne(
          { id: wikiImageId },
          { relations: ["shownImage"] }
        );
        if (wikiImage) {
          return {
            ok: true,
            error: null,
            wikiImage
          };
        } else {
          return {
            ok: false,
            error: "Have no wikiImage with this ID",
            wikiImage: null
          };
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          wikiImage: null
        };
      }
    }
  }
};

export default resolvers;
