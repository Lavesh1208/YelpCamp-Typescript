import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputfieldProps {
  id: string;
  inputType: string;
  labelText: string;
  value?: string | number;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  isTextArea?: boolean;
  required?: boolean;
  placeHolderText: string;
}
const Inputfield: React.FC<InputfieldProps> = ({
  id,
  inputType,
  labelText,
  value,
  register,
  errors,
  isTextArea,
  placeHolderText,
}) => {
  return (
    <div className="flex flex-col w-full">
      <label className="font-semibold mb-[2px]" htmlFor={id}>
        {labelText}
      </label>
      {isTextArea ? (
        <textarea
          className="w-full rounded-md border-black/30 bg-[#F9F6F1] outline-none px-3 py-3.5 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/80"
          id={id}
          rows={10}
          cols={5}
          defaultValue={value}
          placeholder={placeHolderText}
          {...register(id, { required: `${id} is required` })}
        />
      ) : (
        <div className="w-full">
          <input
            className="w-full rounded-md border-black/30 bg-[#F9F6F1] outline-none px-3 py-3.5 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/80"
            id={id}
            type={inputType}
            step={1}
            placeholder={placeHolderText}
            {...register(id, {
              required: `${id[0].toUpperCase() + id.slice(1)} is required`,
            })}
            defaultValue={value}
          />
        </div>
      )}

      <p className="text-red-500 text-xs font-semibold">
        {errors[id]?.message?.toString()}
      </p>
    </div>
  );
};

export default Inputfield;
