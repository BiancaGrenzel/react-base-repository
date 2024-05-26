export type ModalCreateTaskProps = {
  open: boolean;
  handleClose: () => void;
  refetchTasks: () => void;
};

export type TaskFormValues = {
  title: string;
  description: string;
};
