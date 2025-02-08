import React, { useState, useEffect } from "react";
import AuthBox from "../../shared/components/AuthBox.component";
import LoginPageFooter from "./LoginPageFooter.component";
import LoginPageHeader from "./LoginPageHeader.component";
import LoginPageInputs from "./LoginPageInputs.component";
import { validateLoginForm } from "../../shared/utils/validators";
import { connect } from "react-redux";
import { getActions } from "../../../store/auth/auth.action";
import { useNavigate } from "react-router-dom"; // useNavigate replaces useHistory

const LoginPage = ({ login }) => {
  const navigate = useNavigate(); // Replaces useHistory

  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(validateLoginForm({ mail, password }));
  }, [mail, password, setIsFormValid]);

  const handleLogin = () => {
    const userDetails = {
      mail,
      password,
    };

    login(userDetails, navigate); // Pass navigate instead of history
  };

  return (
    <AuthBox>
      <LoginPageHeader />
      <LoginPageInputs
        mail={mail}
        setMail={setMail}
        password={password}
        setPassword={setPassword}
      />
      <LoginPageFooter isFormValid={isFormValid} handleLogin={handleLogin} />
    </AuthBox>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(null, mapActionsToProps)(LoginPage);
