import {Grid } from "@mui/material";
import React, { useState } from "react";
import ProjectCard from "../components/ProjectCard";

function Projects() {
  const [projects] = useState([
    {
      id: "dsdsds",
      title: "Redesigning the Pepsi website",
      lang: "React",
      category: "Frontend",
      img: "https://www.oberlo.com/media/1603970279-pexels-photo-3.jpg?fit=max&fm=webp&w=1824",
    },
    {
      id: "dsdsds",
      title: "Redesigning the Pepsi website",
      lang: "React",
      category: "Frontend",
      img: "https://www.oberlo.com/media/1603970279-pexels-photo-3.jpg?fit=max&fm=webp&w=1824",
    },
    {
      id: "dsdsds",
      title: "Redesigning the Pepsi website",
      lang: "React",
      category: "Frontend",
      img: "https://www.oberlo.com/media/1603970279-pexels-photo-3.jpg?fit=max&fm=webp&w=1824",
    },
  ]);
  return (
    <Grid>
      {projects.map((item) => {
        return (
          <ProjectCard key={item.id} project={item}/>
        );
      })}
    </Grid>
  );
}

export default Projects;
