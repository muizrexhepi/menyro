import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Save } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your restaurant settings and preferences.
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Restaurant Information</CardTitle>
              <CardDescription>
                Update your restaurant's basic information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="restaurant-name">Restaurant Name</Label>
                  <Input id="restaurant-name" defaultValue="Delicious Bistro" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="restaurant-type">Restaurant Type</Label>
                  <Input id="restaurant-type" defaultValue="Fine Dining" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="+385 1 234 5678" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="contact@restaurant.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    defaultValue="https://www.restaurant.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input id="instagram" defaultValue="@restaurant" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  defaultValue="A fine dining restaurant serving the best cuisine in town."
                  rows={4}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Location</CardTitle>
              <CardDescription>
                Update your restaurant's address and location
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Street Address</Label>
                  <Input id="address" defaultValue="123 Restaurant Street" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" defaultValue="Zagreb" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" defaultValue="Croatia" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postal-code">Postal Code</Label>
                  <Input id="postal-code" defaultValue="10000" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="map-location">Map Location</Label>
                <div className="h-[200px] bg-muted/20 rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">
                    Map preview would be displayed here
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div className="space-y-2">
                    <Label htmlFor="latitude">Latitude</Label>
                    <Input id="latitude" defaultValue="45.815399" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="longitude">Longitude</Label>
                    <Input id="longitude" defaultValue="15.966568" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Menu Appearance</CardTitle>
              <CardDescription>
                Customize how your QR menu looks to customers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="menu-theme">Menu Theme</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div className="border rounded-md p-2 cursor-pointer bg-primary/10 border-primary">
                    <div className="h-20 bg-background rounded-md mb-2"></div>
                    <p className="text-sm font-medium text-center">Light</p>
                  </div>
                  <div className="border rounded-md p-2 cursor-pointer">
                    <div className="h-20 bg-slate-900 rounded-md mb-2"></div>
                    <p className="text-sm font-medium text-center">Dark</p>
                  </div>
                  <div className="border rounded-md p-2 cursor-pointer">
                    <div className="h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-md mb-2"></div>
                    <p className="text-sm font-medium text-center">Colorful</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Logo</Label>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-md bg-muted/20 flex items-center justify-center">
                    <p className="text-xs text-muted-foreground">Logo</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Upload Logo
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="show-prices">Show Prices</Label>
                    <p className="text-sm text-muted-foreground">
                      Display prices on your menu
                    </p>
                  </div>
                  <Switch id="show-prices" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="show-images">Show Images</Label>
                    <p className="text-sm text-muted-foreground">
                      Display images for menu items
                    </p>
                  </div>
                  <Switch id="show-images" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="show-descriptions">Show Descriptions</Label>
                    <p className="text-sm text-muted-foreground">
                      Display descriptions for menu items
                    </p>
                  </div>
                  <Switch id="show-descriptions" defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Manage how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Notifications</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="new-reservation">New Reservations</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive emails for new reservations
                      </p>
                    </div>
                    <Switch id="new-reservation" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="cancelled-reservation">
                        Cancelled Reservations
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Receive emails for cancelled reservations
                      </p>
                    </div>
                    <Switch id="cancelled-reservation" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="new-order">New Orders</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive emails for new orders
                      </p>
                    </div>
                    <Switch id="new-order" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="marketing">Marketing Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive marketing emails and updates
                      </p>
                    </div>
                    <Switch id="marketing" />
                  </div>
                </div>

                <Separator />

                <h3 className="text-lg font-medium">Push Notifications</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="push-reservations">Reservations</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive push notifications for reservations
                      </p>
                    </div>
                    <Switch id="push-reservations" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="push-orders">Orders</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive push notifications for orders
                      </p>
                    </div>
                    <Switch id="push-orders" defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Plan</CardTitle>
              <CardDescription>
                Manage your subscription and billing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Pro Plan</h3>
                    <p className="text-sm text-muted-foreground">
                      29/month, billed monthly
                    </p>
                  </div>
                  <Badge>Current Plan</Badge>
                </div>
                <div className="mt-4 space-y-1">
                  <div className="flex items-center gap-2 text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 h-4 text-primary"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>QR Menu (unlimited items)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 h-4 text-primary"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Advanced reservation system</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 h-4 text-primary"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>5 staff accounts</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 h-4 text-primary"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Analytics dashboard</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button variant="outline">Change Plan</Button>
                <Button variant="outline">Manage Billing</Button>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="font-medium">Payment Method</h3>
                <div className="flex items-center gap-4">
                  <div className="rounded-md border p-2 px-4">
                    <div className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <rect width="20" height="14" x="2" y="5" rx="2" />
                        <line x1="2" x2="22" y1="10" y2="10" />
                      </svg>
                      <span className="text-sm">**** **** **** 4242</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="font-medium">Billing History</h3>
                <div className="rounded-md border">
                  <div className="grid grid-cols-4 p-3 border-b text-sm font-medium">
                    <div>Date</div>
                    <div>Amount</div>
                    <div>Status</div>
                    <div className="text-right">Invoice</div>
                  </div>
                  <div className="divide-y">
                    <div className="grid grid-cols-4 p-3 text-sm">
                      <div>May 1, 2023</div>
                      <div>29.00</div>
                      <div>
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 border-green-200"
                        >
                          Paid
                        </Badge>
                      </div>
                      <div className="text-right">
                        <Button variant="ghost" size="sm">
                          Download
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 p-3 text-sm">
                      <div>Apr 1, 2023</div>
                      <div>29.00</div>
                      <div>
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 border-green-200"
                        >
                          Paid
                        </Badge>
                      </div>
                      <div className="text-right">
                        <Button variant="ghost" size="sm">
                          Download
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 p-3 text-sm">
                      <div>Mar 1, 2023</div>
                      <div>29.00</div>
                      <div>
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 border-green-200"
                        >
                          Paid
                        </Badge>
                      </div>
                      <div className="text-right">
                        <Button variant="ghost" size="sm">
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
