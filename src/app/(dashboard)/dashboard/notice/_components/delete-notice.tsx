import { deleteNoticeAction } from "@/actions";
import { useNotices } from "@/components/notices/notice-context";
import { Trash2 } from "lucide-react";
import { useActionState } from "react";

export default function DeleteNotice({ id }: { id: string }) {
  const { deleteNotice, notices: noticeData } = useNotices();
  const [message, formAction] = useActionState(deleteNoticeAction, null);
  const addItemAction = formAction.bind(null, {
    noticeId: noticeData.id,
    itemId: id,
  });

  return (
    <>
      <form
        action={async () => {
          deleteNotice(id);
          addItemAction();
        }}
      >
        <button
          className="rounded-md p-2 text-red-600 hover:bg-red-100"
          title="Delete Notice"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </form>

      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </>
  );
}
