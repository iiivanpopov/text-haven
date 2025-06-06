import type { Exposure, TextCategory } from "@shared/types";

export interface Text {
  userId: string;
  content: string;
  id: string;
  name: string;
  exposure: Exposure;
  type: TextCategory;
  createdAt: string | Date;
}
