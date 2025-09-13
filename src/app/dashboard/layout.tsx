import { getNotices } from "@/actions";
import { NoticeProvider } from "@/components/notices/notice-context";

export default function Layout({ children }: { children: React.ReactNode }) {
  const noticePromise = getNotices().then((data) => {
    if ("error" in data) {
      return undefined;
    }

    return data.result;
  });

  return (
    <div className="grid grid-cols-12">
      <div className="bg-accent col-span-3"></div>
      <div className="col-span-9">
        <NoticeProvider noticePromise={noticePromise}>
          {children}
        </NoticeProvider>
      </div>
    </div>
  );
}
