import { Droppable } from "react-beautiful-dnd";
import useStyles from "./styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "../Card";
import { Task } from "../utils";
import { useStore } from "zustand";
import { useTranslationStore } from "../../../store";

interface ColumnProps {
  title: string;
  tasks: Task[];
  id: string;
}

export default function Column({ title, tasks, id }: ColumnProps) {
  const styles = useStyles();
  const { intl } = useStore(useTranslationStore);
  return (
    <Paper sx={styles.container}>
      <Typography variant="h6" sx={styles.title}>
        {intl(title)}
      </Typography>
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <Box
            ref={provided.innerRef}
            {...provided.droppableProps}
            sx={styles.taskList(snapshot.isDraggingOver)}
          >
            {tasks.map((task, index) => (
              <Card key={index} index={index} task={task} />
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </Paper>
  );
}
