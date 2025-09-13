"use server";

import { ExtractVariables, fetchApi } from "@/actions";
import { TAGS } from "@/constant";
import { Notice, NoticeData } from "@/types";
import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag,
  revalidateTag,
} from "next/cache";

export async function getNotices() {
  "use cache";
  cacheTag(TAGS.notices);
  cacheLife("days");
  return await fetchApi<NoticeData>({
    endPoint: "/notices",
    method: "GET",
  });
}

export async function toggleEnableAction(prevState: any, noticeId: string) {
  try {
    if (!noticeId) {
      throw new Error("Notice ID is required");
    }
    await fetchApi<{
      variables: { enabled: boolean };
    }>({
      endPoint: `/notices/${noticeId}/toggle`,
      method: "PATCH",
    });
    revalidateTag(TAGS.notices);
  } catch (error) {
    console.log(error);
    return "Error toggling notice status";
  }
}

export async function createNotice(
  prevState: any,
  data: ExtractVariables<Notice>,
) {
  const { id, ...rest } = data;
  try {
    await fetchApi<Notice>({
      endPoint: `/notices/${id}/items`,
      method: "POST",
      body: rest,
    });
    revalidateTag(TAGS.notices);
  } catch (error) {
    console.log(error);
    return "Error creating notice";
  }
}

export async function updateNotice(
  prevState: any,
  data: ExtractVariables<Notice> & { noticeId: string },
) {
  const { id, noticeId, ...rest } = data;
  try {
    if (!id || !noticeId) {
      throw new Error("Notice ID is required");
    }
    await fetchApi<Notice>({
      endPoint: `/notices/${noticeId}/items/${id}`,
      method: "PUT",
      body: rest,
    });
    revalidateTag(TAGS.notices);
  } catch (error) {
    console.log(error);
    return "Error updating notice";
  }
}

export async function deleteNoticeAction(
  prevState: any,
  {
    noticeId,
    itemId,
  }: {
    noticeId: string;
    itemId: string;
  },
) {
  try {
    if (!noticeId) {
      throw new Error("Notice ID is required");
    }
    await fetchApi<{
      variables: { enabled: boolean };
    }>({
      endPoint: `/notices/${noticeId}/items/${itemId}`,
      method: "DELETE",
    });
    revalidateTag(TAGS.notices);
  } catch (error) {
    return "Error deleting notice";
  }
}

export async function updateMainSectionAction(
  prevState: any,
  data: ExtractVariables<NoticeData>,
) {
  const { id: noticeId, ...rest } = data;
  try {
    if (!noticeId) {
      throw new Error("Notice ID is required");
    }
    await fetchApi<NoticeData>({
      endPoint: `/notices/${noticeId}`,
      method: "PUT",
      body: rest,
    });
    revalidateTag(TAGS.notices);
  } catch (error) {
    console.log(error);
    return "Error updating main section";
  }
}
