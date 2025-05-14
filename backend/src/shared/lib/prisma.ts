import { Exposure, PrismaClient } from "@prisma";

export default new PrismaClient();

/**
 * Checks whether a user has access to a given file or folder
 */
export function canAccessResource(
  resource: { userId: string; exposure?: Exposure },
  userId: string,
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
