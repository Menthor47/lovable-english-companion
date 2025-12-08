import { CheckCircle2, Circle } from "lucide-react";

const steps = [
    { title: "Technical Audit", date: "Sep 01", status: "completed", desc: "Found 12 critical errors" },
    { title: "Competitor Analysis", date: "Sep 05", status: "completed", desc: "Mapped 50 content gaps" },
    { title: "Content Engine Setup", date: "Sep 12", status: "completed", desc: "Knowledge Graph built" },
    { title: "First Sprint Launch", date: "Oct 01", status: "active", desc: "Publishing 20 articles" },
    { title: "Initial Ranking Report", date: "Nov 01", status: "upcoming", desc: "Expected movement" },
];

export function ProjectTimeline() {
    return (
        <div className="h-full">
            <h3 className="font-heading text-xl font-bold mb-6">Campaign Timeline</h3>
            <div className="relative border-l border-border/50 ml-3 space-y-8 pb-4">
                {steps.map((step, index) => (
                    <div key={index} className="relative pl-8">
                        <div className={`absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full border ${step.status === "completed" ? "bg-primary border-primary" :
                                step.status === "active" ? "bg-background border-primary animate-pulse" :
                                    "bg-background border-border"
                            }`} />

                        <div className="flex flex-col">
                            <span className="text-xs text-primary font-medium mb-0.5">{step.date}</span>
                            <h4 className={`font-semibold text-sm ${step.status === "upcoming" && "text-muted-foreground"}`}>
                                {step.title}
                            </h4>
                            <p className="text-xs text-muted-foreground mt-1">{step.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
