import { createRouter } from "./context";
import { z } from "zod";

export const userRouter = createRouter().query("getUser", {
  async resolve({ ctx }) {
    return await prisma?.user.findFirst({
      where: {
        email: ctx.session?.user?.email,
      },
    });
  },
});