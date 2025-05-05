import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-md space-y-8 rounded-lg border p-8 shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome</h1>
          <p className="mt-2 text-muted-foreground">Sign in to your account or create a new one</p>
        </div>
        <div className="flex flex-col space-y-4">
          <Button asChild className="w-full">
            <Link href="/sign-in">Sign In</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/sign-up">Sign Up</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}

// "use client";

// import { useEffect, useState } from "react";
// import socket from "./socket";

// export default function Home() {
//   const [message, setMessage] = useState("");
//   const [chat, setChat] = useState<string[]>([]);

//   useEffect(() => {
//     socket.on("receive-message", (msg) => {
//       setChat((prev) => [...prev, msg]);
//     });

//     return () => {
//       socket.off("receive-message");
//     };
//   }, []);

//   const sendMessage = () => {
//     if (message.trim()) {
//       socket.emit("send-message", message);
//       setMessage("");
//     }
//   };

//   return (
//     <main className="h-screen flex justify-center items-center">
//       <div className="dark:bg-stone-900 text-black dark:text-white rounded-xl p-4 m-5 w-full max-w-sm flex flex-col shadow">
//         <div className="flex-1 overflow-y-auto max-h-64 min-h-80 mt-2">
//           <div className="p-2 space-y-2">
//             {chat.map((msg, i) => (
//               <div
//                 key={i}
//                 className={`text-sm p-3 rounded-lg w-fit ${
//                   i % 2 === 0
//                     ? "bg-stone-100 text-black dark:bg-stone-700 dark:text-white"
//                     : "bg-stone-800 text-white ml-auto dark:bg-black-500"
//                 }`}
//               >
//                 {msg}
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="border-bg-stone-300 dark:border-bg-stone-700 pt-2 mt-2">
//           <div className="flex items-center gap-2">
//             <input
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               placeholder="Type message..."
//               className="w-full p-2 rounded-lg border border-bg-stone-300 dark:border-bg-stone-600 text-sm bg-white dark:bg-stone-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-bg-stone-500"
//             />
//             <button
//               onClick={sendMessage}
//               className="bg-stone-800 text-white px-4 py-2 rounded-lg text-sm hover:bg-stone-100 hover:text-bg-stone-800 dark:bg-blue-600 dark:hover:bg-blue-700 transition"
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }
