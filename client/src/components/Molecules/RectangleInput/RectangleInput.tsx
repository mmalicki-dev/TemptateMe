import { useState } from "react";
import type { ChangeEvent, InvalidEvent } from "react";
import { ReactComponent as CorrectIcon } from "./icon-correct.svg";
import { ReactComponent as ErrorIcon } from "./icon-error.svg";
import { ReactComponent as WarningIcon } from "./icon-warning.svg";
import { ReactComponent as MailIcon } from "./icon-mail.svg";
import { ReactComponent as PasswordIcon } from "./icon-password.svg";
import { ReactComponent as NameIcon } from "./icon-name.svg";
import styles from "./RectangleInput.module.css";

interface RectangleInputProps {
  isEmail?: boolean;
  isPassword?: boolean;
  isName?: boolean;
  placeholderText?: string;
}

const getLabel = (event: ChangeEvent<HTMLInputElement>): HTMLLabelElement =>
  event.target.labels[0];

const RectangleInput = ({
  isEmail = false,
  isPassword = false,
  isName = false,
  placeholderText,
}: RectangleInputProps) => {
  const [error, setError] = useState(false);
  const [warning, setWarning] = useState(false);
  const [correct, setCorrect] = useState(false);

  const setValid = (label: HTMLLabelElement) => {
    setWarning(false);
    setCorrect(true);
    label.classList.remove(styles.warning);
    label.classList.add(styles.correct);
  };

  const setInvalidWarning = (label: HTMLLabelElement) => {
    setWarning(true);
    setCorrect(false);
    label.classList.add(styles.warning);
    label.classList.remove(styles.correct);
  };

  const clearState = (label: HTMLLabelElement) => {
    setWarning(false);
    setCorrect(false);
    label.classList.remove(styles.warning, styles.correct);
  };

  const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const label = getLabel(event);
    setError(false);
    label.classList.remove(styles.error);
    if (!value) return clearState(label);
    if (value.length < 3 || value.length > 30) return setInvalidWarning(label);
    setValid(label);
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const label = getLabel(event);
    setError(false);
    label.classList.remove(styles.error);
    if (!value) return clearState(label);
    if (value.length < 6 || value.length > 20) return setInvalidWarning(label);
    setValid(label);
  };

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const label = getLabel(event);
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    setError(false);
    label.classList.remove(styles.error);
    if (!value) return clearState(label);
    if (!regex.test(value)) return setInvalidWarning(label);
    setValid(label);
  };

  const onInvalid = (event: InvalidEvent<HTMLInputElement>) => {
    const label = (
      event.target as HTMLInputElement & {
        labels: NodeListOf<HTMLLabelElement>;
      }
    ).labels[0];
    label.classList.add(styles.error);
    setError(true);
    setWarning(false);
    setCorrect(false);
  };

  let inputType = "text";
  let inputId = "text";
  let minLength: number | undefined;
  let maxLength: number | undefined;

  if (isEmail) {
    inputType = "email";
    inputId = "email";
  }
  if (isPassword) {
    inputType = "password";
    inputId = "password";
    minLength = 6;
    maxLength = 20;
  } else {
    minLength = 3;
    maxLength = 30;
  }

  return (
    <label className={styles.RectangleInput}>
      <div className={styles.icon}>
        {isEmail && <MailIcon />}
        {isPassword && <PasswordIcon />}
        {isName && <NameIcon />}
      </div>
      <input
        type={inputType}
        id={inputId}
        minLength={minLength}
        maxLength={maxLength}
        className={styles.input}
        placeholder={placeholderText}
        onChange={(event) => {
          if (isName) return onChangeName(event);
          if (isPassword) return onChangePassword(event);
          if (isEmail) return onChangeEmail(event);
        }}
        required
        onInvalid={onInvalid}
      />
      <div className={styles.iconStatus}>
        {error && <ErrorIcon />}
        {warning && <WarningIcon />}
        {correct && <CorrectIcon />}
      </div>
      <span className={styles.text}>{""}</span>
    </label>
  );
};

export { RectangleInput };
