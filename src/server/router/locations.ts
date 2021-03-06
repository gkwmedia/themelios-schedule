import { createRouter } from "./context";
import { z } from "zod";

export const locationRouter = createRouter()
  .query("getLocationsByOrg", {
    async resolve({ ctx }) {
      const orgID = await prisma?.user.findFirst({
        select: { organizationId: true },
        where: { id: ctx.session?.user.id },
      });
      return await prisma?.locations.findMany({
        where: { organizationId: orgID?.organizationId },
      });
    },
  })
  .mutation("createLocation", {
    input: z.string(),
    async resolve({ ctx, input }) {
      const orgID = await prisma?.user.findFirst({
        select: { organizationId: true },
        where: { id: ctx.session?.user.id },
      });
      return await prisma?.locations.create({
        data: {
          name: input,
          organizationId: orgID?.organizationId,
        },
      });
    },
  })
  .mutation("editLocationByID", {
    input: z.object({
      id: z.string(),
      name: z.string(),
    }),
    async resolve({ input }) {
      return await prisma?.locations.update({
        data: {
          name: input.name,
        },
        where: { id: input.id },
      });
    },
  })
  .mutation("deletebyId", {
    input: z.string(),
    async resolve({ input }) {
      return await prisma?.locations.delete({
        where: { id: input },
      });
    },
  });
