import TaskAltIcon from "@mui/icons-material/TaskAlt";
import AlarmOnIcon from "@mui/icons-material/AlarmOn";
import AssistantIcon from "@mui/icons-material/Assistant";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import { useNavigate } from "react-router-dom";
import { useStore } from "zustand";
import { useTranslationStore } from "../../../store";

export const useItemsCardAction = () => {
  const navigate = useNavigate();
  const { intl } = useStore(useTranslationStore);

  return [
    {
      title: intl("createATask"),
      description: intl("createTaskDescription"),
      icon: <TaskAltIcon />,
      onClick: () => {
        navigate("/tasks");
      },
    },
    {
      title: intl("pomodoroTimer"),
      description: intl("pomodoroTimerDescription"),
      icon: <AlarmOnIcon />,
      onClick: () => {
        navigate("/pomodoro");
      },
    },
    {
      title: intl("createFeedback"),
      description: intl("createFeedbackDescription"),
      icon: <AssistantIcon />,
      onClick: () => {
        navigate("/feedbacks");
      },
    },
    {
      title: intl("recordWorkedHours"),
      description: intl("recordWorkedHoursDescription"),
      icon: <WorkHistoryIcon />,
      onClick: () => {
        navigate("/time-keeping");
      },
    },
  ];
};
