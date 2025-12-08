import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { FileText, MoreHorizontal } from "lucide-react";

const tasks = [
    { id: 1, title: "SaaS SEO Guide", status: "Drafting", assignee: "AI Agent", date: "Due Today" },
    { id: 2, title: "Best AI Tools Comparison", status: "Review", assignee: "Editor", date: "Due Tomorrow" },
    { id: 3, title: "Enterprise Link Building", status: "Published", assignee: "System", date: "Oct 24" },
    { id: 4, title: "Case Study: FinTech", status: "Drafting", assignee: "AI Agent", date: "Due Oct 28" },
];

export function ContentKanban() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="font-heading text-xl font-bold">Content Production</h3>
                <Badge variant="outline" className="bg-primary/5 text-primary">Live Pipeline</Badge>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
                {/* Drafting Column */}
                <div className="bg-muted/30 rounded-xl p-4 border border-border/50">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Drafting</h4>
                        <Badge variant="secondary" className="text-[10px]">2</Badge>
                    </div>
                    <div className="space-y-3">
                        {tasks.filter(t => t.status === "Drafting").map(task => (
                            <TaskCard key={task.id} task={task} />
                        ))}
                    </div>
                </div>

                {/* Review Column */}
                <div className="bg-muted/30 rounded-xl p-4 border border-border/50">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">In Review</h4>
                        <Badge variant="secondary" className="text-[10px]">1</Badge>
                    </div>
                    <div className="space-y-3">
                        {tasks.filter(t => t.status === "Review").map(task => (
                            <TaskCard key={task.id} task={task} />
                        ))}
                    </div>
                </div>

                {/* Published Column */}
                <div className="bg-muted/30 rounded-xl p-4 border border-border/50">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Published</h4>
                        <Badge variant="secondary" className="text-[10px]">1</Badge>
                    </div>
                    <div className="space-y-3">
                        {tasks.filter(t => t.status === "Published").map(task => (
                            <TaskCard key={task.id} task={task} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function TaskCard({ task }: { task: any }) {
    return (
        <Card className="p-3 bg-card border-border shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
            <div className="flex justify-between items-start mb-2">
                <Badge
                    variant="outline"
                    className={`text-[10px] ${task.status === "Published" ? "bg-green-500/10 text-green-500 border-green-500/20" :
                            task.status === "Review" ? "bg-orange-500/10 text-orange-500 border-orange-500/20" :
                                "bg-blue-500/10 text-blue-500 border-blue-500/20"
                        }`}
                >
                    {task.status}
                </Badge>
                <button className="text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal className="w-4 h-4" />
                </button>
            </div>
            <h5 className="font-medium text-sm mb-3">{task.title}</h5>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                    <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-[8px] font-bold text-primary">
                        AI
                    </div>
                    <span>{task.assignee}</span>
                </div>
                <div className="flex items-center gap-1">
                    <FileText className="w-3 h-3" />
                    <span>{task.date}</span>
                </div>
            </div>
        </Card>
    );
}
