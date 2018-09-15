import { Resolvers } from "../../../types/resolvers";
import WikiImage from "../../../entities/WikiImage";

const resolvers: Resolvers = {
  Query: {
    GetWikiImages: async (_, args) => {
      const { limit, type } = args;
      try {
        let limitedWikiImages;
        if (type === "createdAt") {
          limitedWikiImages = await WikiImage.find({
            order: {
              createdAt: "DESC"
            },
            take: limit,
            relations: ["user", "category", "category.parent", "shownImage"]
          });
        } else if (type === "updatedAt") {
          limitedWikiImages = await WikiImage.find({
            order: {
              updatedAt: "DESC"
            },
            take: limit,
            relations: ["user", "category", "category.parent", "shownImage"]
          });
        } else {
          return { ok: false, error: "Type is not Valid", wikiImages: null };
        }
        limitedWikiImages.forEach(post => {
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
        if (limitedWikiImages) {
          return { ok: true, error: null, wikiImages: limitedWikiImages };
        } else {
          return { ok: false, error: "has no wikiImages", wikiImages: null };
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          wikiImages: null
        };
      }
    }
  }
};

export default resolvers;
