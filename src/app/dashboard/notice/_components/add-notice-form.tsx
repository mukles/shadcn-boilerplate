"use client";

import { createNotice, ExtractVariables, updateNotice } from "@/actions";
import { useNotices } from "@/components/notices/notice-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Notice } from "@/types";
import { Save, X } from "lucide-react";
import React, { useActionState, useState } from "react";

interface NoticeFormProps {
  data: ExtractVariables<Notice> | null;
  handleClose: () => void;
}

export default function NoticeForm({ data, handleClose }: NoticeFormProps) {
  const { notices: noticeData, addNotice, editNotice } = useNotices();
  const [tempNotice, setTempNotice] = useState<ExtractVariables<Notice>>({
    title: data?.title || "",
    description: data?.description || "",
    image: data?.image || undefined,
  });

  const [createMessage, createAction] = useActionState(createNotice, null);

  const [updateMessage, updateAction] = useActionState(updateNotice, null);

  const actionHandler = () => {
    if (data === null) {
      addNotice({ ...tempNotice, id: String(Date.now()) });
      createAction({
        ...tempNotice,
        id: noticeData.id,
      });
    } else if (data?.id) {
      editNotice(data.id, { ...tempNotice, id: data.id });
      return updateAction({
        ...tempNotice,
        id: tempNotice.id || data.id,
        noticeId: noticeData.id,
      });
    }
  };

  return (
    <Card
      className={cn(
        "border-2 border-gray-300 bg-gray-50",
        data === null && "border-green-200 bg-green-50",
      )}
    >
      <CardContent className="p-4">
        <form
          action={() => {
            actionHandler();
            handleClose();
          }}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="notice-title">Notice Title *</Label>
            <Input
              id="notice-title"
              value={tempNotice.title}
              onChange={(e) =>
                setTempNotice((prev) => ({ ...prev, title: e.target.value }))
              }
              className={cn(
                "focus:ring-2 focus:ring-blue-500",
                data === null && "focus:ring-2 focus:ring-green-500",
              )}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notice-description">Description *</Label>
            <Textarea
              id="notice-description"
              value={tempNotice.description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setTempNotice((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              rows={3}
              className={cn(
                "focus:ring-2 focus:ring-blue-500",
                data === null && "focus:ring-green-500",
              )}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notice-image">Image URL</Label>
            <Input
              id="notice-image"
              type="url"
              value={tempNotice.image || ""}
              onChange={(e) =>
                setTempNotice((prev) => ({ ...prev, image: e.target.value }))
              }
              placeholder="https://example.com/image.jpg"
              className={cn(
                "focus:ring-2 focus:ring-blue-500",
                data === null && "focus:ring-green-500",
              )}
            />
          </div>
          <div className="flex gap-2">
            <Button className={cn("bg-success/80 hover:bg-success/100")}>
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
            <Button onClick={handleClose} variant="secondary">
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
          </div>
        </form>

        <p aria-live="polite" className="sr-only" role="status">
          {data === null ? createMessage : updateMessage}
        </p>
      </CardContent>
    </Card>
  );
}
