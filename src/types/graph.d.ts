export const typeDefs = ["type Achievement {\n  id: Int!\n  name: String!\n  condition: String!\n  achievers: [User]\n  createdAt: String!\n  updatedAt: String\n}\n\ntype Category {\n  id: Int!\n  name: String!\n  parent: [Category]\n  child: [Category]\n  createdAt: String!\n  updatedAt: String\n}\n\ntype Clap {\n  id: Int!\n  senderId: Int!\n  sender: User!\n  receiverId: Int!\n  receiver: User!\n  # post: Post!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype AddCommentResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Mutation {\n  AddComment(postId: Int!, parentCommentId: Int, body: String!): AddCommentResponse!\n  AddPost(title: String!, body: String!): AddPostResponse!\n  DeletePost(postId: Int!): DeletePostResponse!\n  EditPost(postId: Int!, title: String, body: String): EditPostResponse!\n  CompleteEmailVerification(key: String!): CompleteEmailVerificationResponse!\n  CompletePhoneVerification(phoneNumber: String!, key: String!): CompletePhoneVerificationResponse!\n  EmailSignIn(email: String!, password: String!): EmailSignInResponse!\n  EmailSignUp(firstName: String!, lastName: String!, email: String, password: String!, profilePhoto: String!, age: Int!, phoneNumber: String!): EmailSignUpResponse!\n  FacebookConnect(firstName: String!, lastName: String!, email: String, fbId: String!): FacebookConnectResponse!\n  RequestEmailVerification: RequestEmailVerificationResponse!\n  StartPhoneVerification(phoneNumber: String!): StartPhoneVerificationResponse!\n  UpdateMyProfile(firstName: String, lastName: String, age: Int, gender: String, password: String, profilePhoto: String): UpdateMyProfileResponse!\n}\n\ntype GetCommentsByPostIdResponse {\n  ok: Boolean!\n  error: String\n  comments: [Comment]\n}\n\ntype Query {\n  GetCommentsByPostId(postId: Int!): GetCommentsByPostIdResponse!\n  GetAllPosts(limit: Int!): GetAllPostsResponse!\n  GetMyPosts: GetMyPostsResponse!\n  GetPostsByKeyword(searchType: String, keyword: String!): GetPostsByKeywordResponse!\n  GetMyProfile: GetMyProfileResponse!\n}\n\ntype Comment {\n  id: Int!\n  body: String!\n  userId: Int!\n  user: User!\n  postId: Int!\n  post: Post!\n  parentCommentId: Int\n  createdAt: String!\n  updatedAt: String\n}\n\ntype Game {\n  id: Int!\n  title: String!\n  category: Category!\n  logo: Image\n  icon: Image\n  createdAt: String!\n  updatedAt: String\n}\n\ntype Image {\n  id: Int!\n  name: String!\n  filename: String!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype Message {\n  id: Int!\n  text: String!\n  senderId: Int!\n  sender: User!\n  receiverId: Int!\n  receiver: User!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype Notification {\n  id: Int!\n  sender: User\n  receiver: User!\n  type: String!\n  postOfFollowers: Post\n  commentOnMyPost: Comment\n  commentOnMyComment: Comment\n  createdAt: String!\n  updatedAt: String\n}\n\ntype AddPostResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype DeletePostResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype EditPostResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype GetAllPostsResponse {\n  ok: Boolean!\n  error: String\n  posts: [Post]\n}\n\ntype GetMyPostsResponse {\n  ok: Boolean!\n  error: String\n  posts: [Post]\n}\n\ntype GetPostsByKeywordResponse {\n  ok: Boolean!\n  error: String\n  filterdPosts: [Post]\n}\n\ntype Post {\n  id: Int!\n  title: String!\n  body: String!\n  userId: Int!\n  user: User!\n  claps: [Clap]\n  comments: [Comment]\n  view: Int!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype Product {\n  id: Int!\n  name: String!\n  price: Int!\n  game: Game!\n  createdAt: String!\n  updatedAt: String!\n}\n\ntype CompleteEmailVerificationResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype CompletePhoneVerificationResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype EmailSignInResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype EmailSignUpResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype FacebookConnectResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype GetMyProfileResponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n\ntype RequestEmailVerificationResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype User {\n  id: Int!\n  email: String\n  verifiedEmail: Boolean!\n  firstName: String!\n  lastName: String!\n  fullName: String\n  age: Int\n  gender: String\n  password: String\n  phoneNumber: String\n  verifiedPhoneNumber: Boolean!\n  profilePhoto: String\n  fbId: String\n  messagesAsSender: [Message]\n  messagesAsReceiver: [Message]\n  certification: Boolean\n  exp: Int!\n  clapPoint: Int!\n  following: [User]\n  followers: [User]\n  achievements: [Achievement]\n  posts: [Post]\n  clapsAsSender: [Clap]\n  clapsAsReceiver: [Clap]\n  comments: [Comment]\n  notificationsAsReceiver: [Notification]\n  wikiImages: [WikiImage]\n  createdAt: String!\n  updatedAt: String\n}\n\ntype StartPhoneVerificationResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype UpdateMyProfileResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Verification {\n  id: Int!\n  target: String!\n  payload: String!\n  key: String!\n  verified: Boolean!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype WikiImage {\n  id: Int!\n  body: String!\n  userId: Int!\n  user: User!\n  createdAt: String!\n  updatedAt: String\n}\n"];
/* tslint:disable */

export interface Query {
  GetCommentsByPostId: GetCommentsByPostIdResponse;
  GetAllPosts: GetAllPostsResponse;
  GetMyPosts: GetMyPostsResponse;
  GetPostsByKeyword: GetPostsByKeywordResponse;
  GetMyProfile: GetMyProfileResponse;
}

export interface GetCommentsByPostIdQueryArgs {
  postId: number;
}

export interface GetAllPostsQueryArgs {
  limit: number;
}

export interface GetPostsByKeywordQueryArgs {
  searchType: string | null;
  keyword: string;
}

export interface GetCommentsByPostIdResponse {
  ok: boolean;
  error: string | null;
  comments: Array<Comment> | null;
}

export interface Comment {
  id: number;
  body: string;
  userId: number;
  user: User;
  postId: number;
  post: Post;
  parentCommentId: number | null;
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
  achievements: Array<Achievement> | null;
  posts: Array<Post> | null;
  clapsAsSender: Array<Clap> | null;
  clapsAsReceiver: Array<Clap> | null;
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
  senderId: number;
  sender: User;
  receiverId: number;
  receiver: User;
  createdAt: string;
  updatedAt: string | null;
}

export interface Notification {
  id: number;
  sender: User | null;
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

export interface GetMyProfileResponse {
  ok: boolean;
  error: string | null;
  user: User | null;
}

export interface Mutation {
  AddComment: AddCommentResponse;
  AddPost: AddPostResponse;
  DeletePost: DeletePostResponse;
  EditPost: EditPostResponse;
  CompleteEmailVerification: CompleteEmailVerificationResponse;
  CompletePhoneVerification: CompletePhoneVerificationResponse;
  EmailSignIn: EmailSignInResponse;
  EmailSignUp: EmailSignUpResponse;
  FacebookConnect: FacebookConnectResponse;
  RequestEmailVerification: RequestEmailVerificationResponse;
  StartPhoneVerification: StartPhoneVerificationResponse;
  UpdateMyProfile: UpdateMyProfileResponse;
}

export interface AddCommentMutationArgs {
  postId: number;
  parentCommentId: number | null;
  body: string;
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

export interface StartPhoneVerificationMutationArgs {
  phoneNumber: string;
}

export interface UpdateMyProfileMutationArgs {
  firstName: string | null;
  lastName: string | null;
  age: number | null;
  gender: string | null;
  password: string | null;
  profilePhoto: string | null;
}

export interface AddCommentResponse {
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

export interface RequestEmailVerificationResponse {
  ok: boolean;
  error: string | null;
}

export interface StartPhoneVerificationResponse {
  ok: boolean;
  error: string | null;
}

export interface UpdateMyProfileResponse {
  ok: boolean;
  error: string | null;
}

export interface Category {
  id: number;
  name: string;
  parent: Array<Category> | null;
  child: Array<Category> | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface Game {
  id: number;
  title: string;
  category: Category;
  logo: Image | null;
  icon: Image | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface Image {
  id: number;
  name: string;
  filename: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  game: Game;
  createdAt: string;
  updatedAt: string;
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
