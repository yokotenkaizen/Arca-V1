import { useState, useCallback } from "react";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { 
  Upload, 
  FileUp, 
  CheckCircle2, 
  AlertCircle,
  Database,
  DollarSign,
  Hash,
  FolderOpen,
  Code
} from "lucide-react";

const categories = [
  { value: "b2b", label: "B2B Lead" },
  { value: "financial", label: "Financial Dataset" },
  { value: "ecommerce", label: "E-Commerce Analytics" },
  { value: "automotive", label: "Automotive SQL" },
  { value: "academic", label: "Academic Research" },
  { value: "realestate", label: "Real Estate" },
  { value: "healthcare", label: "Healthcare Data" },
  { value: "global", label: "Global Markets" },
];

const samplePreviewTemplate = `{
  "columns": [
    { "name": "id", "type": "string", "masked": false },
    { "name": "company_name", "type": "string", "masked": true },
    { "name": "email", "type": "string", "masked": true },
    { "name": "phone", "type": "string", "masked": true },
    { "name": "city", "type": "string", "masked": false },
    { "name": "industry", "type": "string", "masked": false }
  ],
  "sample_rows": 5,
  "total_rows": 250000
}`;

export default function AdminUploadPage() {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    recordCount: "",
    category: "",
    description: "",
    samplePreview: samplePreviewTemplate,
  });

  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      const allowedTypes = [".csv", ".sql", ".bak", ".json", ".xlsx"];
      const fileExt = "." + droppedFile.name.split(".").pop()?.toLowerCase();
      
      if (allowedTypes.includes(fileExt)) {
        setFile(droppedFile);
        toast.success("File berhasil dipilih", {
          description: droppedFile.name,
        });
      } else {
        toast.error("Format file tidak didukung", {
          description: "Gunakan format: CSV, SQL, BAK, JSON, atau XLSX",
        });
      }
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      toast.success("File berhasil dipilih", {
        description: e.target.files[0].name,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      toast.error("File belum dipilih", {
        description: "Silakan upload file dataset terlebih dahulu",
      });
      return;
    }

    if (!formData.title || !formData.price || !formData.category) {
      toast.error("Data belum lengkap", {
        description: "Mohon lengkapi semua field yang diperlukan",
      });
      return;
    }

    setUploading(true);

    // Simulate upload process
    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast.success("Dataset berhasil diupload!", {
      description: "Dataset akan direview sebelum dipublikasikan",
    });

    setUploading(false);
    setFile(null);
    setFormData({
      title: "",
      price: "",
      recordCount: "",
      category: "",
      description: "",
      samplePreview: samplePreviewTemplate,
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + " MB";
    return (bytes / (1024 * 1024 * 1024)).toFixed(1) + " GB";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Admin Upload Panel
            </h1>
            <p className="text-muted-foreground">
              Upload dataset baru untuk dipublikasikan di marketplace
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column - Form Fields */}
              <div className="space-y-6">
                <Card className="bg-card/50 border-border p-6">
                  <h2 className="text-lg font-semibold text-foreground mb-6">
                    Informasi Dataset
                  </h2>

                  <div className="space-y-5">
                    {/* Title */}
                    <div className="space-y-2">
                      <Label htmlFor="title" className="flex items-center gap-2">
                        <Database className="w-4 h-4 text-primary" />
                        Judul Dataset
                      </Label>
                      <Input
                        id="title"
                        placeholder="Contoh: Indonesia B2B Corporate Contacts 2024"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="bg-secondary/30 border-border focus:border-primary"
                      />
                    </div>

                    {/* Price */}
                    <div className="space-y-2">
                      <Label htmlFor="price" className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-primary" />
                        Harga (IDR)
                      </Label>
                      <Input
                        id="price"
                        type="number"
                        placeholder="15000000"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        className="bg-secondary/30 border-border focus:border-primary"
                      />
                    </div>

                    {/* Record Count */}
                    <div className="space-y-2">
                      <Label htmlFor="recordCount" className="flex items-center gap-2">
                        <Hash className="w-4 h-4 text-primary" />
                        Jumlah Record
                      </Label>
                      <Input
                        id="recordCount"
                        type="number"
                        placeholder="250000"
                        value={formData.recordCount}
                        onChange={(e) => setFormData({ ...formData, recordCount: e.target.value })}
                        className="bg-secondary/30 border-border focus:border-primary"
                      />
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <FolderOpen className="w-4 h-4 text-primary" />
                        Kategori
                      </Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData({ ...formData, category: value })}
                      >
                        <SelectTrigger className="bg-secondary/30 border-border focus:border-primary">
                          <SelectValue placeholder="Pilih kategori" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border">
                          {categories.map((cat) => (
                            <SelectItem key={cat.value} value={cat.value}>
                              {cat.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <Label htmlFor="description">Deskripsi</Label>
                      <Textarea
                        id="description"
                        placeholder="Deskripsi singkat tentang dataset..."
                        rows={3}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="bg-secondary/30 border-border focus:border-primary resize-none"
                      />
                    </div>
                  </div>
                </Card>
              </div>

              {/* Right Column - File Upload & Preview */}
              <div className="space-y-6">
                {/* File Dropzone */}
                <Card className="bg-card/50 border-border p-6">
                  <h2 className="text-lg font-semibold text-foreground mb-4">
                    Upload File
                  </h2>

                  <div
                    className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                      dragActive
                        ? "border-primary bg-primary/5"
                        : file
                        ? "border-primary/50 bg-primary/5"
                        : "border-border hover:border-primary/30 hover:bg-secondary/20"
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <input
                      type="file"
                      id="file-upload"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      accept=".csv,.sql,.bak,.json,.xlsx"
                      onChange={handleFileInput}
                    />

                    {file ? (
                      <div className="flex flex-col items-center">
                        <CheckCircle2 className="w-12 h-12 text-primary mb-3" />
                        <p className="font-medium text-foreground mb-1">{file.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatFileSize(file.size)}
                        </p>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="mt-3 text-muted-foreground hover:text-foreground"
                          onClick={(e) => {
                            e.preventDefault();
                            setFile(null);
                          }}
                        >
                          Ganti file
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center mb-4">
                          <FileUp className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <p className="font-medium text-foreground mb-1">
                          Drag & drop file di sini
                        </p>
                        <p className="text-sm text-muted-foreground mb-3">
                          atau klik untuk memilih file
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Format: CSV, SQL, BAK, JSON, XLSX
                        </p>
                      </div>
                    )}
                  </div>
                </Card>

                {/* Sample Preview JSON */}
                <Card className="bg-card/50 border-border p-6">
                  <h2 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Code className="w-5 h-5 text-primary" />
                    Sample Preview Metadata
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    JSON konfigurasi untuk preview data (masking & columns)
                  </p>

                  <Textarea
                    value={formData.samplePreview}
                    onChange={(e) => setFormData({ ...formData, samplePreview: e.target.value })}
                    rows={12}
                    className="font-mono text-xs bg-secondary/30 border-border focus:border-primary"
                  />
                </Card>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <AlertCircle className="w-4 h-4" />
                <span>Dataset akan direview sebelum dipublikasikan</span>
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={uploading}
                className="bg-primary text-primary-foreground hover:bg-primary/90 glow-emerald font-semibold px-8"
              >
                {uploading ? (
                  <>
                    <Upload className="w-5 h-5 mr-2 animate-pulse" />
                    Mengupload...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5 mr-2" />
                    Upload Dataset
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
