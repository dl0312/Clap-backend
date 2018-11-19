import { Resolvers } from "../../../types/resolvers";
import {
  CompletePhoneVerificationMutationArgs,
  CompletePhoneVerificationResponse
} from "../../../types/graph";
import Verification from "../../../entities/Verification";
import User from "../../../entities/User";
import createJWT from "../../../utils/createJWT";

const resolvers: Resolvers = {
  Mutation: {
    CompletePhoneVerification: async (
      _,
      args: CompletePhoneVerificationMutationArgs
    ): Promise<CompletePhoneVerificationResponse> => {
      const { phoneNumber, key } = args;
      try {
        const verification = await Verification.findOne({
          payload: phoneNumber,
          key
        });
        if (verification) {
          try {
            // Verification key is valid 😁
            verification.verified = true;
            verification.save();
            const user = await User.findOne({ phoneNumber });
            if (user) {
              // found user with that phoneNumber
              user.verifiedPhoneNumber = true;
              user.save();
              const token = createJWT(user.id);
              return {
                ok: true,
                error: null,
                token
              };
            } else {
              // not found user with that phoneNumber
              return { ok: true, error: null, token: null };
            }
          } catch (error) {
            return {
              ok: false,
              error: error.message,
              token: null
            };
          }
        } else {
          return {
            // Verification key is not valid 😢
            ok: false,
            error: "Verification key is not valid 😢",
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
