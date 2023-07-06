import Inputfield from "@/components/Inputfield";

const CreateCamp = () => {
  return (
    <div className="md:w-1/2 mx-auto h-full">
      <h1 className="text-3xl font-bold mt-14 mb-8">Create New Campground</h1>
      <form className="flex flex-col gap-3 h-full">
        <Inputfield
          inputType="text"
          labelText="Campground Name"
          placeHolderText="Enter Campground Name"
        />
        <Inputfield
          inputType="number"
          labelText="Price"
          placeHolderText="Enter Campground Price"
        />
        <Inputfield
          inputType="text"
          labelText="Image"
          placeHolderText="Imge Url"
        />
        <Inputfield
          inputType="text"
          labelText="Description"
          placeHolderText="Give a description of your camp"
          isTextArea={true}
        />
        <button className="w-full mt-4 rounded-md bg-black px-6 py-4 font-semibold text-white shadow-sm hover:bg-black/80">
          Create Campground
        </button>
      </form>
    </div>
  );
};

export default CreateCamp;
