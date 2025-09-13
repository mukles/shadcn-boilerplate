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

  const { title, description, notices } = noticeData.result;

  return (
    <section className="section">
      <div className="container">
        <div className="mb-8 text-center">
          <h2 className="mb-4 text-3xl font-bold">{title}</h2>
          <p className="mx-auto max-w-2xl">{description}</p>
        </div>

        <Slider data={notices} />
      </div>
    </section>
  );
}
