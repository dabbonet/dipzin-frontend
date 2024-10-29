import { Button } from "@/components/Shared/button";
import {
  Card, CardContent, CardFooter, CardHeader
} from "@/components/UI/card";
import { Icon } from "@/components/UI/icon";
import {
  Tabs, TabsContent, TabsList, TabsTrigger
} from "@/components/UI/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/Shared/avatar";
import Image from "next/image";
import { Input } from "@/components/Shared/input";
import { Dropdown } from "@/components/Shared/dropdown";
import { DialogClose } from "@/components/UI/dialog";

const avatars = [
  "https://github.com/shadcn.png",
  "https://github.com/shadcn.png",
  "https://github.com/shadcn.png",
  "https://github.com/shadcn.png",
  "https://github.com/shadcn.png",
  "https://github.com/shadcn.png",
]

type UserDetails = {
  name: string;
  username: string;
  bio: string;
  email: string;
  title: string;
  country: string;
  image: string;
};

const SettingsModal = ({ userDetails }: { userDetails: UserDetails }) => (
  <Card className="bg-slate-900 border-4 border-[#171f31] rounded-[20px] p-6 text-white font-outfit">
    <Tabs>
      <CardHeader className="w-full flex flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-white text-2xl">Account Information</h1>
          <p className="text-sm font-medium text-slate-300">Here you can view and edit your account information </p>
        </div>
        <TabsList>
          <TabsTrigger className="py-2 px-2.5 text-white" value="account-settings">Account Settings</TabsTrigger>
          <TabsTrigger className="py-2 px-2.5 text-white" value="membership">Membership</TabsTrigger>
        </TabsList>
      </CardHeader>
      <CardContent>
        <TabsContent value="account-settings">
          <form className="grid gap-6 md:grid-cols-2 grid-cols-1">
            <div>
              <p className="text-slate-400 text-base">Profile Picture</p>
              <div className="flex items-center gap-x-2 overflow-x-scroll scrollbar-hide">
                {avatars.map((avatar) => (
                  <Avatar className="size-[64px]" radius="square" key={avatar}>
                    <AvatarImage src={avatar} alt="@shadcn" />
                    <AvatarFallback>Avatar</AvatarFallback>
                  </Avatar>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className=" bg-slate-800 p-1 h-fit border border-dotted border-slate-600 cursor-pointer rounded-2xl">
                <div className="bg-slate-700 size-14 rounded-xl mx-auto md:mx-0 overflow-hidden">
                  <label htmlFor="label" className=" size-full cursor-pointer flex justify-center items-center relative z-50">
                    {userDetails.image ? <Image src={userDetails.image} width={58} height={58} alt="upload an image" className="size-full object-cover" id="image" /> : <Icon.Save className="absolute bottom-2 right-2" />}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="label"
                  />
                </div>

              </div>
              <div className="flex flex-col justify-center">
                <p className=" text-sm text-white">Upload a Profile Picture</p>
                <p className=" text-slate-600 text-sm">Supported formats: jpg, png maximum size: 2MB</p>
              </div>
            </div>
            <Input className="py-5 w-full" placeholder="ex:John" label="full name" required value={userDetails.name} name="name" />
            <Input className="py-5 w-full" placeholder="ex:@jhonDoe" label="username" value={userDetails.username} name="username" />
            <Input className="py-5 w-full" placeholder="ex:lorempixel" label="bio" value={userDetails.bio} name="bio" />
            <Input className="py-5 w-full" placeholder="ex:jhonDoe@example.com" label="email" value={userDetails.email} name="email" />
            <Input className="py-5 w-full" placeholder="ex:the great title" label="title" value={userDetails.title} name="title" />
            <Dropdown
              trigger={
                <Input className="py-5 w-full" placeholder="ex:US213A" label="country" value={userDetails.country} name="country" />
              }
              content={
                <p>content</p>
              }
            />
          </form>
        </TabsContent>
        <TabsContent value="membership">
          membership
        </TabsContent>
      </CardContent>
    </Tabs>
    <CardFooter className=" flex justify-between">
      <button type="button" className="text-[#C9FFED] text-sm">
        Need help?
      </button>
      <div className="flex items-center gap-2.5">
        <DialogClose asChild>
          <Button variant="darkGray" size="xl">
            Cancel
          </Button>
        </DialogClose>
        <Button size="xl">
          Save Updates
        </Button>
      </div>
    </CardFooter>
  </Card>
)

export default SettingsModal;
