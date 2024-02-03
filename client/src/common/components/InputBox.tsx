import { useState } from "react";

type props = {
  name: string;
  type: string;
  id?: string;
  value: string;
  handleChange: (e: { target: { name: any; value: any } }) => void;
  placeholder?: string;
  icon?: string;
};

const InputBox = ({
  name,
  type,
  id,
  value,
  handleChange,
  placeholder,
  icon,
}: props) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <div className="relative w-[100%] mb-4 mt-1">
      <input
        id={id}
        type={type == "password" && isPasswordVisible ? "text" : type}
        name={name}
        placeholder={placeholder}
        required={true}
        value={value}
        className="input-box"
        onChange={handleChange}
      />
      <i className={"fi " + icon + " input-icon"}></i>

      {type == "password" ? (
        <i
          className={`fi fi-sr-eye${
            !isPasswordVisible ? "-crossed" : ""
          } input-icon left-[auto] right-4 cursor-pointer`}
          onClick={() => setIsPasswordVisible((curr) => !curr)}
        ></i>
      ) : (
        ""
      )}
    </div>
  );
};

export default InputBox;
