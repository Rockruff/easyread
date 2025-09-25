"use client";

import { CreditCardIcon, DatabaseIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

import { ImageInput } from "@/components/common/image-input";
import { PasswordInput } from "@/components/common/password-input";
import { fetchCurrentUser } from "@/lib/api/users";
import { useFetchedState } from "@/lib/hooks/fetch";

// Profile Section
// Profile Section
function ProfileSection() {
  const [user, setUser] = useFetchedState(undefined, fetchCurrentUser, []);
  if (!user) return;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>
          Update your personal information. Your avatar, display name, and email may be visible to others.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm">Avatar</label>
          <ImageInput
            value={user.avatar}
            onChange={(base64) => setUser({ ...user, avatar: base64 })}
            className="size-20"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm">Display Name</label>
          <Input defaultValue={user.displayName} />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm">Email</label>
          <Input type="email" defaultValue={user.email} />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="max-md:w-full">Save Changes</Button>
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
        <CardDescription>Change your password to keep your account secure.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
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
        <Button className="max-md:w-full">Save Changes</Button>
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
        <CardDescription>Select how you want to receive updates and alerts.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
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
        <Button className="max-md:w-full">Save Changes</Button>
      </CardFooter>
    </Card>
  );
}

// Branding Section
function BrandingSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Branding</CardTitle>
        <CardDescription>Customize the default branding for your published documents.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm">Company Logo</label>
          <ImageInput className="size-20" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm">Company Name</label>
          <Input placeholder="Your company name" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm">Website URL</label>
          <Input placeholder="https://example.com" />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="max-md:w-full">Save Changes</Button>
      </CardFooter>
    </Card>
  );
}

function TransactionHistory() {
  // Mock data
  const transactions = [
    { date: "2025-01-12", change: "+500", reason: "Token Purchase" },
    { date: "2025-01-10", change: "-20", reason: "Image Generation" },
    { date: "2025-01-05", change: "-100", reason: "Document Creation" },
    { date: "2025-01-01", change: "+1000", reason: "Free Trial" },
  ];

  return (
    <div className="overflow-x-auto rounded-md border">
      <table className="w-full text-sm">
        <thead className="bg-muted">
          <tr>
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left">Change</th>
            <th className="px-4 py-2 text-left">Reason</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx, idx) => (
            <tr key={idx} className="border-t">
              <td className="px-4 py-2">{tx.date}</td>
              <td className={`px-4 py-2 ${tx.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                {tx.change}
              </td>
              <td className="px-4 py-2">{tx.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Billing Section
function BillingSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing</CardTitle>
        <CardDescription>
          View your available tokens, manage payment methods, and check billing history.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-6 max-md:contents">
          <div className="flex flex-col justify-between gap-4 rounded-lg bg-blue-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <span className="text-sm">Available Tokens</span>
                <span className="text-3xl font-bold">1,250</span>
              </div>
              <DatabaseIcon className="size-8" />
            </div>
            <Button className="bg-white text-blue-600 hover:bg-gray-100">Buy Tokens</Button>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm">Payment Method</label>
            <div className="flex flex-1 items-center gap-4 rounded-md border p-4">
              <CreditCardIcon className="text-muted-foreground mt-1 size-6" />
              <div className="flex flex-col text-sm">
                <span>VISA •••• 4242</span>
                <span className="text-muted-foreground text-xs">Expires 12/25</span>
              </div>
              <Button variant="ghost" size="icon" className="ml-auto">
                <Trash2Icon />
              </Button>
            </div>
            <Button>Change Payment Method</Button>
          </div>
        </div>
        <label className="text-sm">Transaction History</label>
        <TransactionHistory />
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
      <BrandingSection />
      <BillingSection />
    </main>
  );
}
