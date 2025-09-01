import { notFound } from "next/navigation";
import { getCourseById } from "../../../../api/course";
// import { DataTable } from "../../../../components/data-table";
import CoursePageClient from "./client";
// import { findGroup } from "../../../../api/group";

export default async function CoursePage($: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await $.params;

  const course = await getCourseById(id)
    .then((res) => res.data)
    .catch(() => notFound());

  // const groups = await findGroup({ course_ID: course._id })
  //   .then((res) => res.data);

  return (
    <div>
      <h1 className="text-2xl mb-4">{course.name}</h1>
      <CoursePageClient course={course} />
    </div>
  );
}
