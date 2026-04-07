import { useWorkflow } from '@/context/WorkflowContext';
import DashboardCard from './DashboardCard';
import { BarChart3, TrendingUp, Eye, PenTool, Send, Linkedin, Activity, Award, Briefcase, Layout, Globe, CheckCircle, XCircle, Users } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';

interface BrandStats {
  designed: number;
  published: number;
  views: number;
  target?: number;
}

const DATA: Record<'7d' | '30d', Record<string, BrandStats>> = {
  '30d': {
    'Maven Jobs': { designed: 14, published: 13, views: 400 },
    'Profit Pathshala': { designed: 17, published: 16, views: 700 },
    'Savvi': { designed: 3, published: 2, views: 30 },
    'MKS': { designed: 3, published: 2, views: 20 },
  },
  '7d': {
    'Maven Jobs': { designed: 3, published: 3, views: 100, target: 3 },
    'Profit Pathshala': { designed: 3, published: 3, views: 400, target: 3 },
    'Savvi': { designed: 2, published: 2, views: 22, target: 2 },
    'MKS': { designed: 1, published: 1, views: 19, target: 1 },
  },
};

const DATA_90D = {
  'Maven Jobs': { published: 34, views: 16118, rate: 94 },
  'Profit Pathshala': { published: 74, views: 134923, rate: 97, badge: 'Top Performance' },
  'MKS': { published: 10, views: 2743, rate: 85 },
  'Savvi': { published: 3, views: 300, rate: 60 },
};

const LINKEDIN = {
  '30d': [
    { name: 'Ketan Sir', subtitle: 'Maven Content', posts: 3, views: 1500 },
    { name: 'Bhavishya Sir', subtitle: 'Savvi Content', posts: 1, views: 190, connections: 30 },
  ],
  '7d': [
    { name: 'Ketan Sir', subtitle: 'Maven Content', posts: 2, views: 800, connections: 100 },
    { name: 'Bhavishya Sir', subtitle: 'Savvi Content', posts: 1, views: 190, connections: 30 },
  ],
};

const BRAND_COLORS: Record<string, string> = {
  'Maven Jobs': 'hsl(210 75% 48%)',
  'Profit Pathshala': 'hsl(40 85% 52%)',
  'MKS': 'hsl(225 80% 56%)',
  'Savvi': 'hsl(174 65% 42%)',
};

function formatViews(v: number) {
  return v >= 1000 ? `${(v / 1000).toFixed(v >= 10000 ? 0 : 1)}K+` : `${v}+`;
}

function Section90d() {
  const brands = Object.keys(DATA_90D);
  return (
    <div className="space-y-6 animate-slide-up">
      <DashboardCard
        title="Social Media Performance — Nov - Jan Report"
        icon={<BarChart3 className="h-4 w-4 text-primary" />}
        delay={0}
      >
        {/* Master Summary */}
        <div className="mb-6 rounded-xl border border-border bg-card p-5">
          <h4 className="mb-4 text-sm font-semibold text-foreground">📋 Summary Overview</h4>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-3">
            {[
              { icon: <Activity className="h-3.5 w-3.5 text-primary" />, label: 'Duration', value: 'Last 3 Months (Nov – Jan)' },
              { icon: <Briefcase className="h-3.5 w-3.5 text-primary" />, label: 'Role', value: 'SMM (Individual)' },
              { icon: <Layout className="h-3.5 w-3.5 text-primary" />, label: 'Work Type', value: 'Content, Design, Posting, Reporting' },
              { icon: <Globe className="h-3.5 w-3.5 text-primary" />, label: 'Platforms', value: 'Instagram + LinkedIn' },
            ].map(item => (
              <div key={item.label} className="flex items-start gap-2">
                <div className="mt-0.5">{item.icon}</div>
                <div>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="font-medium text-foreground">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: 'Total Designs', value: '96', icon: <PenTool className="h-4 w-4" /> },
              { label: 'Total Published', value: '90', icon: <Send className="h-4 w-4" /> },
              { label: 'Total Views', value: '153K+', icon: <Eye className="h-4 w-4" /> },
              { label: 'Publish Rate', value: '94%', icon: <Activity className="h-4 w-4" /> },
            ].map(s => (
              <div key={s.label} className="rounded-xl border border-border bg-card p-3 text-center">
                <div className="mx-auto mb-1 flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {s.icon}
                </div>
                <p className="text-xl font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Brand Cards */}
        <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
          <Activity className="h-4 w-4 text-primary" />
          Company Performance (90 Days)
        </h4>
        <div className="grid gap-3 sm:grid-cols-2">
          {brands.map(brand => {
            const b = DATA_90D[brand as keyof typeof DATA_90D];
            return (
              <div key={brand} className="rounded-xl border border-border bg-card p-4 transition-all hover:shadow-md">
                <div className="mb-3 flex items-center justify-between">
                  <h5 className="text-sm font-semibold text-foreground">{brand}</h5>
                  <div className="flex items-center gap-2">
                    {'badge' in b && b.badge && (
                      <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold text-primary flex items-center gap-1">
                        <Award className="h-3 w-3" />
                        {b.badge}
                      </span>
                    )}
                    <span className="flex items-center gap-1 text-xs font-medium text-primary">
                      <TrendingUp className="h-3 w-3" />
                      {b.rate}%
                    </span>
                  </div>
                </div>
                <div className="mb-3 grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-lg font-bold text-foreground">{b.published}</p>
                    <p className="text-[10px] text-muted-foreground">Published</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-foreground">{formatViews(b.views)}</p>
                    <p className="text-[10px] text-muted-foreground">Views</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-foreground">{b.rate}%</p>
                    <p className="text-[10px] text-muted-foreground">Publish Rate</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>Publish Rate</span>
                    <span>{b.rate}%</span>
                  </div>
                  <Progress value={b.rate} className="h-1.5" />
                </div>
              </div>
            );
          })}
        </div>
      </DashboardCard>
    </div>
  );
}

const MARCH_DATA = {
  brands: {
    'Maven Jobs': { total: 16, successful: 16, unsuccessful: 0, rate: 100, reach: 900 },
    'Profit Pathshala': { total: 16, successful: 16, unsuccessful: 0, rate: 100, reach: 1000 },
    'MKS': { total: 8, successful: 3, unsuccessful: 5, rate: 38, reach: 30 },
    'Savvi': { total: 8, successful: 5, unsuccessful: 3, rate: 63, reach: 50 },
  },
  linkedin: {
    'Bhavishya Sharma': { subtitle: 'Savvi', sent: 140, accepted: 140, rejected: 0, rate: 112, reach: 900 },
    'Ketan Sir': { subtitle: 'Maven', sent: 455, accepted: 455, rejected: 0, rate: 114, reach: 3500 },
  },
};

function SectionMarch() {
  const brands = Object.keys(MARCH_DATA.brands);
  const linkedinProfiles = Object.keys(MARCH_DATA.linkedin);
  const totalPosts = brands.reduce((s, b) => s + MARCH_DATA.brands[b as keyof typeof MARCH_DATA.brands].total, 0);
  const totalSuccess = brands.reduce((s, b) => s + MARCH_DATA.brands[b as keyof typeof MARCH_DATA.brands].successful, 0);
  const totalReach = brands.reduce((s, b) => s + MARCH_DATA.brands[b as keyof typeof MARCH_DATA.brands].reach, 0);
  const avgRate = totalPosts > 0 ? Math.round((totalSuccess / totalPosts) * 100) : 0;

  const chartData = brands.map(b => ({
    name: b.split(' ')[0],
    Reach: MARCH_DATA.brands[b as keyof typeof MARCH_DATA.brands].reach,
    fill: BRAND_COLORS[b],
  }));

  return (
    <div className="space-y-6 animate-slide-up">
      <DashboardCard
        title="March Projection / Report"
        icon={<BarChart3 className="h-4 w-4 text-primary" />}
        delay={0}
      >
        {/* Summary */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: 'Total Posts', value: totalPosts, icon: <PenTool className="h-4 w-4" /> },
            { label: 'Successful', value: totalSuccess, icon: <CheckCircle className="h-4 w-4" /> },
            { label: 'Total Reach', value: `${formatViews(totalReach)}`, icon: <Eye className="h-4 w-4" /> },
            { label: 'Avg Success Rate', value: `${avgRate}%`, icon: <Activity className="h-4 w-4" /> },
          ].map(s => (
            <div key={s.label} className="rounded-xl border border-border bg-card p-3 text-center">
              <div className="mx-auto mb-1 flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                {s.icon}
              </div>
              <p className="text-xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Brand Cards */}
        <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
          <Activity className="h-4 w-4 text-primary" />
          Instagram — Post Design & Publish
        </h4>
        <div className="mb-6 grid gap-3 sm:grid-cols-2">
          {brands.map(brand => {
            const b = MARCH_DATA.brands[brand as keyof typeof MARCH_DATA.brands];
            return (
              <div key={brand} className="rounded-xl border border-border bg-card p-4 transition-all hover:shadow-md">
                <div className="mb-3 flex items-center justify-between">
                  <h5 className="text-sm font-semibold text-foreground">{brand}</h5>
                  <span className="flex items-center gap-1 text-xs font-medium text-primary">
                    <TrendingUp className="h-3 w-3" />
                    {b.rate}% success
                  </span>
                </div>
                <div className="mb-3 grid grid-cols-4 gap-2 text-center">
                  <div>
                    <p className="text-lg font-bold text-foreground">{b.total}</p>
                    <p className="text-[10px] text-muted-foreground">Total</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-primary">{b.successful}</p>
                    <p className="text-[10px] text-muted-foreground">Success</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-destructive">{b.unsuccessful}</p>
                    <p className="text-[10px] text-muted-foreground">Failed</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-foreground">{b.reach}+</p>
                    <p className="text-[10px] text-muted-foreground">Reach</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>Success Rate</span>
                    <span>{b.rate}%</span>
                  </div>
                  <Progress value={b.rate} className="h-1.5" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2">
          <div>
            <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
              <Eye className="h-4 w-4 text-primary" />
              Brand vs Reach
            </h4>
            <div className="h-48 w-full rounded-xl border border-border bg-card p-3">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                  <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                  <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
                  <Bar dataKey="Reach" radius={[6, 6, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-r-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div>
            <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
              <Send className="h-4 w-4 text-primary" />
              Brand vs Success Rate
            </h4>
            <div className="h-48 w-full rounded-xl border border-border bg-card p-3">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={brands.map(b => ({ name: b.split(' ')[0], Rate: MARCH_DATA.brands[b as keyof typeof MARCH_DATA.brands].rate, fill: BRAND_COLORS[b] }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                  <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} domain={[0, 100]} />
                  <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
                  <Bar dataKey="Rate" radius={[6, 6, 0, 0]}>
                    {brands.map((b, index) => (
                      <Cell key={`cell-sr-${index}`} fill={BRAND_COLORS[b]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* LinkedIn Connection Building */}
        <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
          <Linkedin className="h-4 w-4 text-primary" />
          LinkedIn Connection Building
        </h4>
        <div className="mb-6 grid grid-cols-3 gap-3">
          {(() => {
            const totalSent = Object.values(MARCH_DATA.linkedin).reduce((s, p) => s + p.sent, 0);
            const totalAccepted = Object.values(MARCH_DATA.linkedin).reduce((s, p) => s + p.accepted, 0);
            const totalReach = Object.values(MARCH_DATA.linkedin).reduce((s, p) => s + p.reach, 0);
            return [
              { label: 'Total Sent', value: `${totalSent}+`, icon: <Send className="h-4 w-4" /> },
              { label: 'Total Accepted', value: `${totalAccepted}+`, icon: <Users className="h-4 w-4" /> },
              { label: 'Total Reach', value: formatViews(totalReach), icon: <Eye className="h-4 w-4" /> },
            ].map(s => (
              <div key={s.label} className="rounded-xl border border-border bg-card p-3 text-center">
                <div className="mx-auto mb-1 flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {s.icon}
                </div>
                <p className="text-xl font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            ));
          })()}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {linkedinProfiles.map(name => {
            const p = MARCH_DATA.linkedin[name as keyof typeof MARCH_DATA.linkedin];
            return (
              <div key={name} className="rounded-xl border border-border bg-card p-4 transition-all hover:shadow-md">
                <div className="mb-2 flex items-center justify-between">
                  <div>
                    <h5 className="text-sm font-semibold text-foreground">{name}</h5>
                    <p className="text-xs text-muted-foreground">{p.subtitle} Content</p>
                  </div>
                  <span className="flex items-center gap-1 text-xs font-medium text-primary">
                    <TrendingUp className="h-3 w-3" />
                    {p.rate}% accepted
                  </span>
                </div>
                <div className="mb-3 grid grid-cols-4 gap-2 text-center">
                  <div>
                    <p className="text-lg font-bold text-foreground">{p.sent}</p>
                    <p className="text-[10px] text-muted-foreground">Sent</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-primary">{p.accepted}</p>
                    <p className="text-[10px] text-muted-foreground">Accepted</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-destructive">{p.rejected}</p>
                    <p className="text-[10px] text-muted-foreground">Rejected</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-foreground">{formatViews(p.reach)}</p>
                    <p className="text-[10px] text-muted-foreground">Reach</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>Acceptance Rate</span>
                    <span>{p.rate}%</span>
                  </div>
                  <Progress value={p.rate} className="h-1.5" />
                </div>
              </div>
            );
          })}
        </div>
      </DashboardCard>
    </div>
  );
}

const APRIL_DATA = {
  brands: {
    'Maven Jobs': { target: 18, done: 2 },
    'Profit Pathshala': { target: 10, done: 2 },
    'MKS': { target: 10, done: 1 },
    'Savvi': { target: 10, done: 1 },
  },
};

function SectionApril() {
  const brands = Object.keys(APRIL_DATA.brands);
  const totalTarget = brands.reduce((s, b) => s + APRIL_DATA.brands[b as keyof typeof APRIL_DATA.brands].target, 0);
  const totalDone = brands.reduce((s, b) => s + APRIL_DATA.brands[b as keyof typeof APRIL_DATA.brands].done, 0);
  const overallRate = totalTarget > 0 ? Math.round((totalDone / totalTarget) * 100) : 0;

  return (
    <div className="space-y-6 animate-slide-up">
      <DashboardCard
        title="April Report — Week 1"
        icon={<BarChart3 className="h-4 w-4 text-primary" />}
        delay={0}
      >
        {/* Overall Progress */}
        <div className="mb-6 rounded-xl border border-border bg-card p-4">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">Total April Progress</span>
            </div>
            <span className="text-sm font-bold text-primary">{totalDone}/{totalTarget} Done</span>
          </div>
          <Progress value={overallRate} className="h-2.5" />
          <p className="mt-1.5 text-xs text-muted-foreground">Week 1 completed — {totalDone} of {totalTarget} posts done ({overallRate}%)</p>
        </div>

        {/* Summary Stats */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: 'Total Target', value: totalTarget, icon: <PenTool className="h-4 w-4" /> },
            { label: 'Done', value: totalDone, icon: <CheckCircle className="h-4 w-4" /> },
            { label: 'Remaining', value: totalTarget - totalDone, icon: <Activity className="h-4 w-4" /> },
            { label: 'Completion', value: `${overallRate}%`, icon: <TrendingUp className="h-4 w-4" /> },
          ].map(s => (
            <div key={s.label} className="rounded-xl border border-border bg-card p-3 text-center">
              <div className="mx-auto mb-1 flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                {s.icon}
              </div>
              <p className="text-xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Brand Cards */}
        <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
          <Activity className="h-4 w-4 text-primary" />
          Brand-wise Target & Progress
        </h4>
        <div className="mb-6 grid gap-3 sm:grid-cols-2">
          {brands.map(brand => {
            const b = APRIL_DATA.brands[brand as keyof typeof APRIL_DATA.brands];
            const rate = b.target > 0 ? Math.round((b.done / b.target) * 100) : 0;
            return (
              <div key={brand} className="rounded-xl border border-border bg-card p-4 transition-all hover:shadow-md">
                <div className="mb-3 flex items-center justify-between">
                  <h5 className="text-sm font-semibold text-foreground">{brand}</h5>
                  <span className="flex items-center gap-1 text-xs font-medium text-primary">
                    <TrendingUp className="h-3 w-3" />
                    {rate}%
                  </span>
                </div>
                <div className="mb-3 grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-lg font-bold text-foreground">{b.target}</p>
                    <p className="text-[10px] text-muted-foreground">Target</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-primary">{b.done}</p>
                    <p className="text-[10px] text-muted-foreground">Done</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-foreground">{b.target - b.done}</p>
                    <p className="text-[10px] text-muted-foreground">Remaining</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>Progress</span>
                    <span>{b.done}/{b.target} ({rate}%)</span>
                  </div>
                  <Progress value={rate} className="h-1.5" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Chart */}
        <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
          <Eye className="h-4 w-4 text-primary" />
          Target vs Done
        </h4>
        <div className="h-48 w-full rounded-xl border border-border bg-card p-3">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={brands.map(b => ({ name: b.split(' ')[0], Target: APRIL_DATA.brands[b as keyof typeof APRIL_DATA.brands].target, Done: APRIL_DATA.brands[b as keyof typeof APRIL_DATA.brands].done }))}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
              <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} allowDecimals={false} />
              <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
              <Bar dataKey="Target" fill="hsl(var(--muted-foreground))" radius={[6, 6, 0, 0]} />
              <Bar dataKey="Done" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </DashboardCard>
    </div>
  );
}

const APRIL_PROJECTION = {
  'Maven Jobs': { viewTarget: 5000, likesMin: 100, likesMax: 200 },
  'Profit Pathshala': { viewTarget: 2500, likesMin: 0, likesMax: 0 },
  'MKS': { viewTarget: 2500, likesMin: 0, likesMax: 0 },
  'Savvi': { viewTarget: 2500, likesMin: 0, likesMax: 0 },
};

function SectionAprilProjection() {
  const brands = Object.keys(APRIL_PROJECTION);
  const daysInApril = 30;
  const totalViewTarget = brands.reduce((s, b) => s + APRIL_PROJECTION[b as keyof typeof APRIL_PROJECTION].viewTarget, 0);

  const dailyData = brands.map(b => {
    const d = APRIL_PROJECTION[b as keyof typeof APRIL_PROJECTION];
    return {
      name: b,
      viewTarget: d.viewTarget,
      dailyViews: Math.round(d.viewTarget / daysInApril),
      likesMin: d.likesMin,
      likesMax: d.likesMax,
      dailyLikesMin: d.likesMin > 0 ? Math.round(d.likesMin / daysInApril) : 0,
      dailyLikesMax: d.likesMax > 0 ? Math.round(d.likesMax / daysInApril) : 0,
    };
  });

  const chartData = dailyData.map(d => ({
    name: d.name.split(' ')[0],
    'Monthly Target': d.viewTarget,
    'Daily Target': d.dailyViews,
    fill: BRAND_COLORS[d.name],
  }));

  return (
    <div className="space-y-6 animate-slide-up">
      <DashboardCard
        title="April Projection — View & Engagement Targets"
        icon={<BarChart3 className="h-4 w-4 text-primary" />}
        delay={0}
      >
        {/* Overall Summary */}
        <div className="mb-6 rounded-xl border border-border bg-card p-5">
          <h4 className="mb-3 text-sm font-semibold text-foreground">🎯 April Targets Overview</h4>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: 'Total View Target', value: `${(totalViewTarget / 1000).toFixed(1)}K`, icon: <Eye className="h-4 w-4" /> },
              { label: 'Brands Tracked', value: brands.length, icon: <Briefcase className="h-4 w-4" /> },
              { label: 'Daily View Goal', value: `${Math.round(totalViewTarget / daysInApril)}`, icon: <TrendingUp className="h-4 w-4" /> },
              { label: 'Days in April', value: daysInApril, icon: <Activity className="h-4 w-4" /> },
            ].map(s => (
              <div key={s.label} className="rounded-xl border border-border bg-card p-3 text-center">
                <div className="mx-auto mb-1 flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {s.icon}
                </div>
                <p className="text-xl font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Brand Cards with Daily Breakdown */}
        <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
          <BarChart3 className="h-4 w-4 text-primary" />
          Brand-wise Daily Targets
        </h4>
        <div className="mb-6 grid gap-3 sm:grid-cols-2">
          {dailyData.map(d => (
            <div key={d.name} className="rounded-xl border border-border bg-card p-4 transition-all hover:shadow-md">
              <div className="mb-3 flex items-center justify-between">
                <h5 className="text-sm font-semibold text-foreground">{d.name}</h5>
                <span className="rounded-lg px-2 py-0.5 text-xs font-medium" style={{ backgroundColor: `${BRAND_COLORS[d.name]}20`, color: BRAND_COLORS[d.name] }}>
                  {formatViews(d.viewTarget)} target
                </span>
              </div>
              <div className={`mb-3 grid ${d.likesMin > 0 ? 'grid-cols-4' : 'grid-cols-2'} gap-2 text-center`}>
                <div>
                  <p className="text-lg font-bold text-foreground">{formatViews(d.viewTarget)}</p>
                  <p className="text-[10px] text-muted-foreground">Monthly Views</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-primary">{d.dailyViews}</p>
                  <p className="text-[10px] text-muted-foreground">Daily Views</p>
                </div>
                {d.likesMin > 0 && (
                  <>
                    <div>
                      <p className="text-lg font-bold text-foreground">{d.likesMin}-{d.likesMax}</p>
                      <p className="text-[10px] text-muted-foreground">Monthly Likes</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-primary">{d.dailyLikesMin}-{d.dailyLikesMax}</p>
                      <p className="text-[10px] text-muted-foreground">Daily Likes</p>
                    </div>
                  </>
                )}
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>Monthly Progress</span>
                  <span>2% completed</span>
                </div>
                <Progress value={2} className="h-1.5" />
              </div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
          <BarChart3 className="h-4 w-4 text-primary" />
          Monthly View Targets Comparison
        </h4>
        <div className="rounded-xl border border-border bg-card p-4">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData} barCategoryGap="25%">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
              <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
              <Tooltip
                contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 12, fontSize: 12 }}
              />
              <Bar dataKey="Monthly Target" radius={[6, 6, 0, 0]}>
                {chartData.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </DashboardCard>
    </div>
  );
}

export default function AnalyticsSection() {
  const { analyticsPeriod } = useWorkflow();

  if (!analyticsPeriod) return null;
  if (analyticsPeriod === '90d') return <Section90d />;
  if (analyticsPeriod === 'april') return <SectionApril />;
  if (analyticsPeriod === 'april-projection') return <SectionAprilProjection />;
  if (analyticsPeriod === 'march') return <SectionMarch />;

  const period = analyticsPeriod;
  const stats = DATA[period];
  const brands = Object.keys(stats);

  const totalDesigned = brands.reduce((s, b) => s + stats[b].designed, 0);
  const totalPublished = brands.reduce((s, b) => s + stats[b].published, 0);
  const totalViews = brands.reduce((s, b) => s + stats[b].views, 0);
  const publishRate = totalDesigned > 0 ? Math.round((totalPublished / totalDesigned) * 100) : 0;

  const chartData = brands.map(b => ({
    name: b.split(' ')[0],
    Views: stats[b].views,
    fill: BRAND_COLORS[b],
  }));

  return (
    <div className="space-y-6 animate-slide-up">
      <DashboardCard
        title={`Social Media Performance — ${period === '7d' ? 'Last 7 Days' : 'Feb Report'}`}
        icon={<BarChart3 className="h-4 w-4 text-primary" />}
        delay={0}
      >
        {/* Total Tasks This Week - only for 7d */}
        {period === '7d' && (
          <div className="mb-6 rounded-xl border border-border bg-card p-4">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-foreground">Total Tasks This Week</span>
              </div>
              <span className="text-sm font-bold text-primary">{totalDesigned}/{totalDesigned} Done ✅</span>
            </div>
            <Progress value={100} className="h-2.5" />
            <p className="mt-1.5 text-xs text-muted-foreground">All {totalDesigned} tasks completed — Great work! 🎉</p>
          </div>
        )}

        {/* Summary Stats */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: 'Designed', value: totalDesigned, icon: <PenTool className="h-4 w-4" /> },
            { label: 'Published', value: totalPublished, icon: <Send className="h-4 w-4" /> },
            { label: 'Views', value: `${totalViews}+`, icon: <Eye className="h-4 w-4" /> },
            { label: 'Publish Rate', value: `${publishRate}%`, icon: <Activity className="h-4 w-4" /> },
          ].map(s => (
            <div key={s.label} className="rounded-xl border border-border bg-card p-3 text-center">
              <div className="mx-auto mb-1 flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                {s.icon}
              </div>
              <p className="text-xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Instagram Brand Cards */}
        <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
          <Activity className="h-4 w-4 text-primary" />
          Instagram Analytics
        </h4>
        <div className="mb-6 grid gap-3 sm:grid-cols-2">
          {brands.map(brand => {
            const b = stats[brand];
            const rate = b.designed > 0 ? Math.round((b.published / b.designed) * 100) : 0;
            return (
              <div key={brand} className="rounded-xl border border-border bg-card p-4 transition-all hover:shadow-md">
                <div className="mb-3 flex items-center justify-between">
                  <h5 className="text-sm font-semibold text-foreground">{brand}</h5>
                  <span className="flex items-center gap-1 text-xs font-medium text-primary">
                    <TrendingUp className="h-3 w-3" />
                    {rate}% rate
                  </span>
                </div>
                <div className={`mb-3 grid ${b.target ? 'grid-cols-4' : 'grid-cols-3'} gap-2 text-center`}>
                  {b.target && (
                    <div>
                      <p className="text-lg font-bold text-foreground">{b.target}</p>
                      <p className="text-[10px] text-muted-foreground">Target</p>
                    </div>
                  )}
                  <div>
                    <p className="text-lg font-bold text-foreground">{b.designed}</p>
                    <p className="text-[10px] text-muted-foreground">Designed</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-foreground">{b.published}</p>
                    <p className="text-[10px] text-muted-foreground">Published</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-foreground">{b.views}+</p>
                    <p className="text-[10px] text-muted-foreground">Views</p>
                  </div>
                </div>
                {b.target && (
                  <div className="mb-2 space-y-1">
                    <div className="flex justify-between text-[10px] text-muted-foreground">
                      <span>Target Achieved</span>
                      <span>{b.published}/{b.target} ({Math.round((b.published / b.target) * 100)}%)</span>
                    </div>
                    <Progress value={Math.round((b.published / b.target) * 100)} className="h-1.5" />
                  </div>
                )}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>Publish Rate</span>
                    <span>{rate}%</span>
                  </div>
                  <Progress value={rate} className="h-1.5" />
                </div>
                <p className="mt-2 text-[10px] italic text-muted-foreground">
                  Projection: Based on last {period === '7d' ? '5' : '15'} days trend
                </p>
              </div>
            );
          })}
        </div>

        {/* Charts */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2">
          <div>
            <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
              <Eye className="h-4 w-4 text-primary" />
              Brand vs Views
            </h4>
            <div className="h-48 w-full rounded-xl border border-border bg-card p-3">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                  <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                  <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
                  <Bar dataKey="Views" radius={[6, 6, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-v-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div>
            <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
              <Send className="h-4 w-4 text-primary" />
              Brand vs Posts
            </h4>
            <div className="h-48 w-full rounded-xl border border-border bg-card p-3">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={brands.map(b => ({ name: b.split(' ')[0], Posts: stats[b].published, fill: BRAND_COLORS[b] }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                  <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} allowDecimals={false} />
                  <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
                  <Bar dataKey="Posts" radius={[6, 6, 0, 0]}>
                    {brands.map((b, index) => (
                      <Cell key={`cell-p-${index}`} fill={BRAND_COLORS[b]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* LinkedIn Performance Summary */}
        <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
          <Linkedin className="h-4 w-4 text-primary" />
          LinkedIn Performance
        </h4>
        <div className="mb-6 grid grid-cols-3 gap-3">
          {(() => {
            const linkedinData = LINKEDIN[period];
            const totalPosts = linkedinData.map(p => p.posts).reduce((a, b) => a + b, 0);
            const totalViews = linkedinData.map(p => p.views).reduce((a, b) => a + b, 0);
            const totalConnections = linkedinData.map(p => ('connections' in p ? (p.connections || 0) : 0)).reduce((a, b) => a + b, 0);
            return [
              { label: 'Total Posts', value: String(totalPosts), icon: <Send className="h-4 w-4" /> },
              { label: 'Total Views', value: `${totalViews}+`, icon: <Eye className="h-4 w-4" /> },
              { label: 'Total Connections', value: `${totalConnections}+`, icon: <Linkedin className="h-4 w-4" /> },
            ].map(s => (
              <div key={s.label} className="rounded-xl border border-border bg-card p-3 text-center">
                <div className="mx-auto mb-1 flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {s.icon}
                </div>
                <p className="text-xl font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            ));
          })()}
        </div>

        {/* LinkedIn Personal Account Performance */}
        <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
          <Linkedin className="h-4 w-4 text-primary" />
          LinkedIn Personal Account Performance
        </h4>
        <div className="grid gap-3 sm:grid-cols-2">
          {LINKEDIN[period].map(person => (
            <div key={person.name} className="rounded-xl border border-border bg-card p-4">
              <h5 className="text-sm font-semibold text-foreground">{person.name}</h5>
              <p className="mb-2 text-xs text-muted-foreground">{person.subtitle}</p>
              <div className="flex gap-4">
                {'connections' in person && person.connections && (
                  <div>
                    <p className="text-lg font-bold text-foreground">{person.connections}+</p>
                    <p className="text-[10px] text-muted-foreground">Connections</p>
                  </div>
                )}
                <div>
                  <p className="text-lg font-bold text-foreground">{person.posts}</p>
                  <p className="text-[10px] text-muted-foreground">Posts</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-foreground">{person.views}+</p>
                  <p className="text-[10px] text-muted-foreground">Views</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DashboardCard>
    </div>
  );
}