"use client";

import { useState } from "react";
import { CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal, Plus, Search, Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useStaff } from "@/hooks/use-staff";
import { toast } from "sonner";

export default function StaffPage() {
  const {
    staffMembers,
    staffRoles,
    staffInvitations,
    loading,
    error,
    editStaffMember,
    removeStaffMember,
    addStaffRole,
    inviteStaff,
  } = useStaff();
  const [searchTerm, setSearchTerm] = useState("");
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isRoleOpen, setIsRoleOpen] = useState(false);
  const [inviteData, setInviteData] = useState({
    email: "",
    role: "",
  });
  const [newRole, setNewRole] = useState({
    name: "",
    description: "",
    permissions: [] as string[],
  });

  const filteredStaff = staffMembers.filter(
    (staff) =>
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInviteStaff = async () => {
    try {
      await inviteStaff(inviteData.email, inviteData.role);
      setIsInviteOpen(false);
      setInviteData({ email: "", role: "" });
      toast("Success", {
        description: "Staff invitation sent successfully",
      });
    } catch (error) {
      toast("Error", {
        description: "Failed to send invitation",
      });
    }
  };

  const handleCreateRole = async () => {
    try {
      await addStaffRole(newRole);
      setIsRoleOpen(false);
      setNewRole({ name: "", description: "", permissions: [] });
      toast("Success", {
        description: "Role created successfully",
      });
    } catch (error) {
      toast("Error", {
        description: "Failed to create role",
      });
    }
  };

  const handleUpdateStaffStatus = async (staffId: string, status: string) => {
    try {
      await editStaffMember(staffId, { status: status as any });
      toast("Success", {
        description: "Staff status updated",
      });
    } catch (error) {
      toast("Error", {
        description: "Failed to update staff status",
      });
    }
  };

  const handleRemoveStaff = async (staffId: string) => {
    try {
      await removeStaffMember(staffId);
      toast("Success", {
        description: "Staff member removed",
      });
    } catch (error) {
      toast("Error", {
        description: "Failed to remove staff member",
      });
    }
  };

  const availablePermissions = [
    "menu_manage",
    "reservations_manage",
    "orders_manage",
    "staff_manage",
    "analytics_view",
    "settings_manage",
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Staff Management
          </h1>
          <p className="text-muted-foreground">
            Manage your restaurant's staff and roles.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Invite Staff
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Invite Staff Member</DialogTitle>
                <DialogDescription>
                  Send an invitation to join your restaurant team
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={inviteData.email}
                    onChange={(e) =>
                      setInviteData({ ...inviteData, email: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Select
                    value={inviteData.role}
                    onValueChange={(value) =>
                      setInviteData({ ...inviteData, role: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      {staffRoles.map((role) => (
                        <SelectItem key={role.id} value={role.name}>
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleInviteStaff}>Send Invitation</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="members" className="space-y-4">
        <TabsList>
          <TabsTrigger value="members">
            Staff Members ({staffMembers.length})
          </TabsTrigger>
          <TabsTrigger value="roles">
            Roles & Permissions ({staffRoles.length})
          </TabsTrigger>
          <TabsTrigger value="invites">
            Invitations ({staffInvitations.length})
          </TabsTrigger>
        </TabsList>

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search staff..."
              className="w-full md:w-[300px] pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <TabsContent value="members" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <div className="rounded-md">
                <div className="grid grid-cols-12 border-b px-4 py-3 font-medium">
                  <div className="col-span-4">Name</div>
                  <div className="col-span-3">Role</div>
                  <div className="col-span-2">Status</div>
                  <div className="col-span-2">Last Active</div>
                  <div className="col-span-1 text-right">Actions</div>
                </div>
                <div className="divide-y">
                  {filteredStaff.map((staff) => (
                    <div key={staff.id} className="grid grid-cols-12 px-4 py-4">
                      <div className="col-span-4 flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src="/placeholder.svg"
                            alt={staff.name}
                          />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {staff.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{staff.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {staff.email}
                          </div>
                        </div>
                      </div>
                      <div className="col-span-3 flex items-center">
                        <Badge variant="outline">{staff.role}</Badge>
                      </div>
                      <div className="col-span-2 flex items-center">
                        <Badge
                          variant={
                            staff.status === "active" ? "default" : "secondary"
                          }
                        >
                          {staff.status === "active" ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <div className="col-span-2 flex items-center text-muted-foreground text-sm">
                        {staff.lastActive
                          ? new Date(staff.lastActive).toLocaleDateString()
                          : "Never"}
                      </div>
                      <div className="col-span-1 flex justify-end items-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Change Role</DropdownMenuItem>
                            <DropdownMenuItem>Reset Password</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() =>
                                handleUpdateStaffStatus(
                                  staff.id,
                                  staff.status === "active"
                                    ? "inactive"
                                    : "active"
                                )
                              }
                            >
                              {staff.status === "active"
                                ? "Deactivate"
                                : "Activate"}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => handleRemoveStaff(staff.id)}
                            >
                              Remove
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                  {filteredStaff.length === 0 && (
                    <div className="px-4 py-8 text-center text-muted-foreground">
                      No staff members found.
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Roles & Permissions</CardTitle>
                <Dialog open={isRoleOpen} onOpenChange={setIsRoleOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Create Role
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create Role</DialogTitle>
                      <DialogDescription>
                        Create a new role with specific permissions
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="roleName">Role Name</Label>
                        <Input
                          id="roleName"
                          value={newRole.name}
                          onChange={(e) =>
                            setNewRole({ ...newRole, name: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="roleDescription">Description</Label>
                        <Input
                          id="roleDescription"
                          value={newRole.description}
                          onChange={(e) =>
                            setNewRole({
                              ...newRole,
                              description: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label>Permissions</Label>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          {availablePermissions.map((permission) => (
                            <label
                              key={permission}
                              className="flex items-center space-x-2"
                            >
                              <input
                                type="checkbox"
                                checked={newRole.permissions.includes(
                                  permission
                                )}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setNewRole({
                                      ...newRole,
                                      permissions: [
                                        ...newRole.permissions,
                                        permission,
                                      ],
                                    });
                                  } else {
                                    setNewRole({
                                      ...newRole,
                                      permissions: newRole.permissions.filter(
                                        (p) => p !== permission
                                      ),
                                    });
                                  }
                                }}
                              />
                              <span className="text-sm">
                                {permission.replace("_", " ")}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleCreateRole}>Create Role</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <CardDescription>
                Manage staff roles and their permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {staffRoles.map((role) => {
                  const memberCount = staffMembers.filter(
                    (staff) => staff.role === role.name
                  ).length;
                  return (
                    <Card key={role.id}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{role.name}</CardTitle>
                          <Badge variant="outline">{memberCount} members</Badge>
                        </div>
                        {role.description && (
                          <CardDescription>{role.description}</CardDescription>
                        )}
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="text-sm font-medium">
                            Permissions:
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {role.permissions.map((permission, i) => (
                              <Badge key={i} variant="secondary">
                                {permission.replace("_", " ")}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm">
                          Delete
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })}
                {staffRoles.length === 0 && (
                  <div className="col-span-full text-center py-8 text-muted-foreground">
                    No roles found. Create your first role to get started.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invites" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <div className="rounded-md">
                <div className="grid grid-cols-12 border-b px-4 py-3 font-medium">
                  <div className="col-span-4">Email</div>
                  <div className="col-span-3">Role</div>
                  <div className="col-span-2">Status</div>
                  <div className="col-span-2">Sent</div>
                  <div className="col-span-1 text-right">Actions</div>
                </div>
                <div className="divide-y">
                  {staffInvitations.map((invitation) => (
                    <div
                      key={invitation.id}
                      className="grid grid-cols-12 px-4 py-4"
                    >
                      <div className="col-span-4 flex items-center">
                        {invitation.email}
                      </div>
                      <div className="col-span-3 flex items-center">
                        <Badge variant="outline">{invitation.role}</Badge>
                      </div>
                      <div className="col-span-2 flex items-center">
                        <Badge
                          variant={
                            invitation.status === "pending"
                              ? "outline"
                              : "default"
                          }
                        >
                          {invitation.status}
                        </Badge>
                      </div>
                      <div className="col-span-2 flex items-center text-muted-foreground text-sm">
                        {new Date(invitation.createdAt).toLocaleDateString()}
                      </div>
                      <div className="col-span-1 flex justify-end items-center">
                        <Button variant="ghost" size="sm">
                          Resend
                        </Button>
                      </div>
                    </div>
                  ))}
                  {staffInvitations.length === 0 && (
                    <div className="px-4 py-8 text-center text-muted-foreground">
                      No pending invitations.
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
