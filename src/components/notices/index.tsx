import { getNotices } from "@/actions";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import NoticesSlider from "./notice-slider";

export default async function NoticeSection() {
  const noticeData = await getNotices();

  if ("error" in noticeData) {
    return (
      <div className="bg-destructive text-foreground rounded-md p-4">
        <h2 className="font-bold">Failed to load notices</h2>
        <ul className="ml-6 list-disc">
          {noticeData.error.map((e, i) => (
            <li key={i}>
              <strong>{e.path}:</strong> {e.message}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const { result: notices } = noticeData;
  console.log({ noticeDataLength: notices?.length });
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12">
      <div className="mb-8 text-center">
        <h2 className="mb-4 text-3xl font-bold text-gray-900">
          Latest Notices
        </h2>
        <p className="mx-auto max-w-2xl text-gray-600">
          Stay updated with the latest news and announcements from our team.
        </p>
      </div>
      <NoticesSlider notices={notices} />
    </section>
  );
}
