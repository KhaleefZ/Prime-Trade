import LoginForm from '@/components/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-4 text-center">
        <div className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wider text-indigo-600 uppercase bg-indigo-50 rounded-full shadow-sm">
          Trading Intelligence
        </div>
        <h1 className="text-4xl font-black text-gray-900 tracking-tight flex items-center justify-center gap-2">
          <span>Prime</span><span className="text-indigo-600">Trade</span>
        </h1>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <LoginForm />
      </div>
      <div className="mt-12 text-center text-xs text-gray-400 font-medium tracking-wide flex items-center justify-center gap-4">
        <span>Secure Encryption</span>
        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
        <span>JWT Auth</span>
        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
        <span>Server-side Validation</span>
      </div>
    </div>
  );
}
