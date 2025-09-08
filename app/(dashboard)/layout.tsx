"use client";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { PropsWithChildren, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { parseJwt } from "@/lib/token";

export default function MainLayout($: PropsWithChildren) {
  const router = useRouter();
  const paths = usePathname();

  console.log(paths.split("/"));

  useEffect(() => {
    try {
      if (
        !["admin", "teacher", "student"].includes(
          parseJwt(localStorage.getItem("token") as string).role
        )
      ) {
        router.replace("login");
      }
    } catch (error) {
      console.log(error);
    }
  }, [router]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                {paths
                  .split("/")
                  .slice(1)
                  .map((path) => (
                    <>
                      <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href={path}>{path}</BreadcrumbLink>
                      </BreadcrumbItem>

                      <BreadcrumbSeparator className="hidden md:block" />
                    </>
                  ))}

                {/* <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem> */}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{$.children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
