import jwt from "jsonwebtoken";
import User from "../entities/User";

const decodeJWT = async (token: string): Promise<User | undefined> => {
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_TOKEN || "");
    const { id } = decoded;
    // const user = await User.findOne(
    //   { id },
    //   { relations: ["following", "followers", "exchanges"] }
    // );
    const user = User.findOne(
      { id },
      {
        relations: [
          "following",
          "followers",
          "exchanges",
          "exchanges.product",
          "clapsAsReceiver"
        ]
      }
    );
    return user;
  } catch (error) {
    return undefined;
  }
};

export default decodeJWT;
