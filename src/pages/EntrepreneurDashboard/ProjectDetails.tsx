import ProjectForm, { ProjectFormType } from "@/components/forms/ProjectForm";
import { Button } from "@/components/ui/button";
import { dummyProjects } from "@/DummyData/ProjectsData";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [mode, setMode] = useState<"view" | "edit">("view");
  const navigate = useNavigate();
  const project = dummyProjects.find((project) => project._id === id);

  const handleFormSubmit = async (updatedProject: ProjectFormType): Promise<void> => {
    console.log("Updated Project:", updatedProject);
    setMode("view");
  };


  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-3xl font-bold text-red-600 mb-6">404 - Project Not Found</h1>
        <p className="text-gray-700 mb-4">
          The project you're looking for doesn't exist or might have been removed.
        </p>
        <Button
          onClick={() => navigate("/entrepreneur-dashboard/projects")}
          className="text-white bg-blue-500 hover:bg-blue-600"
        >
          Back to Projects
        </Button>
      </div>
    );
  }

  if (mode === "edit") {
    return (
        <ProjectForm
          onClose={() => setMode("view")}
          mode="edit"
          projectData={project}
          onSubmit={handleFormSubmit}
        />
    );
  }

  return (
    <div className="container mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">{project.project_name}</h1>
      <p className="text-lg text-gray-700 mb-8">{project.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Project Details</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>
              <strong>Category:</strong> {project.field}
            </li>
            <li>
              <strong>Status:</strong>{" "}
              <span className={project.visibility ? "text-green-500" : "text-red-500"}>
                {project.visibility ? "Visible" : "Hidden"}
              </span>
            </li>
            <li>
              <strong>Owner:</strong> {project.target}
            </li>
            <li>
              <strong>Budget:</strong> ${project.budget}
            </li>
            <li>
              <strong>Deadline:</strong> {new Date(project.deadline).toLocaleDateString()}
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-xl font-semibold">Additional Information</h3>
            <p className="text-gray-700 mt-2">
              Explore this project's potential and collaborate to bring it to life. For further inquiries, contact the owner.
            </p>
          </div>
          <Button
            onClick={() => setMode("edit")}
            className="text-white w-1/2 bg-blue-500 hover:bg-blue-600"
          >
            Edit Project
          </Button>
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <Button
          onClick={() => navigate("/entrepreneur-dashboard/projects")}
          className="text-white bg-gray-500 hover:bg-gray-600"
        >
          Back to Projects
        </Button>
      </div>
    </div>
  );
};

export default ProjectDetails;
