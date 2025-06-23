import { NoteForm } from "features/Note";
import React, { useState, useMemo, useEffect } from "react";
import { getUserNotes } from "shared/api/note";
import { useDevice } from "shared/hooks";
import { globalStore } from "shared/store/globalStore";
import { Note } from "shared/store/type";
import {
  Block,
  Button,
  Form,
  Modal,
  Row,
  StickySection,
  ValidationInput,
} from "shared/ui";
import styled from "styled-components";

// --- Types ---
export interface EventItem {
  id: string;
  date: string; // ISO date yyyy-MM-dd
  title: string;
}

// --- Styled Components ---
const Card = styled.div`
  background-color: #fff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.25rem;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
`;

// Новый компонент для отображения выбранной даты
const SelectedDateText = styled.div`
  margin-bottom: 16px;
  font-size: 0.95rem;
`;

const Weekdays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  margin-bottom: 8px;
  font-weight: 600;
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
`;

const DayCell = styled.div<{
  isCurrent: boolean;
  isSelected: boolean;
  isWeekend: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  color: ${(p) => (p.isWeekend ? "#E53935" : "#5e5e5e")};
  border: ${(p) => (p.isSelected ? "2px solid #90CAF9" : "1px solid #ebebeb")};
  background-color: ${(p) => (p.isSelected ? "#90CAF9" : "transparent")};
  font-weight: ${(p) => (p.isCurrent ? "bold" : "normal")};
  width: 100%;
  aspect-ratio: 1;
  box-sizing: border-box;
`;

const EventsHeader = styled.h3`
  margin: 16px 0 8px;
  font-size: 1rem;
`;

const EventsList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const EventItemRow = styled.li`
  border-radius: 8px;
  padding: 8px 12px;
  margin-bottom: 8px;
  font-size: 0.875rem;
  border: 1px solid #c5c5c5;
`;

// --- Helpers ---
const WEEKDAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

function generateMonthGrid(year: number, month: number): Date[] {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startWeekday = (firstDay.getDay() + 6) % 7;
  const endWeekday = (lastDay.getDay() + 6) % 7;
  const startDate = new Date(year, month, 1 - startWeekday);
  const endDate = new Date(year, month, lastDay.getDate() + (6 - endWeekday));
  const grid: Date[] = [];
  let dt = new Date(startDate);
  while (dt <= endDate) {
    grid.push(new Date(dt));
    dt.setDate(dt.getDate() + 1);
  }
  return grid;
}

function getLocalDateString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function formatEventsHeader(date: Date): string {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  if (date.toDateString() === today.toDateString())
    return "Мероприятия на сегодня";
  if (date.toDateString() === yesterday.toDateString())
    return "Мероприятия на вчера";
  return `Мероприятия на ${date.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
  })}`;
}

export const CalendarWithEvents: React.FC = () => {
  const today = new Date();

  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<Date>(today);

  // состояние для заметок из API
  const [notes, setNotes] = useState<Note[]>([]);
  const userId = globalStore.user?.id ?? null;

  const [updateStatus, setUpdateStatus] = useState(false);

  // подтягиваем заметки при старте или при смене userId
  useEffect(() => {
    if (userId) {
      getUserNotes(userId).then((data) => {
        if (data) setNotes(data);
      });
    }
  }, [userId, updateStatus, setUpdateStatus]);

  // сетка дней месяца
  const monthGrid = useMemo(
    () => generateMonthGrid(currentYear, currentMonth),
    [currentYear, currentMonth]
  );

  // фильтруем из notes те, у которых reminder_date совпадает с selectedDate
  const notesForSelected = useMemo(() => {
    const sel = getLocalDateString(selectedDate);
    return notes.filter(
      (note) =>
        // если note.reminder_date приходит как строка ISO, то парсим сначала
        getLocalDateString(new Date(note.reminder_date)) === sel
    );
  }, [notes, selectedDate]);

  const handlePrev = () => {
    if (currentMonth === 0) {
      setCurrentYear((y) => y - 1);
      setCurrentMonth(11);
    } else setCurrentMonth((m) => m - 1);
  };

  const handleNext = () => {
    if (currentMonth === 11) {
      setCurrentYear((y) => y + 1);
      setCurrentMonth(0);
    } else setCurrentMonth((m) => m + 1);
  };

  const [showAddNote, setShowAddNote] = useState(false);

  return (
    <>
      <Block padding="16px">
        <Header>
          <Title>Календарь</Title>
          <div>
            <ToggleButton onClick={handlePrev}>‹</ToggleButton>
            <span style={{ margin: "0 8px" }}>
              {currentYear} / {currentMonth + 1}
            </span>
            <ToggleButton onClick={handleNext}>›</ToggleButton>
          </div>
        </Header>

        <SelectedDateText>
          Выбрана дата:{" "}
          {selectedDate.toLocaleDateString("ru-RU", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </SelectedDateText>

        <Weekdays>
          {WEEKDAYS.map((d) => (
            <div key={d}>{d}</div>
          ))}
        </Weekdays>

        <CalendarGrid>
          {monthGrid.map((dt) => {
            const isCurrent = dt.toDateString() === today.toDateString();
            const isSelected =
              dt.toDateString() === selectedDate.toDateString();
            const isWeekend = dt.getDay() === 0 || dt.getDay() === 6;
            const isActiveMonth = dt.getMonth() === currentMonth;
            return (
              <DayCell
                key={dt.toISOString()}
                isCurrent={isCurrent}
                isSelected={isSelected}
                isWeekend={isWeekend}
                onClick={() => isActiveMonth && setSelectedDate(new Date(dt))}
                style={{ opacity: isActiveMonth ? 1 : 0.3 }}
              >
                {dt.getDate()}
              </DayCell>
            );
          })}
        </CalendarGrid>

        <EventsHeader>{formatEventsHeader(selectedDate)}</EventsHeader>
        <EventsList>
          {notesForSelected.length > 0 ? (
            notesForSelected.map((note) => (
              <EventItemRow key={note.id}>
                <div>
                  <strong>{note.title}</strong>
                  {note.description && <div>{note.description}</div>}
                  {new Date(note.creation_date)?.toLocaleDateString("ru-RU", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </div>
              </EventItemRow>
            ))
          ) : (
            <EventItemRow style={{ fontStyle: "italic" }}>
              Нет заметок на эту дату
            </EventItemRow>
          )}
        </EventsList>

        <Button onClick={() => setShowAddNote(true)}>
          Добавить напоминание
        </Button>
      </Block>

      <NoteForm
        isOpen={showAddNote}
        dateEvent={selectedDate}
        setUpdated={() => setUpdateStatus(!updateStatus)}
        onClose={() => setShowAddNote(false)}
      />
    </>
  );
};

export default CalendarWithEvents;
