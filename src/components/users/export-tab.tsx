import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Download } from "lucide-react";
import { useState } from "react";

export function ExportTab() {
  const { toast } = useToast();
  const [selectedColumns, setSelectedColumns] = useState({
    fullName: true,
    email: true,
    userName: true,
    phoneNumber: true,
    status: true,
    bio: true,
    gender: true,
    dob: true,
    roles: true,
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
          <Download className="mr-2 h-4 w-4" />
          Export to Excel
        </Button>
      </div>
    </div>
  );
}
