import CreateActingForm from "./CreateActingForm";
import CreateCommercialForm from "./CreateCommercialForm";
import CreateFilmForm from "./CreateFilmForm";
import CreatePhotographyForm from "./CreatePhotographyForm";
import CreateSketchForm from "./CreateSketchForm";

export default function CreatePage({ params }: { params: { type: string } }) {
  if (params.type == "acting") {
    return (
      <>
        <CreateActingForm />
      </>
    );
  } else if (params.type == "commercial") {
    return (
      <>
        <CreateCommercialForm />
      </>
    );
  } else if (params.type == "film") {
    return (
      <>
        <CreateFilmForm />
      </>
    );
  } else if (params.type == "photography") {
    return (
      <>
        <CreatePhotographyForm />
      </>
    );
  } else if (params.type == "sketch") {
    return (
      <>
        <CreateSketchForm />
      </>
    );
  } else {
    return (
      <div className="px-12 flex justify-center h-screen w-screen align-middle">
        Error: Invalid Param Type
      </div>
    );
  }
}
