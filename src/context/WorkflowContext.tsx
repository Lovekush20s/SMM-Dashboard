import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type CompanyId = 'maven-jobs' | 'profit-pathshala' | 'mks' | 'savvi';
export type ThemeMode = 'blue' | 'dark';
export type AnalyticsPeriod = '7d' | 'march' | 'april' | 'april-projection' | '30d' | '90d' | null;

export interface Company {
  id: CompanyId;
  name: string;
  shortName: string;
  logo: string;
}

import logoMaven from '@/assets/logo-maven.png';
import logoPP from '@/assets/logo-profit-pathshala.png';
import logoMKS from '@/assets/logo-mks.png';
import logoSavvi from '@/assets/logo-savvi.png';

export const COMPANIES: Company[] = [
  { id: 'maven-jobs', name: 'Maven Jobs', shortName: 'MJ', logo: logoMaven },
  { id: 'profit-pathshala', name: 'Profit Pathshala', shortName: 'PP', logo: logoPP },
  { id: 'mks', name: 'MKS', shortName: 'MKS', logo: logoMKS },
  { id: 'savvi', name: 'Savvi', shortName: 'SV', logo: logoSavvi },
];

export interface CompanyLinks {
  canvaDashboard: string;
  brandKit: string;
  designFolder: string;
  slack: string;
  instagram: string;
  facebook: string;
  twitter: string;
  pinterest: string;
  linkedin: string;
}

const DEFAULT_LINKS: CompanyLinks = {
  canvaDashboard: 'https://www.canva.com/',
  brandKit: 'https://www.canva.com/brand/',
  designFolder: '',
  slack: 'https://slack.com/',
  instagram: 'https://www.instagram.com/',
  facebook: 'https://www.facebook.com/',
  twitter: 'https://x.com/',
  pinterest: 'https://www.pinterest.com/',
  linkedin: 'https://www.linkedin.com/',
};

export interface ChecklistState {
  pickTopic: boolean;
  generateContent: boolean;
  designPost: boolean;
  updateSheet: boolean;
  sendForReview: boolean;
  publish: boolean;
}

const DEFAULT_CHECKLIST: ChecklistState = {
  pickTopic: false,
  generateContent: false,
  designPost: false,
  updateSheet: false,
  sendForReview: false,
  publish: false,
};

interface WorkflowState {
  activeCompany: CompanyId;
  adminMode: boolean;
  themeMode: ThemeMode;
  analyticsPeriod: AnalyticsPeriod;
  links: Record<CompanyId, CompanyLinks>;
  notes: string;
  checklist: ChecklistState;
}

interface WorkflowContextType extends WorkflowState {
  setActiveCompany: (id: CompanyId) => void;
  toggleAdminMode: () => void;
  setThemeMode: (mode: ThemeMode) => void;
  setAnalyticsPeriod: (period: AnalyticsPeriod) => void;
  updateLink: (company: CompanyId, key: keyof CompanyLinks, value: string) => void;
  setNotes: (notes: string) => void;
  toggleChecklist: (key: keyof ChecklistState) => void;
  resetChecklist: () => void;
  activeCompanyData: Company;
}

const STORAGE_KEY = 'prashant-workflow-hub';

function loadState(): WorkflowState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...parsed, themeMode: parsed.themeMode || 'blue', analyticsPeriod: null };
    }
  } catch {}
  return {
    activeCompany: 'maven-jobs',
    adminMode: false,
    themeMode: 'blue',
    analyticsPeriod: null,
    links: {
      'maven-jobs': { ...DEFAULT_LINKS },
      'profit-pathshala': { ...DEFAULT_LINKS },
      'mks': { ...DEFAULT_LINKS },
      'savvi': { ...DEFAULT_LINKS },
    },
    notes: '',
    checklist: { ...DEFAULT_CHECKLIST },
  };
}

const WorkflowContext = createContext<WorkflowContextType | null>(null);

export function WorkflowProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<WorkflowState>(loadState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    document.documentElement.setAttribute('data-company', state.activeCompany);
    document.documentElement.setAttribute('data-theme', state.themeMode);
  }, [state.activeCompany, state.themeMode]);

  const setActiveCompany = (id: CompanyId) =>
    setState(s => ({ ...s, activeCompany: id }));

  const toggleAdminMode = () =>
    setState(s => ({ ...s, adminMode: !s.adminMode }));

  const setThemeMode = (mode: ThemeMode) =>
    setState(s => ({ ...s, themeMode: mode }));

  const setAnalyticsPeriod = (period: AnalyticsPeriod) =>
    setState(s => ({ ...s, analyticsPeriod: s.analyticsPeriod === period ? null : period }));

  const updateLink = (company: CompanyId, key: keyof CompanyLinks, value: string) =>
    setState(s => ({
      ...s,
      links: { ...s.links, [company]: { ...s.links[company], [key]: value } },
    }));

  const setNotes = (notes: string) => setState(s => ({ ...s, notes }));

  const toggleChecklist = (key: keyof ChecklistState) =>
    setState(s => ({
      ...s,
      checklist: { ...s.checklist, [key]: !s.checklist[key] },
    }));

  const resetChecklist = () =>
    setState(s => ({ ...s, checklist: { ...DEFAULT_CHECKLIST } }));

  const activeCompanyData = COMPANIES.find(c => c.id === state.activeCompany)!;

  return (
    <WorkflowContext.Provider
      value={{
        ...state,
        setActiveCompany,
        toggleAdminMode,
        setThemeMode,
        setAnalyticsPeriod,
        updateLink,
        setNotes,
        toggleChecklist,
        resetChecklist,
        activeCompanyData,
      }}
    >
      {children}
    </WorkflowContext.Provider>
  );
}

export function useWorkflow() {
  const ctx = useContext(WorkflowContext);
  if (!ctx) throw new Error('useWorkflow must be used within WorkflowProvider');
  return ctx;
}
