import { Grid, Typography } from '@mui/material'
import React from 'react'

function ProjectCard({project}) {
  return (
    <Grid>
      <Typography variant="h5" color="initial">{project.title}</Typography>
        <img src={project.img} alt=''/>
    </Grid>
  )
}

export default ProjectCard