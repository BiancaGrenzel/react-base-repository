import { useState, useEffect } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import Column from "./Column";
import { Task } from "./utils";
import { Box, Card, Grid, Typography } from "@mui/material";
import useStyles from "./styles";
import { useKanban } from "../../hooks/useKanban";
import { TKanban } from "../../types/kanban.types";
import { toast } from "react-toastify";
import { useStore } from "zustand";
import { useTranslationStore } from "../../store";

export default function KanbanBoard() {
  const styles = useStyles();
  const [completed, setCompleted] = useState<Task[]>([]);
  const [incomplete, setIncomplete] = useState<Task[]>([]);
  const [backlog, setBacklog] = useState<Task[]>([]);
  const [inReview, setInReview] = useState<Task[]>([]);
  const [inProgress, setInProgress] = useState<Task[]>([]);
  const { getKanbanByDate, updateTaskStatusKanban } = useKanban();
  const [kanban, setKanban] = useState<TKanban | null>(null);
  const { intl } = useStore(useTranslationStore);

  async function getKanban() {
    const data = await getKanbanByDate();
    setKanban(data);
    data.tasks.forEach((task) => {
      switch (task.status) {
        case "todo":
          setIncomplete((prev) => [...prev, task]);
          break;
        case "inProgress":
          setInProgress((prev) => [...prev, task]);
          break;
        case "done":
          setCompleted((prev) => [...prev, task]);
          break;
        case "inReview":
          setInReview((prev) => [...prev, task]);
          break;
        default:
          setBacklog((prev) => [...prev, task]);
      }
    });
  }

  async function updateTask(taskId: string, status: string) {
    if (kanban === null) return;
    const updateTaskPromise = () =>
      updateTaskStatusKanban(kanban.id, taskId, status);
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

    const task = findItemById(draggableId, [
      ...incomplete,
      ...inProgress,
      ...completed,
      ...inReview,
      ...backlog,
    ]);

    if (!task) return;
    setNewState(destination.droppableId, task);
    deletePreviousState(source.droppableId, draggableId);
  };

  function deletePreviousState(sourceDroppableId: string, taskId: string) {
    switch (sourceDroppableId) {
      case "1":
        setIncomplete(removeItemById(taskId, incomplete));
        break;
      case "2":
        setInProgress(removeItemById(taskId, inProgress));
        break;
      case "3":
        setInReview(removeItemById(taskId, inReview));
        break;
      case "4":
        setBacklog(removeItemById(taskId, backlog));
        break;
      case "5":
        setCompleted(removeItemById(taskId, completed));
        break;
    }
  }

  function setNewState(destinationDroppableId: string, task: Task) {
    let updatedTask;
    switch (destinationDroppableId) {
      case "1":
        updatedTask = { ...task, status: "todo" };
        setIncomplete([updatedTask, ...incomplete]);
        updateTask(task.id, "todo");
        break;
      case "2":
        updatedTask = { ...task, status: "inProgress" };
        setInProgress([updatedTask, ...inProgress]);
        updateTask(task.id, "inProgress");
        break;
      case "3":
        updatedTask = { ...task, status: "inReview" };
        setInReview([updatedTask, ...inReview]);
        updateTask(task.id, "inReview");
        break;
      case "4":
        updatedTask = { ...task, status: "backlog" };
        setBacklog([updatedTask, ...backlog]);
        updateTask(task.id, "backlog");
        break;
      case "5":
        updatedTask = { ...task, status: "done" };
        setCompleted([updatedTask, ...completed]);
        updateTask(task.id, "done");
        break;
    }
  }

  function findItemById(id: string, array: Task[]) {
    return array.find((item) => item.id === id);
  }

  function removeItemById(id: string, array: Task[]) {
    return array.filter((item) => item.id !== id);
  }

  return (
    <Card sx={styles.container}>
      <Grid container columnSpacing={2} rowSpacing={4}>
        <Grid item xs={12} md={9.5}>
          <Typography variant="h6">Quadro Kanban</Typography>
        </Grid>
        <Grid item xs={12} sx={{ height: "100%" }}>
          <DragDropContext
            onDragEnd={(result: DropResult) => handleDragEnd(result)}
          >
            <Box sx={styles.columnsContainer}>
              <Column title={"A Fazer"} tasks={incomplete} id={"1"} />
              <Column title={"Em Andamento"} tasks={inProgress} id={"2"} />
              <Column title={"Em Review"} tasks={inReview} id={"3"} />
              <Column title={"Em Teste"} tasks={backlog} id={"4"} />
              <Column title={"Concluído"} tasks={completed} id={"5"} />
            </Box>
          </DragDropContext>
        </Grid>
      </Grid>
    </Card>
  );
}
