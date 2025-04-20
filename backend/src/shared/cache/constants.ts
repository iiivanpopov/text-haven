import { Exposure } from "@prisma"
import { CacheKeyFieldMap } from "./types"

export const KEYS: CacheKeyFieldMap = {
	file: ["fileId", "folderId", "userId"],
	folder: ["folderId", "parentId", "userId"],
	settings: ["userId"],
	user: ["userId"],
}

export const EXPOSURES: [Exposure, undefined] = ["PUBLIC", undefined]
