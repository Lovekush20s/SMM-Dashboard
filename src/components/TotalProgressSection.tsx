import DashboardCard from './DashboardCard';
import { BarChart3, PenTool, Send, Linkedin, TrendingUp, Users, ArrowUpRight, Eye, Clock, CheckCircle2 } from 'lucide-react';

export default function TotalProgressSection() {
  return (
    <div className="space-y-6">
      {/* Top Stats Strip */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 animate-slide-up" style={{ animationDelay: '100ms', animationFillMode: 'both' }}>
        <StatStrip icon={<PenTool className="h-4 w-4" />} label="Total Designed" value="170+" color="hsl(217 91% 50%)" />
        <StatStrip icon={<Send className="h-4 w-4" />} label="Total Published" value="170" color="hsl(152 60% 42%)" />
        <StatStrip icon={<Clock className="h-4 w-4" />} label="Pending" value="3" color="hsl(40 85% 52%)" />
        <StatStrip icon={<Eye className="h-4 w-4" />} label="Engagement" value="12.5K" color="hsl(270 70% 55%)" />
      </div>

      {/* LinkedIn Growth */}
      <DashboardCard title="LinkedIn Growth" icon={<Linkedin className="h-4 w-4 text-primary" />} delay={150}>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="stat-card">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1.5">
              <Users className="h-3.5 w-3.5" />
              Bhavishya Sharma
            </div>
            <p className="text-2xl font-bold text-foreground">+900</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1.5">
              <ArrowUpRight className="h-3 w-3 text-green-500" />
              5 → 900
            </p>
          </div>
          <div className="stat-card">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1.5">
              <Users className="h-3.5 w-3.5" />
              Second Account
            </div>
            <p className="text-2xl font-bold text-foreground">+760</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1.5">
              <ArrowUpRight className="h-3 w-3 text-green-500" />
              2,000 → 2,760
            </p>
          </div>
          <div className="stat-card !border-primary/20" style={{ background: 'hsl(var(--primary) / 0.06)' }}>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1.5">
              <TrendingUp className="h-3.5 w-3.5" />
              Total Growth
            </div>
            <p className="text-3xl font-bold text-primary">1,660</p>
          </div>
        </div>
      </DashboardCard>
    </div>
  );
}

function StatStrip({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  return (
    <div className="stat-card flex items-center gap-3">
      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
        style={{ background: `${color}15`, color }}
      >
        {icon}
      </span>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-xl font-bold text-foreground">{value}</p>
      </div>
    </div>
  );
}
