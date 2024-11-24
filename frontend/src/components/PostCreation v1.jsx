import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { Image, Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import Modal from "./Modal";

const PostCreation = ({ user }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const queryClient = useQueryClient();

  const { mutate: createPostMutation, isPending } = useMutation({
    mutationFn: async (postData) => {
      const res = await axiosInstance.post("/posts/create", postData, {
        headers: { "Content-Type": "application/json" },
      });
      return res.data;
    },
    onSuccess: () => {
      resetForm();
      toast.success("Post created successfully");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (err) => {
      toast.error(err.response.data.message || "Failed to create post");
    },
  });

  const { handleSubmit, reset } = useForm();
  console.log(reset);

  const handlePostCreation = async () => {
    try {
      const postData = { content };
      if (image) postData.image = await readFileAsDataURL(image);

      createPostMutation(postData);
    } catch (error) {
      console.error("Error in handlePostCreation:", error);
    }
  };

  const resetForm = () => {
    setContent("");
    setImage(null);
    setImagePreview(null);
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

  return (
    <div className="bg-secondary rounded-lg shadow mb-4 p-4  ">
      <div className="flex space-x-3">
        <img
          src={user.profilePicture || "/avatar.png"}
          alt={user.name}
          className="rounded-full border border-gray-300"
        />
        <Modal>
          <Modal.Open opens="post-form">
            <button
              className=" size-10 w-full px-4 text-gray-600 rounded-full bg-base-200 hover:bg-base-300 focus:bg-base-300 focus:outline-none resize-none transition-colors duration-200 text-left justify-start"
              disabled={isPending}
            >
              {isPending ? (
                <Loader className="size-4 animate-spin" />
              ) : (
                "What's on your mind?"
              )}
            </button>
          </Modal.Open>
          <Modal.Window name="post-form">
            <div className="flex justify-center items-center">
              <form
                onSubmit={handleSubmit(handlePostCreation)}
                className="w-[30rem] h-auto bg-secondary border border-grey-100 rounded-lg shadow"
              >
                <div className="border-b block text-lg font-medium text-gray-700 text-center p-3">
                  Create post
                </div>

                <div className="bg-secondary rounded-lg shadow p-4">
                  <div className="flex justify-between gap-x-3">
                    <img
                      src={user.profilePicture || "/avatar.png"}
                      alt={user.name}
                      className="w-10 h-10 rounded-full border border-gray-300"
                    />
                    <input
                      type="text"
                      placeholder="What's on your mind?"
                      id="name"
                      name="name"
                      required
                      className="rounded-full block w-full px-4 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    />
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
                      <label className="rounded-full flex m-3 items-center text-info px-3 py-1 hover:bg-base-200 hover:text-info-dark transition-colors duration-200 cursor-pointer">
                        <Image size={20} className="mr-2" />
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

                  <button className="w-full mt-4 inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                    Post
                  </button>
                </div>
              </form>
            </div>
          </Modal.Window>
        </Modal>
      </div>

      <Modal>
        <Modal.Open opens="post-form">
          <div className="flex justify-between items-center mt-4 border-t cursor-pointer">
            <div className="flex space-x-4">
              <label className="rounded-full flex mt-3 items-center text-info px-3 py-1 hover:bg-base-200 hover:text-info-dark transition-colors duration-200">
                <Image size={20} className="mr-2" />
                <span>Photo</span>
              </label>
            </div>
          </div>
        </Modal.Open>
        <Modal.Window name="post-form">
          <div className="flex justify-center items-center">
            <form
              onSubmit={handlePostCreation}
              className="w-[30rem] h-auto bg-secondary border border-grey-100 rounded-lg shadow"
            >
              <div className="border-b block text-lg font-medium text-gray-700 text-center p-3">
                Create post
              </div>

              <div className="bg-secondary rounded-lg shadow p-4">
                <div className="flex justify-between gap-x-3">
                  <img
                    src={user.profilePicture || "/avatar.png"}
                    alt={user.name}
                    className="w-10 h-10 rounded-full border border-gray-300"
                  />
                  <input
                    type="text"
                    placeholder="What's on your mind?"
                    id="name"
                    name="name"
                    required
                    className="rounded-full block w-full px-4 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  />
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
                    <label className="rounded-full flex m-3 items-center text-info px-3 py-1 hover:bg-base-200 hover:text-info-dark transition-colors duration-200 cursor-pointer">
                      <Image size={20} className="mr-2" />
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
                  type="submit"
                  className="w-full mt-4 inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Post
                </button>
              </div>
            </form>
          </div>
        </Modal.Window>
      </Modal>
    </div>
  );
};
export default PostCreation;
