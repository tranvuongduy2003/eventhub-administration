import { Upload, Download, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function ImportTab() {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImport = async () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select an Excel file to import",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      // TODO: Implement actual import logic here
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate loading
      toast({
        title: "Success",
        description: "Users imported successfully",
      });
      setSelectedFile(null);
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to import users: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (
      file &&
      file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      setSelectedFile(file);
      toast({
        title: "File selected",
        description: `Selected file: ${file.name}`,
      });
    } else {
      toast({
        title: "Invalid file type",
        description: "Please select an Excel file (.xlsx)",
        variant: "destructive",
      });
      event.target.value = ""; // Reset input
    }
  };

  const downloadSampleFile = async () => {
    try {
      // TODO: Implement actual download logic here
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate loading
      toast({
        title: "Success",
        description: "Sample file downloaded successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to download sample file: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="grid gap-6">
      <div className="grid gap-4">
        <div className="flex justify-between items-center">
          <Label htmlFor="file" className="text-lg font-semibold">
            Import Users
          </Label>
          <Button
            onClick={downloadSampleFile}
            variant="outline"
            size="sm"
            className="shrink-0"
            disabled={isLoading}
          >
            <Download className="mr-2 h-4 w-4" />
            Download Template
          </Button>
        </div>

        <div className="border-2 border-dashed rounded-lg p-6 text-center">
          {selectedFile ? (
            <div className="flex items-center justify-center gap-2">
              <FileSpreadsheet className="h-6 w-6 text-green-500" />
              <span className="font-medium">{selectedFile.name}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedFile(null)}
                className="ml-2 text-red-500 hover:text-red-600"
              >
                Remove
              </Button>
            </div>
          ) : (
            <>
              <Input
                id="file"
                type="file"
                accept=".xlsx"
                onChange={handleFileSelect}
                className="hidden"
              />
              <Label
                htmlFor="file"
                className="flex flex-col items-center gap-2 cursor-pointer"
              >
                <Upload className="h-8 w-8 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Click to select or drag and drop an Excel file
                </span>
                <span className="text-xs text-muted-foreground">
                  Only .xlsx files are supported
                </span>
              </Label>
            </>
          )}
        </div>

        <Button
          onClick={handleImport}
          variant="secondary"
          className="w-full mt-4"
          disabled={!selectedFile || isLoading}
        >
          {isLoading ? (
            "Processing..."
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Import Users
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
