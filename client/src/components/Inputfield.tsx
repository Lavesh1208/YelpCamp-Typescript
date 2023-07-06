interface InputfieldProps {
  labelText: string;
  inputType: string;
  placeHolderText: string;
  isTextArea?: boolean;
}
const Inputfield: React.FC<InputfieldProps> = ({
  labelText,
  inputType,
  isTextArea,
  placeHolderText,
}) => {
  return (
    <div className="flex flex-col w-full">
      <label className="text-lg font-semibold mb-[2px]" htmlFor="name">
        {labelText}
      </label>
      {isTextArea ? (
        <textarea
          className="w-full rounded-md border-black/30 bg-[#F9F6F1] outline-none px-3 py-3.5 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/80"
          placeholder={placeHolderText}
          rows={10}
          cols={5}
        />
      ) : (
        <input
          className="rounded-md border-black/30 bg-[#F9F6F1] outline-none px-3 py-3.5 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/80"
          type={inputType}
          step={1}
          placeholder={placeHolderText}
        />
      )}
    </div>
  );
};

export default Inputfield;
