import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import MeetingForm from "src/components/MeetingForm";

export default function NewMeeting() {
  const navigate = useNavigate();

  const onClose = useCallback(() => {
    navigate(-1);
  }, []);

  return <MeetingForm title="New Meeting" onClose={onClose} />;
}
