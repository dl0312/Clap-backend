import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import User from "../../../entities/User";
import Clap from "../../../entities/Clap";

const resolvers: Resolvers = {
  Mutation: {
    SendClap: privateResolver(async (_, args, { req }) => {
      const user: User = req.user;
      const { receiverId, postId } = args;
      try {
        await Clap.create({
          senderId: user.id,
          receiverId,
          postId
        }).save();
        return {
          ok: true,
          error: null
        };
      } catch (error) {
        return {
          ok: false,
          error: error.message
        };
      }
    })
  }
};

export default resolvers;
