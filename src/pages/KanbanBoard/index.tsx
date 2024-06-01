import { useState, useEffect } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import Column from "./Column";
import { Task } from "./utils";
import { Box, Card, Grid, MenuItem, Select, Typography } from "@mui/material";
import useStyles from "./styles";
import { useKanban } from "../../hooks/useKanban";
import { toast } from "react-toastify";
import { useStore } from "zustand";
import { useTranslationStore } from "../../store";
import { Loading } from "../../components/Loading";
import { formatTimestampDate } from "../../utils/formatTimestampDate";
import { CreateTask } from "./CreateTask";
import { OutKanban } from "../../services/kanban/output/OutKanban.types";

export default function KanbanBoard() {
  const styles = useStyles();
  const { getKanbanByDate, updateTaskStatusKanban } = useKanban();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [kanban, setKanban] = useState<OutKanban | null>(null);
  const [columnsTasks, setColumnsTasks] = useState<Record<string, Task[]>>({});
  const { intl } = useStore(useTranslationStore);

  async function getKanban() {
    const data = await getKanbanByDate();
    setKanban(data);

    const initialColumnsStatus = data?.status.reduce(
      (acc, status) => {
        acc[status.name] = [];
        return acc;
      },
      {} as Record<string, Task[]>
    );

    const tasksByStatus = data?.tasks.reduce(
      (acc, task) => {
        acc[task.status].push(task);
        return acc;
      },
      initialColumnsStatus as Record<string, Task[]>
    );

    setColumnsTasks(tasksByStatus);
    setIsLoading(false);
  }

  async function updateTask(taskId: string, status: string) {
    if (kanban === null) return;
    const updateTaskPromise = () =>
      updateTaskStatusKanban({ kanbanId: kanban.id, taskId, status });
    toast.promise(updateTaskPromise, {
      error: intl("errorEditStatusKanbanTask"),
    });
  }

  useEffect(() => {
    getKanban();
  }, []);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination || source.droppableId === destination.droppableId) return;

    if (kanban === null) return;

    const task = findItemById(draggableId, columnsTasks[source.droppableId]);

    if (!task) return;
    setNewState(destination.droppableId, task);
    deletePreviousState(source.droppableId, draggableId);
  };

  function deletePreviousState(sourceDroppableId: string, taskId: string) {
    columnsTasks[sourceDroppableId] = removeItemById(
      taskId,
      columnsTasks[sourceDroppableId]
    );
    setColumnsTasks({ ...columnsTasks });
  }

  function setNewState(destinationDroppableId: string, task: Task) {
    updateTask(task.id, destinationDroppableId);
    columnsTasks[destinationDroppableId].push(task);
    setColumnsTasks({ ...columnsTasks });
  }

  function findItemById(id: string, array: Task[]) {
    return array.find((item) => item.id === id);
  }

  function removeItemById(id: string, array: Task[]) {
    return array.filter((item) => item.id !== id);
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Card sx={styles.container}>
      <Grid container columnSpacing={2} rowSpacing={4}>
        <Grid item xs={12} md={8}>
          <Typography variant="h6">Quadro Kanban</Typography>
        </Grid>
        <Grid item xs={12} md={2.5}>
          <Select fullWidth size="small">
            <MenuItem value="actualSprint">
              Sprint Atual -{" "}
              {kanban?.startDate && formatTimestampDate(kanban?.startDate)} até{" "}
              {kanban?.finalDate && formatTimestampDate(kanban?.finalDate)}
            </MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} md={1.5}>
          <CreateTask idKanban={kanban?.id} getKanban={getKanban} />
        </Grid>
        <Grid item xs={12} sx={{ height: "100%" }}>
          <DragDropContext
            onDragEnd={(result: DropResult) => handleDragEnd(result)}
          >
            <Box sx={styles.columnsContainer}>
              {columnsTasks &&
                Object.keys(columnsTasks).map((key) => (
                  <Column
                    title={key}
                    tasks={columnsTasks[key]}
                    id={key}
                    key={key}
                  />
                ))}
            </Box>
          </DragDropContext>
        </Grid>
      </Grid>
    </Card>
  );
}
