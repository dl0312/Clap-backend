import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import User from "../../../entities/User";
import Message from "../../../entities/Message";
import {
  SendMessageResponse,
  SendMessageMutationArgs
} from "../../../types/graph";

const resolvers: Resolvers = {
  Mutation: {
    SendMessage: privateResolver(
      async (
        _,
        args: SendMessageMutationArgs,
        { req }
      ): Promise<SendMessageResponse> => {
        const user: User = req.user;
        const { text, receiverId } = args;
        try {
          const receiver = await User.findOne({ id: receiverId });
          if (receiver) {
            if (receiverId !== user.id) {
              await Message.create({
                senderId: user.id,
                receiverId,
                text
              }).save();
              return {
                ok: true,
                error: null
              };
            } else {
              return {
                ok: false,
                error: "You can't send message yourself"
              };
            }
          } else {
            return {
              ok: false,
              error: "Has no User with that ID"
            };
          }
        } catch (error) {
          return {
            ok: false,
            error: error.message
          };
        }
      }
    )
  }
};

export default resolvers;
