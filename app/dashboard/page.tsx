"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Users,
  Globe,
  DollarSign,
  ArrowUpRight,
  Radar,
  ChevronRight,
} from "lucide-react";

interface DashboardStats {
  leadsThisWeek: number;
  sitesInProgress: number;
  mrr: number;
  leadsDelta: number;
  sitesDelta: number;
  mrrDelta: number;
}

interface ActivityItem {
  id: string;
  description: string;
  timestamp: string;
}

function StatTileSkeleton() {
  return (
    <div className="rounded-2xl border border-[#ECE6DE] bg-white p-6 animate-pulse">
      <div className="h-4 w-24 bg-[#ECE6DE] rounded mb-3" />
      <div className="h-8 w-16 bg-[#ECE6DE] rounded mb-2" />
      <div className="h-3 w-20 bg-[#ECE6DE] rounded" />
    </div>
  );
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const [statsRes, activityRes] = await Promise.all([
          fetch("/api/dashboard/stats"),
          fetch("/api/dashboard/activity"),
        ]);
        if (statsRes.ok) {
          const data = await statsRes.json();
          setStats(data);
        }
        if (activityRes.ok) {
          const data = await activityRes.json();
          setActivities(data);
        }
      } catch {
        // Stats will remain null, showing skeletons then empty state
      } finally {
        setLoading(false);
      }
    }
    fetchDashboardData();
  }, []);

  async function handleScan() {
    setScanning(true);
    try {
      const res = await fetch("/api/leads/scan", { method: "POST" });
      if (res.ok) {
        router.push("/dashboard/leads");
      }
    } catch {
      setScanning(false);
    }
  }

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#1B1530]">
          Good {getGreeting()}, {session?.user?.name?.split(" ")[0] || "there"}
        </h1>
        <p className="text-[#6B6480] mt-1">Here is what is happening today.</p>
      </div>

      {/* Stat Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {loading ? (
          <>
            <StatTileSkeleton />
            <StatTileSkeleton />
            <StatTileSkeleton />
          </>
        ) : (
          <>
            <StatTile
              icon={<Users className="w-5 h-5 text-[#6B4FE0]" />}
              label="Leads this week"
              value={stats?.leadsThisWeek?.toString() ?? "0"}
              delta={stats?.leadsDelta ?? 0}
            />
            <StatTile
              icon={<Globe className="w-5 h-5 text-[#6B4FE0]" />}
              label="Sites in progress"
              value={stats?.sitesInProgress?.toString() ?? "0"}
              delta={stats?.sitesDelta ?? 0}
            />
            <StatTile
              icon={<DollarSign className="w-5 h-5 text-[#6B4FE0]" />}
              label="MRR"
              value={`$${(stats?.mrr ?? 0).toLocaleString()}`}
              delta={stats?.mrrDelta ?? 0}
            />
          </>
        )}
      </div>

      {/* Primary CTA */}
      <div className="rounded-2xl border border-[#ECE6DE] bg-white p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-[#1B1530]">
            Scan for new leads in your area
          </h2>
          <p className="text-sm text-[#6B6480] mt-1">
            Discover local businesses without a website and turn them into
            clients.
          </p>
        </div>
        <button
          onClick={handleScan}
          disabled={scanning}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-[#6B4FE0] to-[#FF6B5B] hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {scanning ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Scanning...
            </span>
          ) : (
            <>
              <Radar className="w-4 h-4" />
              Scan now
            </>
          )}
        </button>
      </div>

      {/* Recent Activity */}
      <div className="rounded-2xl border border-[#ECE6DE] bg-white p-6">
        <h2 className="text-lg font-semibold text-[#1B1530] mb-4">
          Recent activity
        </h2>
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3 animate-pulse">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ECE6DE]" />
                <div className="h-4 w-64 bg-[#ECE6DE] rounded" />
              </div>
            ))}
          </div>
        ) : activities.length > 0 ? (
          <ul className="space-y-3">
            {activities.map((item) => (
              <li key={item.id} className="flex items-start gap-3">
                <span className="mt-1.5 w-2.5 h-2.5 rounded-full bg-[#F5B544] shrink-0" />
                <div>
                  <p className="text-sm text-[#1B1530]">{item.description}</p>
                  <p className="text-xs text-[#6B6480]">
                    {new Date(item.timestamp).toLocaleString()}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-[#6B6480]">
            No activity yet. Scan for leads to get started.
          </p>
        )}
      </div>

      {/* Next Step Prompt */}
      <div className="rounded-2xl border border-[#6B4FE0]/20 bg-[#6B4FE0]/5 p-6">
        <h2 className="text-lg font-semibold text-[#1B1530] mb-2">
          Next step
        </h2>
        <p className="text-sm text-[#6B6480] mb-4">
          {stats && stats.leadsThisWeek > 0
            ? "You have new leads waiting. Review them and generate sites to win clients."
            : "Start by scanning for local businesses that need a website. It only takes a minute."}
        </p>
        <button
          onClick={() => {
            if (stats && stats.leadsThisWeek > 0) {
              router.push("/dashboard/leads");
            } else {
              handleScan();
            }
          }}
          className="inline-flex items-center gap-1 text-sm font-semibold text-[#6B4FE0] hover:text-[#5a3fcf] transition-colors"
        >
          {stats && stats.leadsThisWeek > 0 ? "Review leads" : "Learn more"}{" "}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function StatTile({
  icon,
  label,
  value,
  delta,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  delta: number;
}) {
  return (
    <div className="rounded-2xl border border-[#ECE6DE] bg-white p-6">
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <span className="text-sm text-[#6B6480]">{label}</span>
      </div>
      <div className="flex items-end gap-2">
        <span className="text-3xl font-bold text-[#1B1530]">{value}</span>
        {delta !== 0 && (
          <span className="flex items-center gap-0.5 text-sm font-medium text-[#F5B544] mb-0.5">
            <ArrowUpRight className="w-3.5 h-3.5" />
            {delta > 0 ? `+${delta}` : delta}
          </span>
        )}
      </div>
    </div>
  );
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "morning";
  if (hour < 17) return "afternoon";
  return "evening";
}
