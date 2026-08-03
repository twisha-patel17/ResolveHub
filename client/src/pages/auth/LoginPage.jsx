import AuthBranding from "../../components/auth/AuthBranding";
import LoginForm from "../../components/auth/LoginForm";

const LoginPage = () => {
  return (
    <section className="flex min-h-screen">
      <AuthBranding />

      <div className="flex w-full items-center justify-center bg-white px-6 lg:w-1/2">
        <LoginForm />
      </div>
    </section>
  );
};

export default LoginPage;