import { Avatar, Grid, Typography } from "@mui/material";
import { Draggable } from "react-beautiful-dnd";
import useStyles from "./styles";
import { Task } from "../utils";

interface CardProps {
  task: Task;
  index: number;
}

export default function Card({ task, index }: CardProps) {
  const styles = useStyles();
  return (
    <Draggable draggableId={`${task.id}`} key={task.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Grid container p={2} sx={styles.container} columnGap={1}>
            <Grid item xs={2}>
              <Avatar />
            </Grid>
            <Grid item xs={9}>
              <Typography>{task.title}</Typography>
            </Grid>
          </Grid>
        </div>
      )}
    </Draggable>
  );
}
