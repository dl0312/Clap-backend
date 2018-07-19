# clap-server

Server for the CLAP, GraphQL, TypeScript, NodeJS

## Resolvers

### Public Resolvers:

- [x] Sign In / Sign Up with Facebook
- [x] Sign In with Email
- [x] Start Phone Number Verification
- [x] Complete Phone Number Verification
- [x] Sign Up with Email

---

### Authentication:

- [x] Generate JWT
- [x] Verify JWT

### Private Resolvers:

- [x] **User**
  - [x] _Query_
    - [x] Get My Profile
    - [ ] Get My Followers
    - [ ] Get My Following
  - [x] _Mutation_
    - [x] Request Email Verification
    - [x] Complete Email Verification
    - [x] Update my Profile
    - [ ] Follow User
    - [ ] Unfollow User
- [x] **Post**
  - [x] _Query_
    - [x] Get All Posts
    - [x] Search by Keyword ( Title, Body, Both(fixing) )
    - [x] Get My Posts
  - [x] _Mutation_
    - [x] Add Post
    - [x] Edit Post
    - [x] Delete Post
- [ ] **Comment**
  - [ ] _Query_
    - [ ] Get My Comments
  - [ ] _Mutation_
    - [ ] Add Comment On Post
    - [ ] Add Commnet On Comment
    - [ ] Edit Comment
    - [ ] Delete Comment
- [ ] **Clap**
  - [ ] _Query_
    - [ ] Check My Sended Claps
    - [ ] Check My Received Claps For Each Posts
  - [ ] _Mutation_
    - [ ] Send Clap to Post
- [ ] **Image**
  - [ ] _Query_
  - [ ] _Mutation_
    - [ ] Add Image
    - [ ] Edit Image
    - [ ] Delete Image
- [ ] **Game**
  - [ ] _Query_
  - [ ] _Mutation_
    - [ ] Add Game
    - [ ] Delete Game
- [ ] **Category**
  - [ ] _Query_
  - [ ] _Mutation_
    - [ ] Add Category
    - [ ] Edit Category
    - [ ] Delete Category
- [ ] **Message**
  - [ ] _Query_
    - [ ] Check Received Messages
  - [ ] _Mutation_
    - [ ] Send a Message
- [ ] **Achievement**
  - [ ] _Query_
    - [ ] Check How Many Users Achieve
  - [ ] _Mutation_
- [ ] **Product**
  - [ ] _Query_
    - [ ] Get All Products
    - [ ] Get All Products with Game Category
    - [ ] Get Specific Product
  - [ ] _Mutation_
    - [ ] Change amount of Product
