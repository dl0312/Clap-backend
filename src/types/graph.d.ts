export const typeDefs = ["type Achievement {\n  id: Int!\n  name: String!\n  condition: String!\n  achievers: [User]\n  createdAt: String!\n  updatedAt: String\n}\n\ntype AddCategoryResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Mutation {\n  AddCategory(name: String!, parentId: Int, childrenIds: [Int]): AddCategoryResponse!\n  DeleteCategory(categoryId: Int!): DeleteCategoryResponse!\n  EditCategory(categoryId: Int!, parentId: Int, childrenIds: [Int], name: String!): EditCategoryResponse!\n  SendClap(postId: Int!): SendClapResponse!\n  AddComment(postId: Int!, parentCommentId: Int, body: String!): AddCommentResponse!\n  DeleteComment(commentId: Int!): DeleteCommentResponse!\n  EditComment(commentId: Int!, body: String!): EditCommentResponse!\n  AddExchange(productId: Int!): AddExchangeResponse!\n  AddImage(name: String!, filename: String!): AddImageResponse!\n  SendMessage(text: String!, receiverId: Int!): SendMessageResponse!\n  AddPost(title: String!, body: String!): AddPostResponse!\n  DeletePost(postId: Int!): DeletePostResponse!\n  EditPost(postId: Int!, title: String, body: String): EditPostResponse!\n  AddProduct(name: String!, price: Int!, categoryId: Int!): AddProductResponse!\n  DeleteProduct(productId: Int!): DeleteProductResponse!\n  EditProduct(productId: Int!, name: String, price: Int, stock: Int, categoryId: Int): EditProductResponse!\n  CompleteEmailVerification(key: String!): CompleteEmailVerificationResponse!\n  CompletePhoneVerification(phoneNumber: String!, key: String!): CompletePhoneVerificationResponse!\n  EmailSignIn(email: String!, password: String!): EmailSignInResponse!\n  EmailSignUp(firstName: String!, lastName: String!, email: String, password: String!, profilePhoto: String!, age: Int!, phoneNumber: String!): EmailSignUpResponse!\n  FacebookConnect(firstName: String!, lastName: String!, email: String, fbId: String!): FacebookConnectResponse!\n  FollowUser(userId: Int!): FollowUserResponse!\n  RequestEmailVerification: RequestEmailVerificationResponse!\n  StartPhoneVerification(phoneNumber: String!): StartPhoneVerificationResponse!\n  UnfollowUser(userId: Int!): UnfollowUserResponse!\n  UpdateMyProfile(firstName: String, lastName: String, age: Int, gender: String, password: String, profilePhoto: String): UpdateMyProfileResponse!\n}\n\ntype DeleteCategoryResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype EditCategoryResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype GetAllCategoriesResponse {\n  ok: Boolean!\n  error: String\n  categories: [Category]\n}\n\ntype Query {\n  GetAllCategories: GetAllCategoriesResponse!\n  GetCommentsByPostId(postId: Int!): GetCommentsByPostIdResponse!\n  GetMyExchanges: GetMyExchangesResponse!\n  GetReceivedMessages: GetReceivedMessagesResponse!\n  GetSendMessages: GetSendMessagesResponse!\n  GetAllPosts(limit: Int!): GetAllPostsResponse!\n  GetMyPosts: GetMyPostsResponse!\n  GetPostsByKeyword(searchType: String!, keyword: String!): GetPostsByKeywordResponse!\n  GetAllProducts: GetAllProductsResponse!\n  GetMyFollowing: GetMyFollowingResponse!\n  GetMyProfile: GetMyProfileResponse!\n}\n\ntype Category {\n  id: Int!\n  name: String!\n  parent: Category\n  children: [Category]\n  # level: Int!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype SendClapResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Clap {\n  id: Int!\n  senderId: Int\n  sender: User!\n  receiverId: Int\n  receiver: User!\n  postId: Int\n  post: Post!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype AddCommentResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype DeleteCommentResponse {\n  ok: Boolean\n  error: String\n}\n\ntype EditCommentResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype GetCommentsByPostIdResponse {\n  ok: Boolean!\n  error: String\n  comments: [Comment]\n}\n\ntype Comment {\n  id: Int!\n  body: String!\n  userId: Int\n  user: User!\n  postId: Int\n  post: Post!\n  parentCommentId: Int\n  parentComment: Comment\n  createdAt: String!\n  updatedAt: String\n}\n\ntype AddExchangeResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype GetMyExchangesResponse {\n  ok: Boolean!\n  error: String\n  exchanges: [Exchange]\n}\n\ntype Exchange {\n  id: Int!\n  buyerId: Int\n  buyer: User!\n  productId: Int\n  product: Product!\n}\n\ntype AddImageResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Image {\n  id: Int!\n  name: String!\n  filename: String!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype GetReceivedMessagesResponse {\n  ok: Boolean!\n  error: String\n  messages: [Message]\n}\n\ntype GetSendMessagesResponse {\n  ok: Boolean!\n  error: String\n  messages: [Message]\n}\n\ntype SendMessageResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Message {\n  id: Int!\n  text: String!\n  senderId: Int!\n  sender: User!\n  receiverId: Int!\n  receiver: User!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype Notification {\n  id: Int!\n  receiverId: Int!\n  receiver: User!\n  type: String!\n  postOfFollowers: Post\n  commentOnMyPost: Comment\n  commentOnMyComment: Comment\n  createdAt: String!\n  updatedAt: String\n}\n\ntype AddPostResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype DeletePostResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype EditPostResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype GetAllPostsResponse {\n  ok: Boolean!\n  error: String\n  posts: [Post]\n}\n\ntype GetMyPostsResponse {\n  ok: Boolean!\n  error: String\n  posts: [Post]\n}\n\ntype GetPostsByKeywordResponse {\n  ok: Boolean!\n  error: String\n  filterdPosts: [Post]\n}\n\ntype Post {\n  id: Int!\n  title: String!\n  body: String!\n  userId: Int!\n  user: User!\n  claps: [Clap]\n  comments: [Comment]\n  view: Int!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype AddProductResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype DeleteProductResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype EditProductResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype GetAllProductsResponse {\n  ok: Boolean!\n  error: String\n  products: [Product]\n}\n\ntype Product {\n  id: Int!\n  name: String!\n  price: Int!\n  stock: Int!\n  exchanges: [Exchange]\n  category: Category!\n  createdAt: String!\n  updatedAt: String!\n}\n\ntype CompleteEmailVerificationResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype CompletePhoneVerificationResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype EmailSignInResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype EmailSignUpResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype FacebookConnectResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype FollowUserResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype GetMyFollowingResponse {\n  ok: Boolean!\n  error: String\n  following: [User]\n}\n\ntype GetMyProfileResponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n\ntype RequestEmailVerificationResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype User {\n  id: Int!\n  email: String\n  verifiedEmail: Boolean!\n  firstName: String!\n  lastName: String!\n  fullName: String\n  age: Int\n  gender: String\n  password: String\n  phoneNumber: String\n  verifiedPhoneNumber: Boolean!\n  profilePhoto: String\n  fbId: String\n  messagesAsSender: [Message]\n  messagesAsReceiver: [Message]\n  certification: Boolean\n  exp: Int!\n  clapPoint: Int!\n  following: [User]\n  followers: [User]\n  followersCount: Int\n  followingCount: Int\n  achievements: [Achievement]\n  posts: [Post]\n  exchanges: [Exchange]\n  clapsAsSender: [Clap]\n  clapsAsReceiver: [Clap]\n  clapsAsReceiverCount: Int\n  comments: [Comment]\n  notificationsAsReceiver: [Notification]\n  wikiImages: [WikiImage]\n  createdAt: String!\n  updatedAt: String\n}\n\ntype StartPhoneVerificationResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype UnfollowUserResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype UpdateMyProfileResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Verification {\n  id: Int!\n  target: String!\n  payload: String!\n  key: String!\n  verified: Boolean!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype WikiImage {\n  id: Int!\n  body: String!\n  userId: Int!\n  user: User!\n  createdAt: String!\n  updatedAt: String\n}\n"];
/* tslint:disable */

export interface Query {
  GetAllCategories: GetAllCategoriesResponse;
  GetCommentsByPostId: GetCommentsByPostIdResponse;
  GetMyExchanges: GetMyExchangesResponse;
  GetReceivedMessages: GetReceivedMessagesResponse;
  GetSendMessages: GetSendMessagesResponse;
  GetAllPosts: GetAllPostsResponse;
  GetMyPosts: GetMyPostsResponse;
  GetPostsByKeyword: GetPostsByKeywordResponse;
  GetAllProducts: GetAllProductsResponse;
  GetMyFollowing: GetMyFollowingResponse;
  GetMyProfile: GetMyProfileResponse;
}

export interface GetCommentsByPostIdQueryArgs {
  postId: number;
}

export interface GetAllPostsQueryArgs {
  limit: number;
}

export interface GetPostsByKeywordQueryArgs {
  searchType: string;
  keyword: string;
}

export interface GetAllCategoriesResponse {
  ok: boolean;
  error: string | null;
  categories: Array<Category> | null;
}

export interface Category {
  id: number;
  name: string;
  parent: Category | null;
  children: Array<Category> | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface GetCommentsByPostIdResponse {
  ok: boolean;
  error: string | null;
  comments: Array<Comment> | null;
}

export interface Comment {
  id: number;
  body: string;
  userId: number | null;
  user: User;
  postId: number | null;
  post: Post;
  parentCommentId: number | null;
  parentComment: Comment | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface User {
  id: number;
  email: string | null;
  verifiedEmail: boolean;
  firstName: string;
  lastName: string;
  fullName: string | null;
  age: number | null;
  gender: string | null;
  password: string | null;
  phoneNumber: string | null;
  verifiedPhoneNumber: boolean;
  profilePhoto: string | null;
  fbId: string | null;
  messagesAsSender: Array<Message> | null;
  messagesAsReceiver: Array<Message> | null;
  certification: boolean | null;
  exp: number;
  clapPoint: number;
  following: Array<User> | null;
  followers: Array<User> | null;
  followersCount: number | null;
  followingCount: number | null;
  achievements: Array<Achievement> | null;
  posts: Array<Post> | null;
  exchanges: Array<Exchange> | null;
  clapsAsSender: Array<Clap> | null;
  clapsAsReceiver: Array<Clap> | null;
  clapsAsReceiverCount: number | null;
  comments: Array<Comment> | null;
  notificationsAsReceiver: Array<Notification> | null;
  wikiImages: Array<WikiImage> | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface Message {
  id: number;
  text: string;
  senderId: number;
  sender: User;
  receiverId: number;
  receiver: User;
  createdAt: string;
  updatedAt: string | null;
}

export interface Achievement {
  id: number;
  name: string;
  condition: string;
  achievers: Array<User> | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  user: User;
  claps: Array<Clap> | null;
  comments: Array<Comment> | null;
  view: number;
  createdAt: string;
  updatedAt: string | null;
}

export interface Clap {
  id: number;
  senderId: number | null;
  sender: User;
  receiverId: number | null;
  receiver: User;
  postId: number | null;
  post: Post;
  createdAt: string;
  updatedAt: string | null;
}

export interface Exchange {
  id: number;
  buyerId: number | null;
  buyer: User;
  productId: number | null;
  product: Product;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  exchanges: Array<Exchange> | null;
  category: Category;
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: number;
  receiverId: number;
  receiver: User;
  type: string;
  postOfFollowers: Post | null;
  commentOnMyPost: Comment | null;
  commentOnMyComment: Comment | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface WikiImage {
  id: number;
  body: string;
  userId: number;
  user: User;
  createdAt: string;
  updatedAt: string | null;
}

export interface GetMyExchangesResponse {
  ok: boolean;
  error: string | null;
  exchanges: Array<Exchange> | null;
}

export interface GetReceivedMessagesResponse {
  ok: boolean;
  error: string | null;
  messages: Array<Message> | null;
}

export interface GetSendMessagesResponse {
  ok: boolean;
  error: string | null;
  messages: Array<Message> | null;
}

export interface GetAllPostsResponse {
  ok: boolean;
  error: string | null;
  posts: Array<Post> | null;
}

export interface GetMyPostsResponse {
  ok: boolean;
  error: string | null;
  posts: Array<Post> | null;
}

export interface GetPostsByKeywordResponse {
  ok: boolean;
  error: string | null;
  filterdPosts: Array<Post> | null;
}

export interface GetAllProductsResponse {
  ok: boolean;
  error: string | null;
  products: Array<Product> | null;
}

export interface GetMyFollowingResponse {
  ok: boolean;
  error: string | null;
  following: Array<User> | null;
}

export interface GetMyProfileResponse {
  ok: boolean;
  error: string | null;
  user: User | null;
}

export interface Mutation {
  AddCategory: AddCategoryResponse;
  DeleteCategory: DeleteCategoryResponse;
  EditCategory: EditCategoryResponse;
  SendClap: SendClapResponse;
  AddComment: AddCommentResponse;
  DeleteComment: DeleteCommentResponse;
  EditComment: EditCommentResponse;
  AddExchange: AddExchangeResponse;
  AddImage: AddImageResponse;
  SendMessage: SendMessageResponse;
  AddPost: AddPostResponse;
  DeletePost: DeletePostResponse;
  EditPost: EditPostResponse;
  AddProduct: AddProductResponse;
  DeleteProduct: DeleteProductResponse;
  EditProduct: EditProductResponse;
  CompleteEmailVerification: CompleteEmailVerificationResponse;
  CompletePhoneVerification: CompletePhoneVerificationResponse;
  EmailSignIn: EmailSignInResponse;
  EmailSignUp: EmailSignUpResponse;
  FacebookConnect: FacebookConnectResponse;
  FollowUser: FollowUserResponse;
  RequestEmailVerification: RequestEmailVerificationResponse;
  StartPhoneVerification: StartPhoneVerificationResponse;
  UnfollowUser: UnfollowUserResponse;
  UpdateMyProfile: UpdateMyProfileResponse;
}

export interface AddCategoryMutationArgs {
  name: string;
  parentId: number | null;
  childrenIds: Array<number> | null;
}

export interface DeleteCategoryMutationArgs {
  categoryId: number;
}

export interface EditCategoryMutationArgs {
  categoryId: number;
  parentId: number | null;
  childrenIds: Array<number> | null;
  name: string;
}

export interface SendClapMutationArgs {
  postId: number;
}

export interface AddCommentMutationArgs {
  postId: number;
  parentCommentId: number | null;
  body: string;
}

export interface DeleteCommentMutationArgs {
  commentId: number;
}

export interface EditCommentMutationArgs {
  commentId: number;
  body: string;
}

export interface AddExchangeMutationArgs {
  productId: number;
}

export interface AddImageMutationArgs {
  name: string;
  filename: string;
}

export interface SendMessageMutationArgs {
  text: string;
  receiverId: number;
}

export interface AddPostMutationArgs {
  title: string;
  body: string;
}

export interface DeletePostMutationArgs {
  postId: number;
}

export interface EditPostMutationArgs {
  postId: number;
  title: string | null;
  body: string | null;
}

export interface AddProductMutationArgs {
  name: string;
  price: number;
  categoryId: number;
}

export interface DeleteProductMutationArgs {
  productId: number;
}

export interface EditProductMutationArgs {
  productId: number;
  name: string | null;
  price: number | null;
  stock: number | null;
  categoryId: number | null;
}

export interface CompleteEmailVerificationMutationArgs {
  key: string;
}

export interface CompletePhoneVerificationMutationArgs {
  phoneNumber: string;
  key: string;
}

export interface EmailSignInMutationArgs {
  email: string;
  password: string;
}

export interface EmailSignUpMutationArgs {
  firstName: string;
  lastName: string;
  email: string | null;
  password: string;
  profilePhoto: string;
  age: number;
  phoneNumber: string;
}

export interface FacebookConnectMutationArgs {
  firstName: string;
  lastName: string;
  email: string | null;
  fbId: string;
}

export interface FollowUserMutationArgs {
  userId: number;
}

export interface StartPhoneVerificationMutationArgs {
  phoneNumber: string;
}

export interface UnfollowUserMutationArgs {
  userId: number;
}

export interface UpdateMyProfileMutationArgs {
  firstName: string | null;
  lastName: string | null;
  age: number | null;
  gender: string | null;
  password: string | null;
  profilePhoto: string | null;
}

export interface AddCategoryResponse {
  ok: boolean;
  error: string | null;
}

export interface DeleteCategoryResponse {
  ok: boolean;
  error: string | null;
}

export interface EditCategoryResponse {
  ok: boolean;
  error: string | null;
}

export interface SendClapResponse {
  ok: boolean;
  error: string | null;
}

export interface AddCommentResponse {
  ok: boolean;
  error: string | null;
}

export interface DeleteCommentResponse {
  ok: boolean | null;
  error: string | null;
}

export interface EditCommentResponse {
  ok: boolean;
  error: string | null;
}

export interface AddExchangeResponse {
  ok: boolean;
  error: string | null;
}

export interface AddImageResponse {
  ok: boolean;
  error: string | null;
}

export interface SendMessageResponse {
  ok: boolean;
  error: string | null;
}

export interface AddPostResponse {
  ok: boolean;
  error: string | null;
}

export interface DeletePostResponse {
  ok: boolean;
  error: string | null;
}

export interface EditPostResponse {
  ok: boolean;
  error: string | null;
}

export interface AddProductResponse {
  ok: boolean;
  error: string | null;
}

export interface DeleteProductResponse {
  ok: boolean;
  error: string | null;
}

export interface EditProductResponse {
  ok: boolean;
  error: string | null;
}

export interface CompleteEmailVerificationResponse {
  ok: boolean;
  error: string | null;
}

export interface CompletePhoneVerificationResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface EmailSignInResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface EmailSignUpResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface FacebookConnectResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface FollowUserResponse {
  ok: boolean;
  error: string | null;
}

export interface RequestEmailVerificationResponse {
  ok: boolean;
  error: string | null;
}

export interface StartPhoneVerificationResponse {
  ok: boolean;
  error: string | null;
}

export interface UnfollowUserResponse {
  ok: boolean;
  error: string | null;
}

export interface UpdateMyProfileResponse {
  ok: boolean;
  error: string | null;
}

export interface Image {
  id: number;
  name: string;
  filename: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface Verification {
  id: number;
  target: string;
  payload: string;
  key: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string | null;
}
