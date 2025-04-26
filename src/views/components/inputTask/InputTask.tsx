import React, { useEffect, useRef, useState } from "react";

import styles from "./InputTask.module.scss";

interface InputTaskProps {
  id: string;
  title: string;
  completed: boolean;
  onDone: (id: string) => void;
  onDoneBack: (id: string) => void;
  onEdited: (id: string, title: string) => void;
  onRemoved: (id: string) => void;
}

export const InputTask: React.FC<InputTaskProps> = ({
  id,
  title,
  completed,
  onDone,
  onDoneBack,
  onEdited,
  onRemoved,
}) => {
  const [checked, setChecked] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [value, setValue] = useState(title);
  const [animation, setAnimation] = useState("");
  const editTitleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (completed) setChecked(true);
    if (isEditMode) {
      editTitleInputRef?.current?.focus();
    }
  }, [isEditMode]);

  function taskCompleted(event: React.ChangeEvent<HTMLInputElement>): void {
    setChecked(event.target.checked);
    if (event.target.checked) {
      setAnimation(`${styles.moving}`);
      setTimeout(() => {
        onDone(id);
        setAnimation("");
      }, 300);
    } else if (!event.target.checked) {
      setAnimation(`${styles.moving}`);
      setTimeout(() => {
        onDoneBack(id);
        setAnimation("");
      }, 300);
    }
  }

  return (
    <div
      className={`${styles.inputTask} ${animation} ${
        completed ? styles.inputTaskCompleted : ""
      }`}
    >
      <label className={styles.inputTaskLabel}>
        <input
          type="checkbox"
          disabled={isEditMode}
          checked={checked}
          className={styles.inputTaskCheckbox}
          onChange={taskCompleted}
        />

        {isEditMode ? (
          <input
            ref={editTitleInputRef}
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                onEdited(id, value);
                setIsEditMode(false);
              }
            }}
            className={styles.inputTaskTitleEdit}
          />
        ) : (
          <h3
            className={`${styles.inputTaskTitle} ${
              completed ? styles.inputTaskTitleCompleted : ""
            }`}
          >
            {title}
          </h3>
        )}
      </label>

      {isEditMode ? (
        <button
          aria-label="Save"
          className={styles.inputTaskSave}
          onClick={() => {
            onEdited(id, value);
            setIsEditMode(false);
          }}
        />
      ) : (
        <button
          aria-label="Edit"
          className={styles.inputTaskEdit}
          onClick={() => {
            setIsEditMode(true);
          }}
        />
      )}

      <button
        aria-label="Remove"
        className={styles.inputTaskRemove}
        onClick={() => {
          if (confirm("Are you sure?")) {
            onRemoved(id);
          }
        }}
      />
    </div>
  );
};
