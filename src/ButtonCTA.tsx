import React from "react";

type CTAProp = {
  disabled: boolean;
  text: string;
  mobileCTA: boolean;
};

const ButtonCTA = ({ disabled, text, mobileCTA }: CTAProp) => {
  const classname = mobileCTA
    ? "srpay_btn btn-proceed-pay btn btn-primary py-3 px-5 w-100"
    : "srpay_btn btn-proceed-pay btn btn-primary py-3 px-5 d-none d-lg-block ";

  return (
    <button type="submit" className={classname} disabled={disabled}>
      <span className="pe-4">{text}</span>

      <svg
        width="11"
        height="17"
        viewBox="0 0 11 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 2L8.5 8.5L2 15"
          stroke="#E0EAEF"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
};

export default ButtonCTA;
