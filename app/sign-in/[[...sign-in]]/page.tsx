import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200"> 
      <div className="rounded-lg w-full max-w-sm">
        <SignIn />
      </div>
    </div>
  );
}
