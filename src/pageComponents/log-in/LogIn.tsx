import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";

export const loginValidationSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

type LoginFormValues = yup.InferType<typeof loginValidationSchema>;

export function LogIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginValidationSchema),
  });

  console.log(errors);

  const onSubmit = (values: LoginFormValues) => {
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
                      errors.email ? "input-error" : ""
                    }`}
                    {...register("email")}
                  />
                  {errors.email && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.email.message}
                      </span>
                    </label>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="password"
                    className={`input-bordered input ${
                      errors.password ? "input-error" : ""
                    }`}
                    {...register("password")}
                  />
                  {errors.password && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.password.message}
                      </span>
                    </label>
                  )}
                  <label className="label">
                    <a href="#" className="link-hover label-text-alt link">
                      Forgot password?
                    </a>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <input
                    type={"submit"}
                    className="btn-primary btn"
                    value={"Log in"}
                  />
                </div>
                <Link href={"/register"}>
                  <label className="label pt-6">
                    <a
                      href="#"
                      className="link-hover label-text-alt link m-auto"
                    >
                      No account? Create one here
                    </a>
                  </label>
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
