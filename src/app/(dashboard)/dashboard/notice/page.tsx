"use client";

import { useNotices } from "@/components/notices/notice-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit2 } from "lucide-react";
import { useState } from "react";
import JSONPreview from "./_components/json-preview";
import MainSectionEditor from "./_components/main-section-editor";
import NoticeList from "./_components/notice-list";
import NoticeToggle from "./_components/notice-toggle";

export default function NoticeManagementDemo() {
  const { notices: noticeData } = useNotices();
  const [editingMain, setEditingMain] = useState(false);

  return (
    <div className="mx-auto space-y-8 bg-white p-6">
      <div>
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          Notice Management Demo
        </h1>
        <p className="text-gray-600">
          Manage your notice sections and individual notices
        </p>
      </div>

      {/* Main Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">Main Section Settings</CardTitle>
            <div className="flex items-center gap-4">
              <NoticeToggle />

              {!editingMain && (
                <Button onClick={() => setEditingMain(true)}>
                  <Edit2 className="mr-2 h-4 w-4" />
                  Edit Section
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {editingMain ? (
            <MainSectionEditor setEditingMain={setEditingMain} />
          ) : (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">
                {noticeData?.title}
              </h3>
              <p className="text-gray-600">{noticeData?.description}</p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Status:</span>
                <Badge variant={noticeData?.enable ? "default" : "destructive"}>
                  {noticeData?.enable ? "Active" : "Inactive"}
                </Badge>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <NoticeList />

      {/* JSON Preview */}
      <JSONPreview />
    </div>
  );
}
