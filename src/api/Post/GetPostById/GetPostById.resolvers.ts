import { Resolvers } from "../../../types/resolvers";
import {
  GetPostByIdResponse,
  GetPostByIdQueryArgs
} from "../../../types/graph";
import Post from "../../../entities/Post";
import Clap from "../../../entities/Clap";
import User from "../../../entities/User";

const resolvers: Resolvers = {
  Query: {
    GetPostById: async (
      _,
      args: GetPostByIdQueryArgs,
      { req }
    ): Promise<GetPostByIdResponse> => {
      const { postId } = args;
      const user: User = req.user;
      try {
        const post = await Post.findOne(
          { id: postId },
          {
            relations: [
              "category",
              "category.wikiImages",
              "category.parent",
              "user",
              "comments",
              "comments.user",
              "comments.childrenComments",
              "comments.childrenComments.user"
            ]
          }
        );
        if (post) {
          post.view += 1;
          post.save();
          const comments = [];
          post.comments = post.comments;
          const Comments = ({ items }) => {
            // console.log(items);
            return items.map(item => {
              const commentTemp = post.comments.find(
                comment => comment.id === item.id
              );
              if (commentTemp.childrenComments.length > 0) {
                comments.push(commentTemp);
                Comments({ items: commentTemp.childrenComments });
              } else {
                comments.push(commentTemp);
              }
            });
          };
          post.comments.forEach(comment => {
            if (comment.level === 1) {
              comments.push(comment);
              Comments({ items: comment.childrenComments });
            }
          });
          // comments = [...post.comments];
          post.comments = comments;
          if (user) {
            if (user.id === post.user.id) {
              return {
                ok: true,
                error: null,
                post,
                isClapped: true,
                isMine: true
              };
            } else {
              const isClapped = await Clap.findOne({
                postId,
                senderId: user.id
              });
              if (isClapped) {
                return {
                  ok: true,
                  error: null,
                  post,
                  isClapped: true,
                  isMine: false
                };
              } else {
                return {
                  ok: true,
                  error: null,
                  post,
                  isClapped: false,
                  isMine: false
                };
              }
            }
          } else {
            return {
              ok: true,
              error: null,
              post,
              isClapped: false,
              isMine: false
            };
          }
        } else {
          return {
            ok: false,
            error: "Have no post with this ID",
            post: null,
            isClapped: null,
            isMine: null
          };
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          post: null,
          isClapped: null,
          isMine: null
        };
      }
    }
  }
};

export default resolvers;
