import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload } from "lucide-react";
import { ExportTab } from "./export-tab";
import { ImportTab } from "./import-tab";

export function UserExcelOperationsDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="success">
          <Upload className="mr-2 h-4 w-4" />
          Import/Export
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Excel Operations</DialogTitle>
          <DialogDescription>
            Import users from Excel or export current users to Excel.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="import" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="import">Import</TabsTrigger>
            <TabsTrigger value="export">Export</TabsTrigger>
          </TabsList>

          <TabsContent value="import" className="mt-4">
            <ImportTab />
          </TabsContent>

          <TabsContent value="export" className="mt-4">
            <ExportTab />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
