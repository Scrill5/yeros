export default function Formulario() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f]">
      <form className="bg-[#1a1a1a] p-8 rounded-2xl shadow-lg w-96 max-w-sm">
        <div className="text-center mb-8">
          <div className="relative w-24 h-24 mx-auto mb-4">
            <img
              src="https://pnghq.com/wp-content/uploads/pnghq.com-green-person-unrestricted-2.png"
              alt="User"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Member Login</h2>
          <p className="text-gray-400 text-sm">Welcome back! Please login to your account</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full px-4 py-3 rounded-lg bg-[#2a2a2a] border border-gray-600 text-white focus:outline-none focus:border-blue-500 transition duration-200"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-lg bg-[#2a2a2a] border border-gray-600 text-white focus:outline-none focus:border-blue-500 transition duration-200"
            />
          </div>

          <div className="flex items-center justify-between text-sm text-gray-400">
            <div className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span>Remember me</span>
            </div>
            <a href="#" className="hover:text-blue-400 transition-colors">Forgot Password?</a>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 font-semibold"
          >
            Login
          </button>

          <div className="text-center mt-6">
            <p className="text-gray-400">
              Don't have an account?{' '}
              <a href="#" className="text-blue-400 hover:text-blue-500 transition-colors">
                Create Account
              </a>
            </p>
          </div>
        </div>
      </form>
    </div>
  )
}