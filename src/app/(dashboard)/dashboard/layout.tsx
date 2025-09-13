import { getNotices } from "@/actions";
import { AppSidebar } from "@/components/app-sidebar";
import { NoticeProvider } from "@/components/notices/notice-context";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const noticePromise = getNotices().then((data) => {
    if ("error" in data) {
      return undefined;
    }

    return data.result;
  });

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1 overflow-hidden px-2">
          <Button variant={"ghost"} asChild size={"icon"}>
            <SidebarTrigger />
          </Button>
          <NoticeProvider noticePromise={noticePromise}>
            {children}
          </NoticeProvider>
        </main>
      </SidebarProvider>
    </>
  );
}
