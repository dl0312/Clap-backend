import { Greeting } from "../../../types/graph";

const resolvers = {
  Query: {
    sayHello: (): Greeting => {
      return {
        text: "Hey how are you?",
        error: false
      };
    }
  }
};

export default resolvers;
