import { LoginForm } from "@/components/Homepage/LoginForm";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import illustration from '../../public/4023504.jpg'


const Login = () => {
  return (
    <div className="min-h-screen flex  items-center w-full justify-center px-3 bg-gradient-to-r from-[#E4F8FF] via-[#FFFFFF] to-[#E1E1F8]">
      <div className="relative border flex p-8 rounded-lg border-[#A1BAF1] bg-gradient-to-r from-[#E4F8FF] via-[#FFFFFF] to-[#E1E1F8] shadow-sm">
        {/* <img src={bg} alt="" className="w-full h-full absolute object-cover z-0" /> */}
      <Card className="w-full lg:w-[400px] z-10 bg-transparent">
        <CardHeader>
          <CardTitle className="text-sm lg:text-2xl">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
      <div className="hidden lg:flex z-10 rounded-lg overflow-hidden ">
        <img className="mix-blend-color" src={illustration} alt="" width={400} />
      </div>
      </div>
      </div>
  );
};

export default Login;
