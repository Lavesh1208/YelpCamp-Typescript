import { useLocation, useNavigate } from "react-router-dom";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import Inputfield from "@/components/Inputfield";
import { ICampground } from "@/interfaces/campground.interface";
import { useUpdateCampMutation } from "@/state/campgroundApi";
import { useEffect } from "react";

const UpdateCamp = () => {
  const [updateCamp, { isSuccess, data }] = useUpdateCampMutation();
  const navigate = useNavigate();
  const loc = useLocation();

  const { _id, title, price, location, image, description }: ICampground =
    loc.state.data;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    const campground = { campground: { ...values } };
    console.log(campground);
    await updateCamp({ _id, campground });
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
          id="title"
          inputType="text"
          labelText="Campground Title"
          value={title}
          register={register}
          errors={errors}
          placeHolderText="Enter Campground Title"
        />
        <Inputfield
          id="location"
          inputType="text"
          labelText="Location"
          value={location}
          register={register}
          errors={errors}
          placeHolderText="Enter Campground Location"
        />
        <Inputfield
          id="price"
          inputType="number"
          labelText="Price"
          value={price}
          register={register}
          errors={errors}
          placeHolderText="Enter Campground Price"
        />
        <Inputfield
          id="image"
          inputType="text"
          labelText="Image"
          value={image}
          register={register}
          errors={errors}
          placeHolderText="Imge Url"
        />
        <Inputfield
          id="description"
          inputType="text"
          labelText="Description"
          value={description}
          isTextArea={true}
          register={register}
          errors={errors}
          placeHolderText="Give a description of your camp"
        />
        <button
          type="submit"
          className="w-full mt-4 rounded-md bg-black px-6 py-4 font-semibold text-white shadow-sm hover:bg-black/80"
        >
          Confirm and Update
        </button>
      </form>
    </div>
  );
};

export default UpdateCamp;
