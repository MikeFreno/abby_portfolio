import CreateCommercialForm from "./CreateCommercialForm";
import CreateMovieForm from "./CreateMovieForm";
import CreatePhotographyForm from "./CreatePhotographyForm";

export default function CreatePage({ params }: { params: { type: string } }) {
  if (params.type == "movie") {
    return (
      <>
        <CreateMovieForm />
      </>
    );
  } else if (params.type == "photography") {
    return (
      <>
        <CreatePhotographyForm />
      </>
    );
  } else if (params.type == "commercial") {
    return (
      <>
        <CreateCommercialForm />
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
