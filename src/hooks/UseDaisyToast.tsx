import { useCallback, useState } from "react";

interface buttonOptions {
  onClickCallback: () => void;
  colorScheme:
    | "primary"
    | "secondary"
    | "accent"
    | "info"
    | "success"
    | "warning"
    | "error";
  variant?: "outline" | "link" | "ghost" | "glass";
  size?: "lg" | "sm" | "xs";
  width?: "wide" | "square" | "circle";
  buttonText: string;
}

interface toastOptions {
  title: string;
  message?: string;
  type?: "success" | "warning" | "error" | "info";
  positionX: "end" | "start" | "center";
  positionY: "top" | "bottom" | "middle";
  withIcon?: "defaultForType" | JSX.Element;
  withCloseButton?: boolean;
  extraButton?: buttonOptions;
}

const icons = {
  success: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 flex-shrink-0 stroke-current"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  warning: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 flex-shrink-0 stroke-current"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    </svg>
  ),
  error: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 flex-shrink-0 stroke-current"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  info: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      className="h-6 w-6 flex-shrink-0 stroke-current"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      ></path>
    </svg>
  ),
};

export function useDaisyToast({
  title,
  message,
  type,
  positionX,
  positionY,
  withIcon,
  withCloseButton,
  extraButton,
}: toastOptions) {
  const [isToastOpen, setIsToastOpen] = useState(false);

  const openToast = () => setIsToastOpen(true);
  const closeToast = () => setIsToastOpen(false);
  const toggleToast = () => setIsToastOpen((current) => !current);

  const ToastComponent = useCallback(
    () => (
      <>
        {isToastOpen && (
          <div className={`toast toast-${positionX} toast-${positionY}`}>
            <div className={`alert shadow-lg ${type ? `alert-${type}` : ""}`}>
              <div>
                {withIcon &&
                  (withIcon == "defaultForType"
                    ? type && icons[type]
                    : withIcon)}
                <div>
                  <h3 className={`font-bold`}>{title}</h3>
                  {message && <div className={`text-xs`}>{message}</div>}
                </div>
              </div>
              <div className={`flex-none`}>
                {extraButton && (
                  <button
                    className={`
                    ${extraButton.variant ? `btn-${extraButton.variant}` : ""} 
                    btn-${extraButton.colorScheme}
              ${extraButton.size ? `btn-${extraButton.size}` : ""}
              ${extraButton.width ? `btn-${extraButton.width}` : ""}
              btn`}
                    onClick={() => extraButton.onClickCallback()}
                  >
                    {extraButton.buttonText}
                  </button>
                )}

                {withCloseButton && (
                  <button
                    className="btn-square btn-xs btn"
                    onClick={() => setIsToastOpen(false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-x"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M18 6l-12 12"></path>
                      <path d="M6 6l12 12"></path>
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </>
    ),
    [
      extraButton,
      isToastOpen,
      message,
      positionX,
      positionY,
      title,
      type,
      withCloseButton,
      withIcon,
    ]
  );

  return { ToastComponent, openToast, closeToast, toggleToast };
}
