"use server";

import { fetchApi } from "@/actions";
import { TAGS } from "@/constant";
import { Notice } from "@/types";
import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag,
} from "next/cache";

export async function getNotices() {
  "use cache";
  cacheTag(TAGS.notices);
  cacheLife("days");
  return await fetchApi<Notice[]>({
    endPoint: "/notices",
    method: "GET",
  });
}
