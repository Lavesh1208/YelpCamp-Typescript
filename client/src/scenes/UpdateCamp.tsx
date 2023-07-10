import { useLocation, useNavigate } from "react-router-dom";
import { DevTool } from "@hookform/devtools";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import Inputfield from "@/components/Inputfield";
import { ICampground } from "@/interfaces/campground.interface";
import { useUpdateCampMutation } from "@/state/campgroundApi";
import { useEffect } from "react";

const UpdateCamp = () => {
  const [updateCamp, { isSuccess, data }] = useUpdateCampMutation();
  const form = useForm<FieldValues>();
  const { register, control, handleSubmit } = form;
  const navigate = useNavigate();
  const location = useLocation();

  const { _id, title, price, image, description }: ICampground =
    location.state.data;

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    await updateCamp({ _id, values });
  };

  useEffect(() => {
    if (isSuccess && data) {
      navigate(`/campgrounds/${data._id}`);
    }
  }, [isSuccess, data, navigate]);

  return (
    <div className="md:w-1/2 mx-auto h-full">
      <h1 className="text-3xl font-bold mt-14 mb-8">Update Campground</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 h-full"
      >
        <Inputfield
          inputType="text"
          labelText="Campground Title"
          value={title}
          id="title"
          placeHolderText="Enter Campground Title"
          register={register}
        />
        <Inputfield
          inputType="number"
          labelText="Price"
          value={price}
          id="price"
          placeHolderText="Enter Campground Price"
          register={register}
        />
        <Inputfield
          inputType="text"
          labelText="Image"
          value={image}
          id="image"
          placeHolderText="Imge Url"
          register={register}
        />
        <Inputfield
          inputType="text"
          labelText="Description"
          value={description}
          id="description"
          placeHolderText="Give a description of your camp"
          isTextArea={true}
          register={register}
        />
        <button
          type="submit"
          className="w-full mt-4 rounded-md bg-black px-6 py-4 font-semibold text-white shadow-sm hover:bg-black/80"
        >
          Confirm and Update
        </button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default UpdateCamp;
