import type { Project } from "@/lib/domain/types";
import type { DataSource } from "../source";

const PROJECTS: Project[] = [
  {
    id: "alpha-clinic",
    name: "Alpha Clinic",
    status: "active",
    goal: "300 лидов на консультацию",
    period: { start: "2026-10-01", end: "2026-10-31" },
    kpi: { metric: "leads", plan: 300, cpaPlan: 12 },
    metrics: { spend: 760, impressions: 118_000, clicks: 2_950, leads: 71, sales: 9, revenue: 5_400 },
  },
  {
    id: "nova-realty",
    name: "Nova Realty",
    status: "active",
    goal: "40 продаж квартир",
    period: { start: "2026-10-01", end: "2026-10-31" },
    kpi: { metric: "sales", plan: 40, cpaPlan: 450 },
    metrics: { spend: 2_900, impressions: 210_000, clicks: 4_100, leads: 230, sales: 5, revenue: 410_000 },
  },
  {
    id: "fitlab",
    name: "FitLab",
    status: "active",
    goal: "500 заявок на пробную тренировку",
    period: { start: "2026-10-01", end: "2026-10-31" },
    kpi: { metric: "leads", plan: 500, cpaPlan: 4 },
    metrics: { spend: 420, impressions: 96_000, clicks: 3_300, leads: 140, sales: 31, revenue: 3_100 },
  },
  {
    id: "edu-pro",
    name: "EduPro",
    status: "awaiting_feedback",
    goal: "1 000 регистраций на вебинар",
    period: { start: "2026-10-01", end: "2026-10-31" },
    kpi: { metric: "leads", plan: 1_000, cpaPlan: 2 },
    metrics: { spend: 310, impressions: 140_000, clicks: 5_200, leads: 260 },
  },
  {
    id: "green-food",
    name: "Green Food",
    status: "awaiting_offer",
    goal: "Запуск после согласования оффера",
    period: { start: "2026-10-10", end: "2026-11-10" },
    kpi: { metric: "sales", plan: 200, cpaPlan: 15 },
    metrics: {},
  },
  {
    id: "autoparts",
    name: "AutoParts",
    status: "need_contact",
    goal: "150 продаж",
    period: { start: "2026-09-01", end: "2026-09-30" },
    kpi: { metric: "sales", plan: 150, cpaPlan: 20 },
    metrics: { spend: 2_700, impressions: 310_000, clicks: 6_800, leads: 410, sales: 118, revenue: 21_000 },
  },
];

export const mockSource: DataSource = {
  async listProjects() {
    return PROJECTS;
  },
  async getProject(id) {
    return PROJECTS.find((p) => p.id === id) ?? null;
  },
};
