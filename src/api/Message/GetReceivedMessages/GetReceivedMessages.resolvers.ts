import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import User from "../../../entities/User";
import { GetReceivedMessagesResponse } from "../../../types/graph";
import Message from "../../../entities/Message";

const resolvers: Resolvers = {
  Query: {
    GetReceivedMessages: privateResolver(
      async (_, __, { req }): Promise<GetReceivedMessagesResponse> => {
        const user: User = req.user;
        try {
          const messages = await Message.find({ receiverId: user.id });
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
