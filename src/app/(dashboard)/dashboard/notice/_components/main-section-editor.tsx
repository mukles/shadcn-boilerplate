"use client";

import { ExtractVariables, updateMainSectionAction } from "@/actions";
import { useNotices } from "@/components/notices/notice-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { NoticeData } from "@/types";
import { Save, X } from "lucide-react";
import React, { useActionState, useState } from "react";

interface MainSectionEditorProps {
  setEditingMain: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MainSectionEditor({
  setEditingMain,
}: MainSectionEditorProps) {
  const { notices: noticeData, updateMain } = useNotices();

  const [message, formAction] = useActionState(updateMainSectionAction, null);

  const [tempData, setTempData] = useState<ExtractVariables<NoticeData>>({
    title: noticeData?.title || "",
    description: noticeData?.description || "",
  });

  function handleOnChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;
    setTempData((prev) => ({ ...prev, [name]: value }));
  }

  function handleReset() {
    setTempData({
      title: noticeData?.title || "",
      description: noticeData?.description || "",
    });
    setEditingMain(false);
  }

  const updateMainSection = formAction.bind(null, {
    ...tempData,
    id: noticeData?.id!,
  });

  return (
    <Card className="border-2 border-blue-300 bg-blue-50">
      <CardContent className="p-4">
        <form
          className="space-y-4"
          action={async () => {
            updateMain({
              title: tempData.title,
              description: tempData.description,
            });
            updateMainSection();
            setEditingMain(false);
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="section-title">Section Title *</Label>
            <Input
              id="section-title"
              name="title"
              value={tempData.title}
              onChange={handleOnChange}
              placeholder="Enter section title"
              className="focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="section-description">Section Description</Label>
            <Textarea
              id="section-description"
              value={tempData.description}
              onChange={handleOnChange}
              placeholder="Enter section description"
              rows={3}
              name="description"
              className="focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>

            <Button variant="secondary" onClick={handleReset}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
          </div>
        </form>
        <p aria-live="polite" className="sr-only" role="status">
          {message}
        </p>
      </CardContent>
    </Card>
  );
}
