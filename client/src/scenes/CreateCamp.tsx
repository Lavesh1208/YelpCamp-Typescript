import { useEffect } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import Inputfield from "@/components/Inputfield";
import { useCreateCampMutation } from "@/state/campgroundApi";
import { useNavigate } from "react-router-dom";

const CreateCamp = () => {
  const [addCamp, { isSuccess, data }] = useCreateCampMutation();
  const form = useForm<FieldValues>();
  const { register, control, handleSubmit } = form;
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    await addCamp(values);
  };

  useEffect(() => {
    if (isSuccess && data) {
      navigate(`/campgrounds/${data._id}`);
    }
  }, [isSuccess, data, navigate]);

  return (
    <div className="md:w-1/2 mx-auto h-full">
      <h1 className="text-3xl font-bold mt-14 mb-8">Create New Campground</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 h-full"
      >
        <Inputfield
          inputType="text"
          labelText="Campground Title"
          id="title"
          placeHolderText="Enter Campground Title"
          register={register}
        />
        <Inputfield
          inputType="text"
          labelText="Location"
          id="location"
          placeHolderText="Enter Campground Location"
          register={register}
        />
        <Inputfield
          inputType="number"
          labelText="Price"
          id="price"
          placeHolderText="Enter Campground Price"
          register={register}
        />
        <Inputfield
          inputType="text"
          labelText="Image"
          id="image"
          placeHolderText="Image Url"
          register={register}
        />
        <Inputfield
          inputType="text"
          labelText="Description"
          id="description"
          placeHolderText="Give a description of your camp"
          isTextArea={true}
          register={register}
        />
        <button
          type="submit"
          className="w-full mt-4 rounded-md bg-black px-6 py-4 font-semibold text-white shadow-sm hover:bg-black/80"
        >
          Create Campground
        </button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default CreateCamp;
