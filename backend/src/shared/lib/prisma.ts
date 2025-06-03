import { Exposure, PrismaClient } from "@prisma";

const instance = new PrismaClient();
export default instance;

export function canAccessResource(
  resource: { userId: string; exposure?: Exposure }, // targetUserId
  userId: string, // req.user.id
): boolean {
  return resource.userId === userId || resource.exposure === Exposure.PUBLIC;
}

export function resolveUserContext(
  userId: string,
  targetUserId?: string,
): [boolean, string] {
  const isOther = targetUserId !== undefined && userId !== targetUserId;
  const effectiveUserId = isOther ? targetUserId : userId;
  return [isOther, effectiveUserId];
}
