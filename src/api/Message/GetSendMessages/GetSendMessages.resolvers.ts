import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import User from "../../../entities/User";
import Message from "../../../entities/Message";
import { GetSendMessagesResponse } from "../../../types/graph";

const resolvers: Resolvers = {
  Query: {
    GetSendMessages: privateResolver(
      async (_, __, { req }): Promise<GetSendMessagesResponse> => {
        const user: User = req.user;
        try {
          const messages = await Message.find({ senderId: user.id });
          return {
            ok: true,
            error: null,
            messages
          };
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            messages: null
          };
        }
      }
    )
  }
};

export default resolvers;
