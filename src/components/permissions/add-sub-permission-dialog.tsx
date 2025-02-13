import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FunctionType } from "@/types/function.type";

export function AddSubPermissionDialog({
  parentPermission,
}: {
  parentPermission: FunctionType;
}) {
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Plus className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Sub-Permission</DialogTitle>
          <DialogDescription>
            Create a new sub-permission under {parentPermission.name}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="id">ID</Label>
            <Input id="id" value={id} onChange={(e) => setId(e.target.value)} />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Add Permission</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
