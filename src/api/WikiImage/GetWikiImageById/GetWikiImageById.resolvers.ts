import { Resolvers } from "../../../types/resolvers";
import WikiImage from "../../../entities/WikiImage";
import {
  GetWikiImageByIdResponse,
  GetWikiImageByIdQueryArgs
} from "../../../types/graph";
import User from "../../../entities/User";
import Clap from "../../../entities/Clap";

const resolvers: Resolvers = {
  Query: {
    GetWikiImageById: async (
      _,
      args: GetWikiImageByIdQueryArgs,
      { req }
    ): Promise<GetWikiImageByIdResponse> => {
      const { wikiImageId } = args;
      const user: User = req.user;
      try {
        const wikiImage = await WikiImage.findOne(
          { id: wikiImageId },
          { relations: ["user", "category"] }
        );
        if (wikiImage !== undefined) {
          if (user !== undefined) {
            console.log(user.id, wikiImage.user.id);
            if (user.id === wikiImage.user.id) {
              return {
                ok: true,
                error: null,
                wikiImage,
                isClapped: true,
                isMine: true
              };
            } else {
              const isClapped = await Clap.findOne({
                wikiImageId,
                senderId: user.id
              });
              if (isClapped) {
                return {
                  ok: true,
                  error: null,
                  wikiImage,
                  isClapped: true,
                  isMine: false
                };
              } else {
                return {
                  ok: true,
                  error: null,
                  wikiImage,
                  isClapped: false,
                  isMine: false
                };
              }
            }
          } else {
            return {
              ok: true,
              error: null,
              wikiImage,
              isClapped: false,
              isMine: false
            };
          }
        } else {
          return {
            ok: false,
            error: "Have no wikiImage with this ID",
            wikiImage: null,
            isClapped: null,
            isMine: null
          };
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          wikiImage: null,
          isClapped: null,
          isMine: null
        };
      }
    }
  }
};

export default resolvers;
