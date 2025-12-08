import { Button } from "@/components/ui/button";
import { Download, FileText, FileSpreadsheet, Presentation } from "lucide-react";

const files = [
    { name: "October Strategy Deck.pdf", type: "pdf", date: "Oct 01", size: "2.4 MB" },
    { name: "Keyword Research_v2.csv", type: "csv", date: "Sep 28", size: "145 KB" },
    { name: "Technical Audit Report.pdf", type: "pdf", date: "Sep 15", size: "5.1 MB" },
    { name: "Competitor Matrix.xlsx", type: "csv", date: "Sep 10", size: "850 KB" },
];

export function DeliverableVault() {
    return (
        <div className="h-full">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-heading text-xl font-bold">Deliverables</h3>
                <Button variant="ghost" size="sm" className="text-primary text-xs">View All</Button>
            </div>

            <div className="space-y-3">
                {files.map((file, i) => (
                    <div key={i} className="group flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors cursor-pointer">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-background border border-border flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                                {file.type === "pdf" ? <FileText className="w-5 h-5" /> :
                                    file.type === "csv" ? <FileSpreadsheet className="w-5 h-5" /> :
                                        <Presentation className="w-5 h-5" />}
                            </div>
                            <div>
                                <div className="text-sm font-medium group-hover:text-primary transition-colors">{file.name}</div>
                                <div className="text-[10px] text-muted-foreground">{file.date} • {file.size}</div>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                            <Download className="w-4 h-4" />
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
}
