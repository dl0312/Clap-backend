import { Resolvers } from "../../../types/resolvers";
import {
  GetPostByIdResponse,
  GetPostByIdQueryArgs
} from "../../../types/graph";
import Post from "../../../entities/Post";

const resolvers: Resolvers = {
  Query: {
    GetPostById: async (
      _,
      args: GetPostByIdQueryArgs,
      { req }
    ): Promise<GetPostByIdResponse> => {
      const { postId } = args;
      try {
        const post = await Post.findOne(
          { id: postId },
          {
            relations: [
              "category",
              "category.wikiImages",
              "category.wikiImages.shownImage",
              "category.parent",
              "user",
              "comments",
              "comments.parentComment",
              "comments.user"
            ]
          }
        );
        if (post) {
          const comments = [];
          post.comments.forEach(comment => {
            if (comment.level === 1) {
              comments.push(comment);
              post.comments.forEach(comment2 => {
                if (
                  comment2.level === 2 &&
                  comment2.parentComment.id === comment.id
                ) {
                  comments.push(comment2);
                }
              });
            }
          });
          // comments = [...post.comments];
          post.comments = comments;
          return {
            ok: true,
            error: null,
            post
          };
        } else {
          return {
            ok: false,
            error: "Have no post with this ID",
            post: null
          };
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          post: null
        };
      }
    }
  }
};

export default resolvers;
