import { useNavigate } from "react-router-dom";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import Inputfield from "@/components/Inputfield";
import { useRegisterUserMutation } from "@/state/userApi";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/state/global";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [addUser, { isSuccess, data, error }] = useRegisterUserMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    const user = {
      ...values,
    };
    await addUser(user);
  };

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setUser({ isUser: true, user: { ...data } }));
      toast.success("User Registered");
      navigate("/campgrounds");
    } else if (error) {
      if ("data" in error) {
        toast.error(error.data as string);
      } else {
        toast.error("An error occurred.");
        console.log(error);
      }
      navigate("/register");
    }
  }, [isSuccess, error, navigate, data, dispatch]);

  return (
    <div className="md:w-1/2 mx-auto h-full">
      <h1 className="text-3xl font-bold mt-10 mb-5">Register</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 h-full"
        noValidate
      >
        <Inputfield
          id="name"
          inputType="text"
          labelText="Name"
          register={register}
          errors={errors}
          placeHolderText="Enter Username"
        />
        <Inputfield
          id="email"
          inputType="email"
          labelText="Email"
          register={register}
          errors={errors}
          placeHolderText="Enter Email"
        />
        <Inputfield
          id="password"
          inputType="password"
          labelText="Password"
          register={register}
          errors={errors}
          placeHolderText="Enter Password"
        />

        <button
          type="submit"
          className="w-full mt-4 rounded-md bg-black px-6 py-4 font-semibold text-white shadow-sm hover:bg-black/80"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
