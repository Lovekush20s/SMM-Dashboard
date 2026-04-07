import Navbar from '@/components/Navbar';
import QuickActions from '@/components/QuickActions';
import ContentSheetSection from '@/components/ContentSheetSection';
import AnalyticsSection from '@/components/AnalyticsSection';
import AIToolsSection from '@/components/AIToolsSection';
import DesignSection from '@/components/DesignSection';
import ReviewSection from '@/components/ReviewSection';
import PublishSection from '@/components/PublishSection';
import ChecklistSection from '@/components/ChecklistSection';
import NotesSection from '@/components/NotesSection';
import TotalProgressSection from '@/components/TotalProgressSection';

const Index = () => {
  return (
    <div className="dashboard-bg transition-colors duration-500">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-8 space-y-6">
        {/* Greeting + Quick Actions */}
        
        <QuickActions />

        {/* Stats & Progress */}
        <TotalProgressSection />

        {/* Content Sheet */}
        <ContentSheetSection />

        {/* Analytics */}
        <AnalyticsSection />

        {/* Workflow Cards - 2x2 Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          <AIToolsSection />
          <DesignSection />
          <ReviewSection />
          <PublishSection />
        </div>

        {/* Checklist & Notes */}
        <div className="grid gap-6 md:grid-cols-2">
          <ChecklistSection />
          <NotesSection />
        </div>
      </main>

      <footer className="py-8 text-center text-xs text-muted-foreground">
        <span className="brand-gradient-text font-semibold">Social Media Marketing</span> · Dashboard v2.0
      </footer>
    </div>
  );
};

export default Index;
