import { toggleEnableAction } from "@/actions";
import { useNotices } from "@/components/notices/notice-context";
import { Button } from "@/components/ui/button";
import { cva } from "class-variance-authority";
import { Eye, EyeOff } from "lucide-react";
import { useActionState } from "react";

const noticeToggleButton = cva(
  "border text-sm flex items-center gap-2 transition-colors",
  {
    variants: {
      enable: {
        true: "border-green-200 bg-green-50 text-green-700 hover:bg-green-100",
        false: "border-red-200 bg-red-50 text-red-700 hover:bg-red-100",
      },
    },
    defaultVariants: {
      enable: true,
    },
  },
);

export default function NoticeToggle() {
  const { toggleEnable, notices: noticeData } = useNotices();

  const [message, formAction] = useActionState(toggleEnableAction, null);
  const toggle = formAction.bind(null, noticeData?.id!);

  return (
    <div>
      <form
        action={async () => {
          toggleEnable();
          toggle();
        }}
      >
        <Button
          variant="outline"
          className={noticeToggleButton({ enable: !!noticeData?.enable })}
        >
          {noticeData?.enable ? (
            <Eye className="mr-2 h-4 w-4" />
          ) : (
            <EyeOff className="mr-2 h-4 w-4" />
          )}
          {noticeData?.enable ? "Enabled" : "Disabled"}
        </Button>
      </form>
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </div>
  );
}
