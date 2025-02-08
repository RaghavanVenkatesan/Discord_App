import React from "react";
import CustomPrimaryButton from "../../shared/components/CustomPrimaryButton.component";
import RedirectInfo from "../../shared/components/Redirectinfo.component";
import { useNavigate } from "react-router-dom"; // useNavigate replaces useHistory
import { Tooltip } from "@mui/material";

const getFormNotValidMessage = () => {
  return "Enter correct e-mail address and password should contain between 6 and 12 characters";
};

const getFormValidMessage = () => {
  return "Press to log in!";
};

const LoginPageFooter = ({ handleLogin, isFormValid }) => {
  const navigate = useNavigate(); // Replaces useHistory

  const handlePushToRegisterPage = () => {
    navigate("/register"); // Replaces history.push
  };

  return (
    <>
      <Tooltip
        title={!isFormValid ? getFormNotValidMessage() : getFormValidMessage()}
      >
        <div>
          <CustomPrimaryButton
            label="Log in"
            additionalStyles={{ marginTop: "30px" }}
            disabled={!isFormValid}
            onClick={handleLogin}
          />
        </div>
      </Tooltip>
      <RedirectInfo
        text="Need an account? "
        redirectText="Create an account"
        additionalStyles={{ marginTop: "5px" }}
        redirectHandler={handlePushToRegisterPage}
      />
    </>
  );
};

export default LoginPageFooter;
