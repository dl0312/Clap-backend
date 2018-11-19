import { Resolvers } from "../../../types/resolvers";
import {
  GoogleConnectResponse,
  GoogleConnectMutationArgs
} from "../../../types/graph";
import User from "../../../entities/User";
import createJWT from "../../../utils/createJWT";

const resolvers: Resolvers = {
  Mutation: {
    GoogleConnect: async (
      _,
      args: GoogleConnectMutationArgs
    ): Promise<GoogleConnectResponse> => {
      const { googleId } = args;
      try {
        const existingUser = await User.findOne({ googleId });
        if (existingUser) {
          const token = createJWT(existingUser.id);
          return {
            ok: true,
            error: null,
            token
          };
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null
        };
      }
      try {
        const newUser = await User.create({
          ...args
        }).save();
        const token = createJWT(newUser.id);
        if (newUser) {
          return {
            ok: true,
            error: null,
            token
          };
        } else {
          return {
            ok: false,
            error: "User is null",
            token: null
          };
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null
        };
      }
    }
  }
};

export default resolvers;
