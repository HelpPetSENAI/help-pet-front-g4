import {
  SocialLoginButton,
  SocialLoginContainer,
  SocialLoginText,
  SocialLoginLink,
  SocialWrapper
} from "../../styles/SocialLoginStyles";

export default function SocialLogin() {
  return (
    <SocialWrapper>
      <SocialLoginContainer>
        <SocialLoginButton>
          <img src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" width="24" />
          Sign in with Google
        </SocialLoginButton>

        <SocialLoginButton>
          <img src="https://cdn-icons-png.flaticon.com/512/0/747.png" width="24" />
          Sign in with Apple
        </SocialLoginButton>
      </SocialLoginContainer>

      <SocialLoginText>
        Não tem conta?{" "}
        <SocialLoginLink>Faça seu cadastro</SocialLoginLink>
      </SocialLoginText>
    </SocialWrapper>
  );
}