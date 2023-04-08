import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { supabase } from "~/utils/supabase-client";
import { usePathname } from "next/navigation";
import { useDaisyToast } from "~/hooks/UseDaisyToast";

export const registerValidationSchema = yup.object({
  email: yup.string().email().required(),
  password: yup
    .string()
    .required()
    .min(8)
    .max(24)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  passwordConfirmation: yup
    .string()
    .required()
    .test("passwords-match", "Passwords have to match", function (value) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      return this.parent.password === value;
    }),
});

type registerFormValues = yup.InferType<typeof registerValidationSchema>;

export function Register() {
  const [isToastDisplayed, setIsToastDisplayed] = useState(false);
  const { ToastComponent, openToast } = useDaisyToast({
    title: "Email sent",
    message: "Verfication email has been sent",
    positionX: "end",
    positionY: "top",
    type: "success",
    withIcon: "defaultForType",
    withCloseButton: true,
  });

  const { ToastComponent: ErrorToast, openToast: openErrorToast } =
    useDaisyToast({
      title: "Email already taken",
      message: "An account with that email already exists",
      positionX: "end",
      positionY: "top",
      type: "error",
      withIcon: "defaultForType",
      withCloseButton: true,
    });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<registerFormValues>({
    defaultValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    resolver: yupResolver(registerValidationSchema),
  });

  const signUpWithPassword = async (values: registerFormValues) => {
    const { error, data } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        emailRedirectTo: `${window.location.href}/set-up-profile`,
      },
    });

    if (
      data.user &&
      data.user.identities &&
      data.user.identities.length === 0
    ) {
      openErrorToast();
      return;
    }

    if (data) {
      openToast();
      reset();
    }

    console.log(error);
  };

  const onSubmit = (values: registerFormValues) => {
    console.log(values);
    void signUpWithPassword(values);
  };

  const signUpWithGoogle = async () => {
    const { error, data } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.href}/set-up-profile`,
      },
    });
  };

  const signUpWithApple = async () => {
    const { error, data } = await supabase.auth.signInWithOAuth({
      provider: "apple",
      options: {
        redirectTo: `${window.location.href}/set-up-profile`,
      },
    });
  };

  return (
    <>
      <ToastComponent />
      <ErrorToast />
      <div className="hero min-h-screen">
        <div className="hero-content flex-col gap-12 lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">First time?</h1>
            <p className="py-6">
              Sign up to Friendly Macros and start optimizing your dining
              experience - Discover, Plan, and Share Macro-Friendly Meals with
              ease!
            </p>
          </div>
          <div className="card w-full max-w-sm flex-shrink-0 bg-base-100 shadow-2xl">
            <div className="card-body">
              <div className="form-control">
                <button
                  className="btn-accent btn-sm btn"
                  onClick={() => void signUpWithGoogle()}
                >
                  Google
                </button>
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
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Confirm password</span>
                    </label>
                    <input
                      type="password"
                      placeholder="confirm password"
                      className={`input-bordered input ${
                        errors.passwordConfirmation ? "input-error" : ""
                      }`}
                      {...register("passwordConfirmation")}
                    />
                    {errors.passwordConfirmation && (
                      <label className="label">
                        <span className="label-text-alt text-error">
                          {errors.passwordConfirmation.message}
                        </span>
                      </label>
                    )}
                  </div>
                  <div className="form-control mt-6">
                    <button
                      type={"submit"}
                      className={`btn-primary btn ${
                        isSubmitSuccessful ? "loading" : ""
                      }`}
                    >
                      Create account
                    </button>
                  </div>
                  <Link href={"/log-in"}>
                    <label className="label pt-6">
                      <a
                        href="#"
                        className="link-hover label-text-alt link m-auto"
                      >
                        Already have an account? Log in here
                      </a>
                    </label>
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
