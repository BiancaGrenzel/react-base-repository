import { Box, Button, Card, Checkbox, Typography } from "@mui/material";
import useStyles from "./styles";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useCallback, useEffect, useState } from "react";
import { Task } from "../../../types/task.types";
import { useTasks } from "../../../hooks/useTasks";

interface CheckboxLisItemProps extends Task {
  refetchTasks: () => void;
}

const CheckboxLisItem = ({
  id,
  title,
  description,
  isFinished,
  creator_uid,
  refetchTasks,
}: CheckboxLisItemProps) => {
  const [checked, setChecked] = useState(isFinished);
  const styles = useStyles(checked);
  const { updateTask, deleteTask } = useTasks();

  const handleChecked = () => {
    setChecked(!checked);
  };

  const update = useCallback(() => {
    updateTask({ id, title, description, isFinished: checked, creator_uid });
  }, [id, checked, creator_uid, description, title, updateTask]);

  const handleDelete = () => {
    deleteTask(id);
    refetchTasks();
  };

  useEffect(() => {
    update();
  }, [checked, update]);

  return (
    <Card sx={styles.container}>
      <Box sx={styles.checkboxContainer}>
        <Checkbox value={checked} checked={checked} onChange={handleChecked} />
        <Typography variant="body1" sx={styles.title}>
          {title}
        </Typography>
      </Box>
      <Button onClick={handleDelete}>
        <DeleteOutlineIcon />
      </Button>
    </Card>
  );
};

export default CheckboxLisItem;
