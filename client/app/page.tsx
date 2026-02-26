
import SignInBtn from "@/components/ui/buttons/auth/SignInBtn";
import SignUpBtn from "@/components/ui/buttons/auth/SignUpBtn";

import Image from "next/image";




export default function Home() {



  return (
    <section className="max-w-screen w-screen min-h-screen grid grid-rows-[auto_1fr] md:grid-cols-2 md:grid-rows-1 ">
      <div className="p-4 flex  md:justify-center items-center  ">
        <div className="relative md:w-md aspect-square w-16 opacity-90 ">
          <Image src={"/white-logo.png"} alt="logo" fill />
        </div>
      </div>
      <div className=" flex justify-center items-center gap-16">
        <div className="">
          <h1 className="max-w-full text-wrap text-gray-200 text-6xl font-extrabold">
            Happening now
          </h1>
          <div className="max-w-fit min-w-72  space-y-5 grid place-content-center">
            <h3 className="text-gray-200 text-4xl font-bold">Join today.</h3>
            <div className=" space-y-2">
              <SignUpBtn />
              <p className=" max-w-64 text-zinc-600 text-xs">By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use.</p>
            </div>
            <div className="mt-10 space-y-5">
              <h5 className="text-xl font-bold">Already have an account?</h5>
              <SignInBtn />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
