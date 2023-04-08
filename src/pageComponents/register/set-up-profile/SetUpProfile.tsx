import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";

export const setUpProfileValidationSchema = yup.object({
  username: yup.string().email().required(),
});

type SetUpProfileFormValues = yup.InferType<
  typeof setUpProfileValidationSchema
>;

export function SetUpProfile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SetUpProfileFormValues>({
    defaultValues: {
      username: "",
    },
    resolver: yupResolver(setUpProfileValidationSchema),
  });

  console.log(errors);

  const onSubmit = (values: SetUpProfileFormValues) => {
    console.log(values);
  };

  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col gap-12 lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Welcome back!</h1>
          <p className=" py-6">
            Welcome back to Friendly Macros - Your Go-To App for Personalized
            Meal Planning, Restaurant Discovery, and Meal Sharing!
          </p>
        </div>
        <div className="card w-full max-w-sm flex-shrink-0 bg-base-100 shadow-2xl">
          <div className="card-body">
            <div className="form-control">
              <button className="btn-accent btn-sm btn">Google</button>
            </div>
            <div className="form-control mt-2">
              <button className="btn-neutral-100 btn-sm btn">Apple</button>
            </div>
            <div className="divider mb-0">OR</div>
            <div>
              <form
                onSubmit={(e) => {
                  void handleSubmit(onSubmit)(e);
                  e.preventDefault();
                }}
                className="flex flex-col gap-2"
              >
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="text"
                    placeholder="email"
                    className={`input-bordered input ${
                      errors.username ? "input-error" : ""
                    }`}
                    {...register("username")}
                  />
                  {errors.username && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.username.message}
                      </span>
                    </label>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
