import EditFilmForm from "./EditFilmForm";
import EditPhotographyForm from "./EditPhotographyForm";
import EditCommercialForm from "./EditCommercialForm";
import EditActingForm from "./EditActingForm";
import EditSketchForm from "./EditSketchForm";

export default async function EditSpecificPage({
  params,
}: {
  params: { type: string; projectID: string };
}) {
  const projectResponse = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/database/${params.type}/get_by_id/${params.projectID}`,
    {
      method: "GET",
      cache: "no-store",
    },
  );
  const project = (await projectResponse.json()).row;

  if (project) {
    if (params.type == "film") {
      return (
        <>
          <EditFilmForm
            id={project.id}
            title={project.title}
            blurb={project.blurb}
            link={project.link}
            attachments={project.attachments}
            published={project.published}
          />
        </>
      );
    } else if (params.type == "acting") {
      return (
        <>
          <EditActingForm
            id={project.id}
            title={project.title}
            blurb={project.blurb}
            link={project.link}
            attachments={project.attachments}
            published={project.published}
          />
        </>
      );
    } else if (params.type == "sketch") {
      return (
        <>
          <EditSketchForm
            id={project.id}
            title={project.title}
            blurb={project.blurb}
            link={project.link}
            attachments={project.attachments}
            published={project.published}
          />
        </>
      );
    } else if (params.type == "photography") {
      return (
        <>
          <EditPhotographyForm
            id={project.id}
            title={project.title}
            blurb={project.blurb}
            images={project.images}
            captions={project.captions}
            published={project.published}
            photography_flow={project.photography_flow}
          />
        </>
      );
    } else if (params.type == "commercial") {
      return (
        <>
          <EditCommercialForm
            id={project.id}
            title={project.title}
            blurb={project.blurb}
            link={project.link}
            attachments={project.attachments}
            published={project.published}
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
