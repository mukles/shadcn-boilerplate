import { Notice } from "@/types";
import { fetchApi } from "./utiles";

export async function getNotices() {
  return await fetchApi<Notice[]>({
    endPoint: "/notices",
    method: "GET",
  });
}
