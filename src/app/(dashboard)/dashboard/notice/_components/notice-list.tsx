"use client";

import { useNotices } from "@/components/notices/notice-context";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit2, Plus } from "lucide-react";
import { useState } from "react";
import NoticeForm from "./add-notice-form";
import DeleteNotice from "./delete-notice";

export default function NoticeList() {
  const { notices: noticeData } = useNotices();
  const [editingNotice, setEditingNotice] = useState<string | null>(null);

  const [showAddForm, setShowAddForm] = useState(false);

  function handleCloseForm() {
    setShowAddForm(false);
    setEditingNotice(null);
  }

  function handleEditNotice(id: string) {
    setEditingNotice(id);
    setShowAddForm(false);
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">
            Notices ({noticeData?.notices.length})
          </CardTitle>
          <Button
            onClick={() => {
              setShowAddForm(true);
            }}
            className="bg-green-600 hover:bg-green-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Notice
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {showAddForm && (
          <NoticeForm data={null} handleClose={handleCloseForm} />
        )}

        {/* Add New Notice Form */}
        <div className="space-y-4">
          {noticeData.notices.map((notice) => {
            return (
              <div
                key={notice.id}
                className="rounded-lg border border-gray-200 p-4"
              >
                {editingNotice === notice.id ? (
                  <NoticeForm data={notice} handleClose={handleCloseForm} />
                ) : (
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className="bg-accent flex h-20 w-20 items-center justify-center rounded-lg">
                          {/* {notice.image && (
                            <img
                              src={notice.image}
                              alt={notice.title}
                              className="h-20 w-20 rounded-lg object-cover"
                            />
                          )} */}
                        </div>

                        <div className="flex-1">
                          <h3 className="mb-2 text-lg font-medium text-gray-800">
                            {notice.title}
                          </h3>
                          <p className="mb-2 text-gray-600">
                            {notice.description}
                          </p>
                          {notice.image && (
                            <p className="text-sm text-gray-500">
                              Image: {notice.image}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="ml-4 flex items-center gap-2">
                      <button
                        className="rounded-md p-2 text-blue-600 hover:bg-blue-100"
                        title="Edit Notice"
                        onClick={() => handleEditNotice(notice.id)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <DeleteNotice id={notice.id} />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {noticeData?.notices.length === 0 && (
          <Alert>
            <AlertDescription>
              No notices added yet. Click "Add Notice" to create your first
              notice.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
