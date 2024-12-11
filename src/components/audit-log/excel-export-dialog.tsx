import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Download, Upload } from "lucide-react";
import { useState } from "react";

export const ExcelExportDialog = () => {
  const { toast } = useToast();
  const [selectedColumns, setSelectedColumns] = useState({
    time: true,
    userName: true,
    service: true,
    action: true,
    duration: true,
    ipAddress: true,
    browser: true,
    parameters: true,
  });

  const handleExport = async () => {
    try {
      // TODO: Implement actual export logic here with selectedColumns
      toast({
        title: "Success",
        description: "Users exported successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to export users: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        variant: "destructive",
      });
    }
  };

  const toggleColumn = (column: keyof typeof selectedColumns) => {
    setSelectedColumns((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="success">
          <Upload className="w-4 h-4 mr-2" />
          Excel to Excel
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Excel to Excel</DialogTitle>
          <DialogDescription>Export audit logs to Excel.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-6">
          <div className="grid gap-4">
            <Label className="text-lg font-semibold">
              Select Columns to Export
            </Label>

            <div className="grid grid-cols-2 gap-4">
              {Object.entries(selectedColumns).map(([column, checked]) => (
                <div key={column} className="flex items-center space-x-3">
                  <Checkbox
                    id={column}
                    checked={checked}
                    onCheckedChange={() =>
                      toggleColumn(column as keyof typeof selectedColumns)
                    }
                  />
                  <Label htmlFor={column} className="capitalize cursor-pointer">
                    {column.replace(/([A-Z])/g, " $1").trim()}
                  </Label>
                </div>
              ))}
            </div>

            <Button
              onClick={handleExport}
              variant="secondary"
              className="w-full mt-6"
            >
              <Download className="w-4 h-4 mr-2" />
              Export to Excel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
