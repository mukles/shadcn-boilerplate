import { getNotices } from "@/actions";
import DataFetchError from "../data-fetching-error";
import Slider from "../slider";

export default async function NoticeSection() {
  const noticeData = await getNotices();
  if ("error" in noticeData) {
    return (
      <DataFetchError
        title={noticeData.message || "Failed to load notices"}
        errors={noticeData.error}
        className="section"
      />
    );
  }

  const { result: notices } = noticeData;

  return (
    <section className="section">
      <div className="container">
        <div className="mb-8 text-center">
          <h2 className="mb-4 text-3xl font-bold">Latest Notices</h2>
          <p className="mx-auto max-w-2xl">
            Stay updated with the latest news and announcements from our team.
          </p>
        </div>

        {/* @ts-ignore */}
        <Slider data={notices} />
      </div>
    </section>
  );
}
