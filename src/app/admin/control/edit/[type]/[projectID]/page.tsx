import { Row } from "~/types/db";
import EditFilmForm from "./EditFilmForm";
import EditPhotographyForm from "./EditPhotographyForm";
import EditCommercialForm from "./EditCommercialForm";

interface ResponseData {
  error: string | null;
  rows: Row[] | null;
}

export default async function EditSpecificPage({
  params,
}: {
  params: { type: string; projectID: string };
}) {
  const projectResponse = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/database/get-project-by-id`,
    {
      method: "POST",
      body: JSON.stringify({ id: params.projectID }),
      cache: "no-store",
    }
  );
  const project = (await projectResponse.json()) as ResponseData;

  if (project.rows) {
    if (project.rows[0].Type == "film") {
      return (
        <>
          <EditFilmForm
            id={project.rows[0].id}
            Title={project.rows[0].Title}
            Blurb={project.rows[0].Blurb}
            Embedded_Link={project.rows[0].Embedded_Link}
            Attachments={project.rows[0].Attachments}
            Published={project.rows[0].Published}
            Type={project.rows[0].Type}
          />
        </>
      );
    } else if (project.rows[0].Type == "photography") {
      return (
        <>
          <EditPhotographyForm
            id={project.rows[0].id}
            Title={project.rows[0].Title}
            Blurb={project.rows[0].Blurb}
            Embedded_Link={project.rows[0].Embedded_Link}
            Attachments={project.rows[0].Attachments}
            Published={project.rows[0].Published}
            Type={project.rows[0].Type}
          />
        </>
      );
    } else if (project.rows[0].Type == "commercial") {
      return (
        <>
          <EditCommercialForm
            id={project.rows[0].id}
            Title={project.rows[0].Title}
            Blurb={project.rows[0].Blurb}
            Embedded_Link={project.rows[0].Embedded_Link}
            Attachments={project.rows[0].Attachments}
            Published={project.rows[0].Published}
            Type={project.rows[0].Type}
          />
        </>
      );
    } else {
      return (
        <div className="px-12 flex justify-center h-screen w-screen align-middle">
          Error: Critical type error
        </div>
      );
    }
  } else {
    return (
      <div className="px-12 flex justify-center h-screen w-screen align-middle">
        Error: Invalid project id
      </div>
    );
  }
}
