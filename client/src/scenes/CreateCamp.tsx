import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import Inputfield from "@/components/Inputfield";
import { useCreateCampMutation } from "@/state/campgroundApi";

const CreateCamp = () => {
  const [addCamp, { isSuccess, data, error }] = useCreateCampMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    const campground = {
      campground: {
        ...values,
        price: parseFloat(values.price as string),
      },
    };
    await addCamp(campground);
  };

  useEffect(() => {
    if (isSuccess && data) {
      toast.success("Campground Added");
      navigate(`/campgrounds/${data._id}`);
    } else if (error) {
      if ("originalStatus" in error && error.originalStatus === 401) {
        toast.error(error.data as string);
        navigate("/login");
      } else if ("data" in error) {
        toast.error(error.data as string);
        console.log(error);
      } else {
        toast.error("An error occurred.");
        console.log(error);
      }
    }
  }, [isSuccess, data, navigate, error]);

  return (
    <div className="md:w-1/2 mx-auto h-full">
      <h1 className="text-3xl font-bold mt-10 mb-5">Create New Campground</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 h-full"
        noValidate
      >
        <Inputfield
          id="title"
          inputType="text"
          labelText="Campground Title"
          register={register}
          errors={errors}
          placeHolderText="Enter Campground Title"
        />
        <Inputfield
          id="location"
          inputType="text"
          labelText="Location"
          register={register}
          errors={errors}
          placeHolderText="Enter Campground Location"
        />
        <Inputfield
          id="price"
          inputType="number"
          labelText="Price"
          register={register}
          errors={errors}
          placeHolderText="Enter Campground Price"
        />
        <Inputfield
          id="image"
          inputType="text"
          labelText="Image"
          register={register}
          errors={errors}
          placeHolderText="Image Url"
        />
        <Inputfield
          id="description"
          inputType="text"
          labelText="Description"
          isTextArea={true}
          errors={errors}
          register={register}
          placeHolderText="Give a description of your camp"
        />
        <button
          type="submit"
          className="w-full mt-4 rounded-md bg-black px-6 py-4 font-semibold text-white shadow-sm hover:bg-black/80"
        >
          Create Campground
        </button>
      </form>
    </div>
  );
};

export default CreateCamp;
