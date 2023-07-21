import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import Inputfield from "@/components/Inputfield";
import { ICampground } from "@/interfaces/campground.interface";
import { useUpdateCampMutation } from "@/state/campgroundApi";

const UpdateCamp = () => {
  const [updateCamp, { isSuccess, data, error }] = useUpdateCampMutation();
  const navigate = useNavigate();
  const loc = useLocation();

  const { _id, title, price, location, images, description }: ICampground =
    loc.state.data;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("location", values.location);
    formData.append("price", values.price);
    formData.append("description", values.description);

    for (let i = 0; i < values.image.length; i++) {
      formData.append("image", values.image[i]);
    }
    await updateCamp({ _id, formData });
  };

  useEffect(() => {
    if (isSuccess && data) {
      navigate(`/campgrounds/${data._id}`);
    } else if (error) {
      if ("data" in error) {
        toast.error(error.data as string);
      } else {
        toast.error("An error occurred.");
        console.log(error);
      }
    }
  }, [isSuccess, data, navigate, error]);

  return (
    <div className="md:w-1/2 mx-auto h-full">
      <h1 className="text-3xl font-bold mt-14 mb-8">Update Campground</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 h-full"
        noValidate
        encType="multipart/form-data"
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
          inputType="file"
          labelText="Image"
          register={register}
          errors={errors}
          placeHolderText="Imge Url"
          multiple={true}
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
