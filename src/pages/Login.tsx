import { LoginForm } from "@/components/Homepage/LoginForm";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
const Login = () => {
  return (
    <div className="min-h-screen flex items-center px-3">
      <Card className="w-full  lg:w-[400px] mx-auto">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
