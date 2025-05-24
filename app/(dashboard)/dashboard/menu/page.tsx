"use client";

import { useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import { useMenu } from "@/hooks/use-menu";
import {
  QrCode,
  Download,
  Plus,
  Edit,
  Trash2,
  Eye,
  Loader2,
} from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export default function QRMenuPage() {
  const {
    menuItems,
    menuCategories,
    loading,
    error,
    addMenuItem,
    editMenuItem,
    removeMenuItem,
    addMenuCategory,
  } = useMenu();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
  });
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    sortOrder: 0,
    isActive: true,
  });

  const filteredItems = menuItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddItem = async () => {
    try {
      await addMenuItem(newItem);
      setIsAddItemOpen(false);
      setNewItem({ name: "", description: "", price: 0, category: "" });
      toast("Success", {
        description: "Menu item added successfully",
      });
    } catch (error) {
      toast("Error", {
        description: "Failed to add menu item",
      });
    }
  };

  const handleEditItem = async () => {
    if (!editingItem) return;
    try {
      await editMenuItem(editingItem.id, newItem);
      setEditingItem(null);
      setNewItem({ name: "", description: "", price: 0, category: "" });
      toast("Success", {
        description: "Menu item updated successfully",
      });
    } catch (error) {
      toast("Error", {
        description: "Failed to update menu item",
      });
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    try {
      await removeMenuItem(itemId);
      toast("Success", {
        description: "Menu item deleted successfully",
      });
    } catch (error) {
      toast("Error", {
        description: "Failed to delete menu item",
      });
    }
  };

  const handleAddCategory = async () => {
    try {
      await addMenuCategory(newCategory);
      setIsAddCategoryOpen(false);
      setNewCategory({
        name: "",
        description: "",
        sortOrder: 0,
        isActive: true,
      });
      toast("Success", {
        description: "Category added successfully",
      });
    } catch (error) {
      toast("Error", {
        description: "Failed to add category",
      });
    }
  };

  const openEditDialog = (item: any) => {
    setEditingItem(item);
    setNewItem({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
    });
  };

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
          <h1 className="text-3xl font-bold tracking-tight">QR Menu</h1>
          <p className="text-muted-foreground">
            Create and manage your digital menu with QR code access.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Eye className="mr-2 h-4 w-4" />
            Preview Menu
          </Button>
          <Dialog open={isAddItemOpen} onOpenChange={setIsAddItemOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Menu Item
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Menu Item</DialogTitle>
                <DialogDescription>
                  Add a new item to your menu
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={newItem.name}
                    onChange={(e) =>
                      setNewItem({ ...newItem, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newItem.description}
                    onChange={(e) =>
                      setNewItem({ ...newItem, description: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="price">Price (€)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={newItem.price}
                    onChange={(e) =>
                      setNewItem({
                        ...newItem,
                        price: Number.parseFloat(e.target.value) || 0,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={newItem.category}
                    onValueChange={(value) =>
                      setNewItem({ ...newItem, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {menuCategories.map((category) => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAddItem}>Add Item</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="menu" className="space-y-4">
        <TabsList>
          <TabsTrigger value="menu">Menu Items</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="qr">QR Codes</TabsTrigger>
        </TabsList>

        <TabsContent value="menu" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Menu Items ({filteredItems.length})</CardTitle>
                <div className="flex items-center gap-2">
                  <Input
                    className="w-[250px]"
                    placeholder="Search menu items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-12 border-b px-4 py-3 font-medium">
                  <div className="col-span-4">Name</div>
                  <div className="col-span-2">Category</div>
                  <div className="col-span-2">Price</div>
                  <div className="col-span-2">Status</div>
                  <div className="col-span-2 text-right">Actions</div>
                </div>
                <div className="divide-y">
                  {filteredItems.map((item) => (
                    <div key={item.id} className="grid grid-cols-12 px-4 py-3">
                      <div className="col-span-4">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {item.description}
                        </div>
                      </div>
                      <div className="col-span-2 text-muted-foreground">
                        {item.category}
                      </div>
                      <div className="col-span-2">€{item.price.toFixed(2)}</div>
                      <div className="col-span-2">
                        <Badge
                          variant={item.isActive ? "default" : "secondary"}
                        >
                          {item.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <div className="col-span-2 flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditDialog(item)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {filteredItems.length === 0 && (
                    <div className="px-4 py-8 text-center text-muted-foreground">
                      No menu items found. Add your first menu item to get
                      started.
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Menu Categories</CardTitle>
                <Dialog
                  open={isAddCategoryOpen}
                  onOpenChange={setIsAddCategoryOpen}
                >
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Category
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Category</DialogTitle>
                      <DialogDescription>
                        Add a new category to organize your menu
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="categoryName">Name</Label>
                        <Input
                          id="categoryName"
                          value={newCategory.name}
                          onChange={(e) =>
                            setNewCategory({
                              ...newCategory,
                              name: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="categoryDescription">Description</Label>
                        <Textarea
                          id="categoryDescription"
                          value={newCategory.description}
                          onChange={(e) =>
                            setNewCategory({
                              ...newCategory,
                              description: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleAddCategory}>Add Category</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {menuCategories.map((category) => {
                  const itemCount = menuItems.filter(
                    (item) => item.category === category.name
                  ).length;
                  return (
                    <Card key={category.id}>
                      <CardHeader className="pb-2">
                        <CardTitle>{category.name}</CardTitle>
                        <CardDescription>{itemCount} items</CardDescription>
                      </CardHeader>
                      <CardFooter className="flex justify-between">
                        <Badge
                          variant={category.isActive ? "default" : "secondary"}
                        >
                          {category.isActive ? "Active" : "Hidden"}
                        </Badge>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  );
                })}
                {menuCategories.length === 0 && (
                  <div className="col-span-full text-center py-8 text-muted-foreground">
                    No categories found. Add your first category to organize
                    your menu.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="qr" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>QR Code Generator</CardTitle>
              <CardDescription>
                Generate QR codes for your digital menu
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="mb-6 p-4 border rounded-lg bg-white">
                <QrCode className="h-48 w-48" />
              </div>
              <div className="grid w-full max-w-sm gap-4">
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="qr-name" className="text-sm font-medium">
                    QR Code Name
                  </label>
                  <Input id="qr-name" placeholder="Main Menu QR" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="qr-url" className="text-sm font-medium">
                    Menu URL
                  </label>
                  <Input
                    id="qr-url"
                    value="https://restaurant.menu/your-restaurant"
                    readOnly
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center gap-4">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download PNG
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download SVG
              </Button>
              <Button>
                <QrCode className="mr-2 h-4 w-4" />
                Print QR Code
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Item Dialog */}
      <Dialog open={!!editingItem} onOpenChange={() => setEditingItem(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Menu Item</DialogTitle>
            <DialogDescription>Update the menu item details</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="editName">Name</Label>
              <Input
                id="editName"
                value={newItem.name}
                onChange={(e) =>
                  setNewItem({ ...newItem, name: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="editDescription">Description</Label>
              <Textarea
                id="editDescription"
                value={newItem.description}
                onChange={(e) =>
                  setNewItem({ ...newItem, description: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="editPrice">Price (€)</Label>
              <Input
                id="editPrice"
                type="number"
                step="0.01"
                value={newItem.price}
                onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    price: Number.parseFloat(e.target.value) || 0,
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="editCategory">Category</Label>
              <Select
                value={newItem.category}
                onValueChange={(value) =>
                  setNewItem({ ...newItem, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {menuCategories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleEditItem}>Update Item</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
