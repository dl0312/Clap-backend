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
    - [x] Get My Followers ( Implemented on GetMyProfile )
    - [x] Get My Following ( Implemented on GetMyProfile )
  - [x] _Mutation_
    - [x] Request Email Verification
    - [x] Complete Email Verification
    - [x] Update my Profile
    - [x] Follow User
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
    - [ ] Get My Comments ( have to implement? )
    - [x] Get Comments by Post
  - [x] _Mutation_
    - [x] Add Comment On Post
    - [x] Add Commnet On Comment
    - [x] Edit Comment
    - [x] Delete Comment
- [ ] **Clap**
  - [ ] _Query_
    - [ ] Check My Sended Claps
    - [ ] Check My Received Claps For Each Posts
  - [ ] _Mutation_
    - [x] Send Clap to Post
- [ ] **Image**
  - [ ] _Query_
  - [ ] _Mutation_
    - [ ] Add Image
    - [ ] Edit Image
    - [ ] Delete Image
- [ ] **Game** ( ? )
  - [ ] _Query_
  - [ ] _Mutation_
    - [ ] Add Game
    - [ ] Delete Game
- [ ] **Category**
  - [ ] _Query_
  - [ ] _Mutation_
    - [x] Add Category ( need to implement level )
    - [ ] Edit Category ( need to fix )
    - [ ] Delete Category
- [x] **Message**
  - [x] _Query_
    - [x] Check Received Messages
    - [x] Check Send Messages
  - [x] _Mutation_
    - [x] Send a Message
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
    - [ ] Add Product
    - [ ] Change amount of Product
    - [ ] Purchase Product
- [ ] **Exchange**
  - [ ] _Query_
    - [ ] Get My Exchanges
  - [ ] _Mutation_
    - [ ] Add Exchange
