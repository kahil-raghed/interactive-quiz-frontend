export default async function CoursePage($: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await $.params;
  return <div>Course {id}</div>;
}
