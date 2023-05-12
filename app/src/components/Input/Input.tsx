import React from "react";
import "assets/css/Input.css";

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder: string;
  value: string;
}

const MyInput: React.FC<Props> = ({
  onChange,
  onKeyDown,
  value,
  placeholder,
}) => {
  return (
    <div className="input">
      <input
        type="text"
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={value}
        placeholder={placeholder}
      />
    </div>
  );
};

export default MyInput;
