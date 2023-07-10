import { FieldValues, UseFormRegister } from "react-hook-form";

interface InputfieldProps {
  value?: string | number;
  id: string;
  labelText: string;
  inputType: string;
  placeHolderText: string;
  register: UseFormRegister<FieldValues>;
  isTextArea?: boolean;
}
const Inputfield: React.FC<InputfieldProps> = ({
  id,
  value,
  labelText,
  inputType,
  isTextArea,
  register,
  placeHolderText,
}) => {
  id = `campground[${id}]`;

  return (
    <div className="flex flex-col w-full">
      <label className="text-lg font-semibold mb-[2px]" htmlFor={id}>
        {labelText}
      </label>
      {isTextArea ? (
        <textarea
          className="w-full rounded-md border-black/30 bg-[#F9F6F1] outline-none px-3 py-3.5 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/80"
          id={id}
          placeholder={placeHolderText}
          rows={10}
          cols={5}
          {...register(id)}
          defaultValue={value}
        />
      ) : (
        <input
          className="rounded-md border-black/30 bg-[#F9F6F1] outline-none px-3 py-3.5 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/80"
          id={id}
          type={inputType}
          step={1}
          placeholder={placeHolderText}
          {...register(id)}
          defaultValue={value}
        />
      )}
    </div>
  );
};

export default Inputfield;
