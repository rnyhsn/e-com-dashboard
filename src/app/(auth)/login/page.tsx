import { auth, signIn } from "@/utils/services/auth";
import { FaGoogle } from "react-icons/fa";


const LoginPage = async () => {
    const session = await auth();
    console.log(session);
    const signInWithGoogle = async () => {
        'use server';
        await signIn('google', {redirectTo: "/dashboard"});
    }
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-[40%] py-20 px-14 rounded-md bg-bgLightSecondary dark:bg-bgDarkSecondary">
            <form action={signInWithGoogle} className="">
                <button className="flex gap-3 items-center py-4 px-6 bg-blue-500 w-full rounded-md hover:bg-blue-400">
                    <FaGoogle /> Continue with Google
                </button>
            </form>
      </div>
    </div>
  )
}

export default LoginPage
