// app/api/revalidate/route.ts
import { CONTENT_WEBHOOKS, TAGS } from "@/constant";

export async function POST(req: NextRequest): Promise<NextResponse> {
  return revalidate(req);
}

// lib/custom-revalidation.ts
import { revalidatePath, revalidateTag } from "next/cache";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function revalidate(req: NextRequest): Promise<NextResponse> {
  // We always need to respond with a 200 status code to your backend,
  // otherwise it might continue to retry the request.

  const headersList = await headers();
  const topic = headersList.get("x-content-topic") || "unknown";
  const contentType = headersList.get("x-content-type") || "";
  const contentId = headersList.get("x-content-id") || "";
  const secret = req.nextUrl.searchParams.get("secret");

  console.log("Revalidation request:", { topic, contentType, contentId });

  // Validate secret
  if (!secret || secret !== process.env.CUSTOM_REVALIDATION_SECRET) {
    console.error("Invalid revalidation secret.");
    return NextResponse.json({ status: 401, error: "Unauthorized" });
  }

  // Check if this is a valid webhook topic
  const isNoticeUpdate = CONTENT_WEBHOOKS.notices.includes(topic);
  const isMeetingMinuteUpdate = CONTENT_WEBHOOKS.meetingMinutes.includes(topic);

  if (!isNoticeUpdate && !isMeetingMinuteUpdate) {
    console.log(`No revalidation needed for topic: ${topic}`);
    return NextResponse.json({
      status: 200,
      message: "No revalidation needed",
    });
  }

  const revalidated = {
    tags: [] as string[],
    paths: [] as string[],
  };

  try {
    // Handle Notice updates
    if (isNoticeUpdate) {
      revalidateTag(TAGS.notices);
      revalidateTag(TAGS.content);
      revalidated.tags.push(TAGS.notices, TAGS.content);

      // If specific notice ID provided, revalidate that too
      if (contentId) {
        const specificTag = `notice-${contentId}`;
        const specificPath = `/notices/${contentId}`;
        revalidateTag(specificTag);
        revalidatePath(specificPath);
        revalidated.tags.push(specificTag);
        revalidated.paths.push(specificPath);
      }

      // If it's a publish/unpublish event, also revalidate homepage
      if (topic.includes("publish")) {
        revalidateTag(TAGS.homepage);
        revalidatePath("/");
        revalidated.tags.push(TAGS.homepage);
        if (!revalidated.paths.includes("/")) {
          revalidated.paths.push("/");
        }
      }
    }

    // Handle Meeting Minutes updates
    if (isMeetingMinuteUpdate) {
      revalidateTag(TAGS.meetingMinutes);
      revalidateTag(TAGS.content);
      revalidated.tags.push(TAGS.meetingMinutes, TAGS.content);

      // If specific meeting minute ID provided
      if (contentId) {
        const specificTag = `meeting-minute-${contentId}`;
        const specificPath = `/meeting-minutes/${contentId}`;
        revalidateTag(specificTag);
        revalidatePath(specificPath);
        revalidated.tags.push(specificTag);
        revalidated.paths.push(specificPath);
      }
    }

    // Always revalidate search results when content changes
    if (isNoticeUpdate || isMeetingMinuteUpdate) {
      revalidateTag(TAGS.search);
      revalidated.tags.push(TAGS.search);
    }

    console.log("Revalidation completed:", revalidated);

    return NextResponse.json({
      status: 200,
      revalidated: true,
      topic,
      contentType,
      contentId,
      tags: revalidated.tags,
      paths: revalidated.paths,
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error("Revalidation error:", error);
    return NextResponse.json({
      status: 500,
      error: "Revalidation failed",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
