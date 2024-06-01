import { Box, Button, Card, Divider, Typography } from "@mui/material";
import useStyles from "./styles";
import { useStore } from "zustand";
import { useTranslationStore } from "../../store/translationStore";
import AddIcon from "@mui/icons-material/Add";
import CheckboxLisItem from "./CheckboxListItem";
import { useTasks } from "../../hooks/useTasks";
import { useEffect, useState } from "react";
import ModalCreateTask from "./ModalCreateTask";
import { useUserStore } from "../../store/userStore";
import { OutTask } from "../../services/tasks/output/OutTask.types";

const TodoList = () => {
  const styles = useStyles();
  const { intl } = useStore(useTranslationStore);
  const { getTasksByCreatorUid } = useTasks();
  const [tasks, setTasks] = useState<OutTask[]>([]);
  const [createTaskModalOpen, setCreateTaskModalOpen] = useState(false);
  const { uid } = useUserStore();

  const handleCloseCreateTaskModal = () => {
    setCreateTaskModalOpen(false);
  };

  const handleOpenCreateTaskModal = () => {
    setCreateTaskModalOpen(true);
  };

  const fetchTasks = async () => {
    const result = await getTasksByCreatorUid({ uid });
    setTasks(result);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Card sx={styles.container}>
      <Typography variant="h6" mb={2}>
        {intl("todoList")}
      </Typography>
      <Divider sx={{ marginBottom: 2 }} />
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleOpenCreateTaskModal}
      >
        {intl("newTask")}
      </Button>
      <Box sx={styles.tasksContainer}>
        {tasks.map((task) => (
          <CheckboxLisItem key={task.id} {...task} refetchTasks={fetchTasks} />
        ))}
      </Box>
      <ModalCreateTask
        open={createTaskModalOpen}
        handleClose={handleCloseCreateTaskModal}
        refetchTasks={fetchTasks}
      />
    </Card>
  );
};

export default TodoList;
