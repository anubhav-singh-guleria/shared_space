import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";


export default function Home() {
  return (
    <div className="flex flex-col gap-y-4">
      <div>
        This is the screen for Authenticated users
      </div>
      <div>
        <UserButton/>
      </div>
    </div>
  );
}
