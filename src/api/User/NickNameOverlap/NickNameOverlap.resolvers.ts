import { Resolvers } from "../../../types/resolvers";
import User from "../../../entities/User";

const resolvers: Resolvers = {
  Query: {
    NickNameOverlap: async (_, args) => {
      const { nickName } = args;
      try {
        const overlap = await User.findOne({ nickName });
        if (overlap !== undefined) {
          return {
            ok: false,
            error: "Same Nick Name is already exist"
          };
        } else {
          return {
            ok: true,
            error: null
          };
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message
        };
      }
    }
  }
};

export default resolvers;
