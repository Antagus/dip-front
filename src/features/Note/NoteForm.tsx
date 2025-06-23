import { useState } from "react";
import { createNote } from "shared/api/note";
import { useDevice } from "shared/hooks";
import { globalStore } from "shared/store/globalStore";
import {
  Modal,
  ValidationInput,
  StickySection,
  Row,
  Button,
  Form,
} from "shared/ui";

type Props = {
  onClose: () => void;
  isOpen: boolean;
  dateEvent?: Date;
};

export const NoteForm: React.FC<Props> = ({ onClose, isOpen, dateEvent }) => {
  const { isMobile } = useDevice();
  const [titleNote, setTitleNote] = useState("");
  const [descriptionNote, setDescriptionNote] = useState("");

  function toLocalNoon(date: Date): Date {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      12,
      0,
      0,
      0
    );
  }
  const handleCreateNote = (data: Record<string, string>) => {
    if (dateEvent) {
      console.log("DATE EVENT", dateEvent);
      createNote(
        globalStore.user,
        data.name,
        data.description,
        toLocalNoon(dateEvent)
      );
    }
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen} nameModal="Создать событие">
      <Form
        padding={isMobile ? "16px 0px 100px 0px" : "16px 0px 0px 0px"}
        onSubmit={(data) => {
          handleCreateNote(data);
        }}
      >
        <ValidationInput
          id="name"
          value={titleNote}
          typeValidation="required"
          required
          onChange={setTitleNote}
          label="Название события"
        />

        <ValidationInput
          id="description"
          typeValidation="all"
          value={descriptionNote}
          label="Введите описание события"
          onChange={setDescriptionNote}
        />

        <StickySection>
          <Row padding="16px 0px">
            <Button type="submit">Создать событие</Button>
          </Row>
        </StickySection>
      </Form>
    </Modal>
  );
};
