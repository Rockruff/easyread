"use client";

import { CreditCard, Database, EditIcon, Plus, Trash2Icon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

import { PasswordInput } from "@/components/common/password-input";
import { fetchCurrentUser } from "@/lib/api/users";
import { useFetchedState } from "@/lib/hooks/fetch";
import { pickFile } from "@/lib/utils";

// Profile Section
function ProfileSection() {
  const [user, setUser] = useFetchedState(undefined, fetchCurrentUser, []);
  if (!user) return;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-6 max-md:flex-col">
        <div className="grid place-items-center">
          <Button
            variant="outline"
            className="relative block size-32 overflow-hidden rounded-full p-0"
            onClick={async () => {
              const file = await pickFile("image/*");
              if (!file) return;
              // mock change avatar
              setUser({ ...user, avatar: URL.createObjectURL(file) });
            }}
          >
            <img src={user.avatar} className="size-full" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/75 text-white transition-opacity not-hover:opacity-0">
              <EditIcon />
              <span>Edit</span>
            </div>
          </Button>
        </div>
        <div className="space-y-4 md:flex-1">
          <div className="flex flex-col gap-2">
            <label className="text-sm">Display Name</label>
            <Input value={user.displayName} />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm">Email</label>
            <Input type="email" value={user.email} />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="max-md:w-full">Update Profile</Button>
      </CardFooter>
    </Card>
  );
}

// Security Section
function SecuritySection() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Security</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative flex flex-col gap-2">
          <label className="text-sm">Current Password</label>
          <PasswordInput value={currentPassword} onValueChange={setCurrentPassword} />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm">New Password</label>
          <PasswordInput value={newPassword} onValueChange={setNewPassword} />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm">Confirm New Password</label>
          <PasswordInput value={newPasswordConfirm} onValueChange={setNewPasswordConfirm} />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="max-md:w-full">Change Password</Button>
      </CardFooter>
    </Card>
  );
}

// Notifications Section
function NotificationsSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Checkbox defaultChecked />
          <label className="text-sm">Email Notifications</label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox defaultChecked />
          <label className="text-sm">In-App Notifications</label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox />
          <label className="text-sm">Marketing Emails</label>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="max-md:w-full">Save Preferences</Button>
      </CardFooter>
    </Card>
  );
}

// Billing Section
function BillingSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tokens & Billing</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex flex-col justify-between gap-4 rounded-lg bg-blue-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <span className="text-sm">Available Tokens</span>
                <span className="text-3xl font-bold">1,250</span>
              </div>
              <Database className="size-8" />
            </div>
            <Button className="bg-white text-blue-600 hover:bg-gray-100">Buy More Tokens</Button>
          </div>

          <div className="flex flex-col gap-4">
            <label className="text-sm">Payment Method</label>
            <div className="contents">
              <div className="flex items-center gap-4 rounded-md border p-2 pl-4">
                <CreditCard className="text-muted-foreground size-5" />
                <span className="text-sm font-medium">VISA •••• 4242</span>
                <span className="text-muted-foreground mr-auto text-xs">Expires 12/25</span>
                <Button variant="ghost" size="icon">
                  <Trash2Icon />
                </Button>
              </div>
            </div>
            <Button variant="link">
              <Plus /> Add Payment Method
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Main Account Settings Page
export default function AccountSettingsPage() {
  return (
    <main className="flex flex-col max-md:gap-4 max-md:p-4 md:gap-8 md:p-8">
      <ProfileSection />
      <SecuritySection />
      <NotificationsSection />
      <BillingSection />
    </main>
  );
}
