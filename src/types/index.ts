import { Book, Menu, Sunset, Trees, Zap } from "lucide-react";
import React, { ReactNode } from "react";

export interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: ReactNode;
  children?: MenuItem[];
}

export interface NavbarLogo {
  url: string;
  src: string;
  alt: string;
  title: string;
}

export interface NavbarAuth {
  login: {
    title: string;
    url: string;
  };
  signup: {
    title: string;
    url: string;
  };
}

export const iconMap: Record<string, ReactNode> = {
  Book: React.createElement(Book, { className: "size-5 shrink-0" }),
  Trees: React.createElement(Trees, { className: "size-5 shrink-0" }),
  Sunset: React.createElement(Sunset, { className: "size-5 shrink-0" }),
  Zap: React.createElement(Zap, { className: "size-5 shrink-0" }),
  Menu: React.createElement(Menu, { className: "size-5 shrink-0" }),
};

export interface MeetingMinute {
  title: string;
  description: string;
  date: string;
  time: string;
}

export interface Notice {
  _id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}
