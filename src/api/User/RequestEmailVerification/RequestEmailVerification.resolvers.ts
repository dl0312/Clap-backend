import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { RequestEmailVerificationResponse } from "../../../types/graph";
import User from "../../../entities/User";
import Verification from "../../../entities/Verification";
import { sendVerificationEmail } from "../../../utils/sendEmail";

const resolvers: Resolvers = {
  Mutation: {
    RequestEmailVerification: privateResolver(
      async (_, __, { req }): Promise<RequestEmailVerificationResponse> => {
        const user: User = req.user;
        if (user.email) {
          try {
            if (!user.verifiedEmail) {
              const oldVerification = await Verification.findOne({
                payload: user.email
              });
              if (oldVerification) {
                oldVerification.remove();
              }
              const newVerification = await Verification.create({
                payload: user.email,
                target: "EMAIL"
              }).save();
              await sendVerificationEmail(user.nickName, newVerification.key);
              return {
                ok: true,
                error: null
              };
            } else {
              return {
                ok: false,
                error: "You already verified your email"
              };
            }
          } catch (error) {
            return {
              ok: false,
              error: error.message
            };
          }
        } else {
          return {
            ok: false,
            error: "Your user has no email"
          };
        }
      }
    )
  }
};

export default resolvers;
