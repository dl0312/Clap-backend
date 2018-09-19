import Post from "../../../entities/Post";
import User from "../../../entities/User";
import { AddPostMutationArgs, AddPostResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
  Mutation: {
    AddPost: privateResolver(
      async (
        _,
        args: AddPostMutationArgs,
        { req }
      ): Promise<AddPostResponse> => {
        const user: User = req.user;
        try {
          const post = await Post.create({
            ...args,
            user
          }).save();
          return {
            ok: true,
            error: null,
            postId: post.id
          };
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            postId: null
          };
        }
      }
    )
  }
};

export default resolvers;
