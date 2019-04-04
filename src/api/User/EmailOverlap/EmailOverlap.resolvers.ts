import { Resolvers } from "../../../types/resolvers";
import User from "../../../entities/User";

const resolvers: Resolvers = {
  Query: {
    EmailOverlap: async (_, args) => {
      const { email } = args;
      try {
        const overlap = await User.findOne({ email });
        if (overlap !== undefined) {
          return {
            ok: false,
            error: "Same Email is already exist"
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
