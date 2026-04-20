import LoginForm from "../../components/Forms/LoginForm";
import ButtonLogin from "../../components/Button/Button";
import SocialLogin from "../../components/buttonSocial/SocialLogin"; 

export default function LoginDoador() {
  return (
    <div className="container-login">
      <div className="left-side">
        <LoginForm userType="login" />

        <ButtonLogin />

        <SocialLogin />
      </div>

      <div className="right-side"></div>
    </div>
  );
}