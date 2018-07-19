import { Resolvers } from "../../../types/resolvers";
import {
  EmailSignUpMutationArgs,
  EmailSignUpResponse
} from "../../../types/graph";
import User from "../../../entities/User";
import createJWT from "../../../utils/createJWT";
import Verification from "../../../entities/Verification";
import { sendVerificationEmail } from "../../../utils/sendEmail";

const resolvers: Resolvers = {
  Mutation: {
    EmailSignUp: async (
      _,
      args: EmailSignUpMutationArgs
    ): Promise<EmailSignUpResponse> => {
      const { email, phoneNumber } = args;
      try {
        const existingSameEmailUser = await User.findOne({ email });
        const existingSamePhoneNumberUser = await User.findOne({ phoneNumber });
        if (existingSameEmailUser || existingSamePhoneNumberUser) {
          // You already Signed Up, You should Sign In
          if (!existingSameEmailUser) {
            return {
              ok: false,
              error:
                "You already Signed Up with same Phone Number, You should Sign In instead",

              token: null
            };
          } else if (!existingSamePhoneNumberUser) {
            return {
              ok: false,
              error:
                "You already Signed Up with same Email, You should Sign In instead",

              token: null
            };
          }
          return {
            ok: false,
            error:
              "You already Signed Up with same Email and Phone Number, You should Sign In instead",
            token: null
          };
        } else {
          const phoneVerification = await Verification.findOne({
            payload: phoneNumber,
            verified: true
          });
          if (phoneVerification) {
            // this email is new one for new User
            const newUser = await User.create({ ...args }).save();
            if (newUser.email) {
              const emailVerification = await Verification.create({
                payload: newUser.email,
                target: "EMAIL"
              }).save();
              await sendVerificationEmail(
                newUser.fullName,
                emailVerification.key
              );
            }
            const token = createJWT(newUser.id);
            return { ok: true, error: null, token };
          } else {
            return {
              ok: false,
              error: "You haven't verified your phone number",
              token: null
            };
          }
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
