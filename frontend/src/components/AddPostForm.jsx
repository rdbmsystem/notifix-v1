import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { HiPhoto } from "react-icons/hi2";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useState } from "react";

const AddPostForm = ({ user, onClose }) => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const queryClient = useQueryClient();
  const { handleSubmit, watch, reset, register, formState } = useForm();
  const { errors } = formState;

  const { mutate: createPostMutation, isPending } = useMutation({
    mutationFn: async (postData) => {
      const res = await axiosInstance.post("/posts/create", postData, {
        headers: { "Content-Type": "application/json" },
      });
      return res.data;
    },
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      onClose();
    },
    onError: (err) => {
      toast.error(err.response.data.message || "Failed to create post");
    },
  });

  const watchContent = watch("content", "");

  const handlePostCreation = async (data) => {
    try {
      const postData = { ...data };

      if (image) postData.image = await readFileAsDataURL(image);

      createPostMutation(postData);
    } catch (error) {
      console.error("Error in handlePostCreation:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      readFileAsDataURL(file).then(setImagePreview);
    } else {
      setImagePreview(null);
    }
  };

  const readFileAsDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  function onError(errors) {
    console.log(errors);
    toast.error(errors?.content?.message);
  }

  return (
    <form
      onSubmit={handleSubmit(handlePostCreation, onError)}
      className="w-[30rem] h-auto"
    >
      <div className="bg-secondary rounded-lg shadow p-4">
        <div className="flex flex-col gap-y-1">
          <div className="flex items-center gap-x-3">
            <img
              src={user.profilePicture || "/avatar.png"}
              alt={user.name}
              className="w-10 h-10 rounded-full border border-gray-300 object-cover"
            />
            <input
              type="text"
              id="content"
              placeholder="What's on your mind?"
              {...register("content", {
                required: "This field is required",
              })}
              className="rounded-full block w-full px-4 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            />
            <span className="text-[.7rem] text-primary hidden">
              {errors?.content?.message}
            </span>
          </div>
        </div>

        <div
          className={`border my-4 rounded-lg p-2 ${
            !imagePreview ? "hidden" : ""
          }`}
        >
          {imagePreview && (
            <div className="mt-4">
              <img
                src={imagePreview}
                alt="Selected"
                className="p-2 h-[300px] border w-full rounded-lg bg-gray-100 object-contain"
              />
            </div>
          )}
        </div>

        <div className="rounded-lg border mt-4">
          <div className="flex space-x-4">
            <label className="rounded-full flex m-3 items-center text-info px-3 py-1 hover:bg-base-100 hover:text-info-dark transition-colors duration-200 cursor-pointer">
              <HiPhoto size={20} className="mr-2" />
              <span>Photo</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>
        </div>

        <button
          disabled={watchContent.trim() === "" || isPending}
          className={`w-full mt-4 inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-full shadow-sm text-sm font-medium  hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary  ${
            watchContent.trim() === "" || isPending
              ? "text-gray-500 bg-gray-300"
              : "text-white bg-primary"
          }`}
        >
          {isPending ? <Loader className="size-4 animate-spin" /> : "Post"}
        </button>
      </div>
    </form>
  );
};

export default AddPostForm;
