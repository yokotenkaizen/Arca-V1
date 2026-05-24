import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";
import { Checkbox } from "@/src/components/ui/checkbox";
import { Slider } from "@/src/components/ui/slider";
import { Label } from "@/src/components/ui/label";
import { Button } from "@/src/components/ui/button";
import type { FilterState } from "@/src/pages/CatalogPage";

interface FilterSidebarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

const fileFormats = [
  { id: "csv", label: "CSV" },
  { id: "sql", label: "SQL" },
  { id: "bak", label: "BAK" },
  { id: "json", label: "JSON" },
  { id: "xlsx", label: "XLSX" },
];

const categories = [
  { id: "b2b", label: "B2B Lead" },
  { id: "financial", label: "Financial Dataset" },
  { id: "ecommerce", label: "E-Commerce Analytics" },
  { id: "automotive", label: "Automotive SQL" },
  { id: "academic", label: "Academic Research" },
  { id: "realestate", label: "Real Estate" },
];

const formatPrice = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
};

const formatNumber = (value: number) => {
  return new Intl.NumberFormat("id-ID").format(value);
};

export default function FilterSidebar({ filters, setFilters }: FilterSidebarProps) {
  const handleFormatChange = (formatId: string, checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      formats: checked
        ? [...prev.formats, formatId]
        : prev.formats.filter((f) => f !== formatId),
    }));
  };

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      categories: checked
        ? [...prev.categories, categoryId]
        : prev.categories.filter((c) => c !== categoryId),
    }));
  };

  const handleReset = () => {
    setFilters({
      priceRange: [0, 50000000],
      formats: [],
      recordRange: [0, 5000000],
      categories: [],
    });
  };

  return (
    <div className="bg-card/50 border border-border rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">Filter</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleReset}
          className="text-muted-foreground hover:text-foreground text-xs"
        >
          Reset
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={["price", "format", "records", "category"]} className="space-y-2">
        {/* Price Range */}
        <AccordionItem value="price" className="border-border/50">
          <AccordionTrigger className="text-sm font-medium py-3 hover:no-underline">
            Rentang Harga
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-4">
            <div className="space-y-4">
              <Slider
                value={filters.priceRange}
                onValueChange={(value) =>
                  setFilters((prev) => ({ ...prev, priceRange: value as [number, number] }))
                }
                max={50000000}
                step={500000}
                className="mt-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{formatPrice(filters.priceRange[0])}</span>
                <span>{formatPrice(filters.priceRange[1])}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* File Format */}
        <AccordionItem value="format" className="border-border/50">
          <AccordionTrigger className="text-sm font-medium py-3 hover:no-underline">
            Format File
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-4">
            <div className="space-y-3">
              {fileFormats.map((format) => (
                <div key={format.id} className="flex items-center space-x-3">
                  <Checkbox
                    id={format.id}
                    checked={filters.formats.includes(format.id)}
                    onCheckedChange={(checked) =>
                      handleFormatChange(format.id, checked as boolean)
                    }
                    className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <Label
                    htmlFor={format.id}
                    className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                  >
                    {format.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Record Range */}
        <AccordionItem value="records" className="border-border/50">
          <AccordionTrigger className="text-sm font-medium py-3 hover:no-underline">
            Jumlah Record
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-4">
            <div className="space-y-4">
              <Slider
                value={filters.recordRange}
                onValueChange={(value) =>
                  setFilters((prev) => ({ ...prev, recordRange: value as [number, number] }))
                }
                max={5000000}
                step={10000}
                className="mt-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{formatNumber(filters.recordRange[0])}</span>
                <span>{formatNumber(filters.recordRange[1])}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Category */}
        <AccordionItem value="category" className="border-border/50">
          <AccordionTrigger className="text-sm font-medium py-3 hover:no-underline">
            Kategori
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-4">
            <div className="space-y-3">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-3">
                  <Checkbox
                    id={category.id}
                    checked={filters.categories.includes(category.id)}
                    onCheckedChange={(checked) =>
                      handleCategoryChange(category.id, checked as boolean)
                    }
                    className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <Label
                    htmlFor={category.id}
                    className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                  >
                    {category.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
