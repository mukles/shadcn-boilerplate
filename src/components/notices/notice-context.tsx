"use client";

import { ExtractVariables } from "@/actions/utility";
import { Notice, NoticeData } from "@/types";
import { createContext, use, useContext, useMemo, useOptimistic } from "react";

type NoticeAction =
  | { type: "TOGGLE_ENABLE" }
  | { type: "UPDATE_MAIN"; payload: { title: string; description: string } }
  | { type: "ADD_NOTICE"; payload: ExtractVariables<Notice> }
  | {
      type: "EDIT_NOTICE";
      payload: { id: string; data: ExtractVariables<Notice> };
    }
  | { type: "DELETE_NOTICE"; payload: string };

// Optimistic reducer
function noticeReducer(state: NoticeData, action: NoticeAction): NoticeData {
  switch (action.type) {
    case "TOGGLE_ENABLE":
      return { ...state, enable: !state.enable };
    case "UPDATE_MAIN":
      return { ...state, ...action.payload };
    case "ADD_NOTICE":
      return {
        ...state,
        notices: [
          {
            ...action.payload,
            id: action.payload.id!,
          },
          ...state.notices,
        ],
      };
    case "EDIT_NOTICE":
      return {
        ...state,
        notices: state.notices.map((n) =>
          n.id === action.payload.id ? { ...n, ...action.payload.data } : n,
        ),
      };
    case "DELETE_NOTICE":
      return {
        ...state,
        notices: state.notices.filter((n) => n.id !== action.payload),
      };
    default:
      return state;
  }
}

type NoticeContextType = { noticePromise: Promise<NoticeData | undefined> };

const NoticeContext = createContext<NoticeContextType | undefined>(undefined);

export function NoticeProvider({
  children,
  noticePromise,
}: {
  children: React.ReactNode;
  noticePromise: Promise<NoticeData | undefined>;
}) {
  return (
    <NoticeContext.Provider value={{ noticePromise }}>
      {children}
    </NoticeContext.Provider>
  );
}

export function useNotices() {
  const context = useContext(NoticeContext);
  if (context === undefined) {
    throw new Error("useNotices must be used within a NoticeProvider");
  }
  const initialNotices = use(context.noticePromise);

  const [optimisticNotices, updateOptimisticNotices] = useOptimistic(
    initialNotices!,
    noticeReducer,
  );

  const toggleEnable = () => {
    updateOptimisticNotices({ type: "TOGGLE_ENABLE" });
  };

  const updateMain = (data: { title: string; description: string }) => {
    updateOptimisticNotices({ type: "UPDATE_MAIN", payload: data });
  };

  const addNotice = (newNotice: ExtractVariables<Notice>) => {
    const notice = {
      ...newNotice,
      id: Date.now().toString(),
    };
    updateOptimisticNotices({ type: "ADD_NOTICE", payload: notice });
  };

  const editNotice = (id: string, data: ExtractVariables<Notice>) => {
    updateOptimisticNotices({ type: "EDIT_NOTICE", payload: { id, data } });
  };

  const deleteNotice = (id: string) => {
    updateOptimisticNotices({ type: "DELETE_NOTICE", payload: id });
  };

  return useMemo(
    () => ({
      notices: optimisticNotices,
      toggleEnable,
      updateMain,
      addNotice,
      editNotice,
      deleteNotice,
    }),
    [optimisticNotices],
  );
}
