import { Resolvers } from "../../../types/resolvers";
import {
  EmailSignUpMutationArgs,
  EmailSignUpResponse
} from "../../../types/graph";
import User from "../../../entities/User";
import createJWT from "../../../utils/createJWT";
import Verification from "../../../entities/Verification";
// import { sendVerificationEmail } from "../../../utils/sendEmail";

const validateEmail = email => {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
};

const validatePassword = password => {
  const regex = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;
  return regex.test(String(password));
};

const resolvers: Resolvers = {
  Mutation: {
    EmailSignUp: async (
      _,
      args: EmailSignUpMutationArgs
    ): Promise<EmailSignUpResponse> => {
      const { email, password } = args;
      try {
        const existingSameEmailUser = await User.findOne({ email });
        if (existingSameEmailUser) {
          // You already Signed Up, You should Sign In

          return {
            ok: false,
            error:
              "You already Signed Up with same Email, You should Sign In instead",
            token: null
          };
        } else {
          // this email is new one for new User
          const emailValidity = validateEmail(email);
          const passwordValidity = validatePassword(password);
          if (emailValidity) {
            if (passwordValidity) {
              const newUser = await User.create({ ...args }).save();
              if (newUser.email) {
                const emailVerification = await Verification.create({
                  payload: newUser.email,
                  target: "EMAIL"
                }).save();
                console.log(emailVerification);
                // await sendVerificationEmail(
                //   newUser.nickName,
                //   emailVerification.key
                // );
              }
              const token = createJWT(newUser.id);
              return { ok: true, error: null, token };
            } else {
              return {
                ok: false,
                error: "Password is not valid",
                token: null
              };
            }
          } else {
            return {
              ok: false,
              error: "Email is not valid",
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
