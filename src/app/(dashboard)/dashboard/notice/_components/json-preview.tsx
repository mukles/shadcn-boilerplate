"use client";

import { useNotices } from "@/components/notices/notice-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function JSONPreview() {
  const { notices: noticeData } = useNotices();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Current Data (JSON Preview)</CardTitle>
      </CardHeader>
      <CardContent>
        <pre className="border-border bg-muted max-h-96 overflow-auto rounded-lg border p-4 font-mono text-sm">
          {JSON.stringify(noticeData, null, 2)}
        </pre>
      </CardContent>
    </Card>
  );
}
