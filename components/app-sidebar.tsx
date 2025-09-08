"use client";

import * as React from "react";
import {
  BookMarked,
  Map,
  PieChart,
  UserPlus,
  Group,
  Sigma,
  ClipboardCheck,
  FileQuestion,
} from "lucide-react";

import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import { parseJwt } from "@/lib/token";

const { email } = parseJwt(localStorage.getItem("token")!);

// This is sample data.
const data = {
  user: {
    name: "Raghed",
    // email: "m@example.com",
    email,
    avatar: "/avatars/shadcn.jpg",
  },
  projects: [
    {
      name: "Admin",
      url: "/admin",
      icon: UserPlus,
    },
    {
      name: "Courses",
      url: "/courses",
      icon: BookMarked,
    },
    {
      name: "Quizzes",
      url: "/quizzes",
      icon: Sigma,
    },
    {
      name: "Students",
      url: "/students",
      icon: PieChart,
    },
    {
      name: "Teachers",
      url: "/teachers",
      icon: Map,
    },
    {
      name: "Group",
      url: "/groups",
      icon: Group,
    },
    {
      name: "Questions",
      url: "/add-question",
      icon: ClipboardCheck,
    },
    {
      name: "Access quiz",
      url: "/access-quiz",
      icon: FileQuestion,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
