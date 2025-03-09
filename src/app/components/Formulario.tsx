export default function Formulario(){
     return (
        <div className="flex flex-col items-center pt-8">
      <form className="flex flex-col w-80 max-w-90 pb-5 bg-neutral-800 rounded-2xl pt-8 items-center gap-3">
        <div className="flex flex-col items-center gap-3">
          <img
            className="bg-white rounded-[110px] w-1/4"
            src="https://pnghq.com/wp-content/uploads/pnghq.com-green-person-unrestricted-2.png"
          ></img>
          <p className="font-black">MEMBER LOGIN</p>
        </div>

        <div className="flex flex-col items-center pt-6 gap-6">
          <input
            placeholder="Username"
            className="h-10 hover:animate-pulse font-mono rounded-3xl border-2 text-center px-3"
            type="text"
          />
          <input
            maxLength={10}
            placeholder="Password"
            className="h-10 font-mono rounded-3xl hover:animate-pulse border-2 text-center px-3"
            type="password"
          />
        </div>

        <div className="text-sm flex mt-3 gap-5">
          <div>
            <p>Forgot Password?</p>
          </div>
          <div className="flex gap-2">
            <p>Remember me</p>
            <input className="cursor-pointer" type="checkbox" />
          </div>
        </div>
        <div className="flex flex-col items-center w-full pt-8">
          <button className="w-[50%] hover:animate-bounce bg-[#afafaf] h-10 rounded-3xl text-black cursor-pointer">
            Login
          </button>
        </div>
        <div className="flex items-center my-5 flex-col gap-1">
          <p className="text-sm text-[#ffffff5e]">Not a member?</p>
          <button className="border-1 py-1 px-3 rounded-3xl text-sm cursor-pointer ">
            Create account
          </button>
        </div>
      </form>
    </div>
     )
    
}