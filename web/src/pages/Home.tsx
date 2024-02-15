import { CreateMessage } from "../components/CreateMessage";
import { Profile } from "@/components/Profile";
import { PublicMessages } from "@/components/PublicMessages";
import { PrivateMessages } from "@/components/PrivateMessages";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Experience } from "@/components/Experience";

export function Home() {
  return (
    <div className="w-[980px] h-screen mx-auto relative">
      <Experience />

      <div className="relative z-2">
        <Profile />

        <CreateMessage />

        <h1 className="text-slate-200 font-bold text-4xl mx-5 mt-8 mb-5">
          Feed
        </h1>

        <Tabs defaultValue="public" className="pb-5">
          <TabsList className="rounded-lg border-solid border-2 border-slate-600 bg-slate-800 text-slate-200 grid w-[400px] p-2 mb-10 h-auto grid-cols-2 mx-auto">
            <TabsTrigger
              className="TabsTrigger font-bold transition-colors"
              value="public"
            >
              Public
            </TabsTrigger>
            <TabsTrigger
              className="TabsTrigger font-bold transition-colors"
              value="mine"
            >
              My messages
            </TabsTrigger>
          </TabsList>
          <TabsContent value="public">
            <PublicMessages />
          </TabsContent>
          <TabsContent value="mine">
            <PrivateMessages />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
