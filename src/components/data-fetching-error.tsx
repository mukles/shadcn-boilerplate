"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorItem {
  path?: string;
  message: string;
}

interface DataFetchErrorProps {
  title?: string;
  errors: ErrorItem[];
  onRetry?: () => void;
  className?: string;
}

export default function DataFetchError({
  title = "Failed to load data",
  errors,
  onRetry,
  className = "",
}: DataFetchErrorProps) {
  return (
    <section className={cn(className)}>
      <div className="container">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle className="flex items-center justify-between">
            {title}
            {onRetry && (
              <Button
                variant="outline"
                size="sm"
                onClick={onRetry}
                className="ml-2 h-7 bg-transparent px-2 text-xs"
              >
                <RefreshCw className="mr-1 h-3 w-3" />
                Retry
              </Button>
            )}
          </AlertTitle>
          <AlertDescription>
            <ul className="mt-2 ml-4 list-disc space-y-1">
              {errors.map((error, index) => (
                <li key={index} className="text-sm">
                  {error.path && (
                    <strong className="font-medium">{error.path}: </strong>
                  )}
                  {error.message}
                </li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      </div>
    </section>
  );
}
