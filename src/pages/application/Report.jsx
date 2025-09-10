// src/pages/application/Report.jsx
import { useLoaderData, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import customFetch from "../../utils/customFetch";
import { useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const loaderUrl = "/lottie/loader.lottie";

// Loader stays exactly the same
export async function reportLoader() {
  const { data } = await customFetch.get("/plan", {
    params: { status: "completed", limit: 50 },
  }); 
  return Array.isArray(data?.plans) ? data.plans : [];
}

const weekLabel = (weekStart) => {
  const s = dayjs(weekStart);
  const e = s.add(6, "day");
  return `${s.format("DD MMM")} – ${e.format("DD MMM YYYY")}`;
};

export default function Report() {
  const plans = useLoaderData();
  const navigate = useNavigate();
  const [loading, setLoading] = useState();

  async function handleCreatePlan() {
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1000));
    navigate("/dashboard/allowance");
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/70 backdrop-blur-sm">
        <div className="flex flex-col items-center">
          <DotLottieReact
            src={loaderUrl}
            autoplay
            loop
            style={{ width: 160, height: 160 }}
          />
          <p className="mt-3 text-slate-100">Let's get Started...</p>
        </div>
      </div>
    );
  }

  if (!plans.length) {
    return (
      <div className="min-h-[calc(100vh-64px-64px)] flex items-center justify-center">
        <div className="text-center text-slate-300 flex flex-col items-center gap-4">
          <div>
            <p className="text-lg font-medium">No weekly data yet.</p>
            <p>Create your first plan to see reports.</p>
          </div>

          <button
            onClick={() => handleCreatePlan()}
            className="text-white px-8 py-4 rounded-full text-lg font-medium transition-colors"
            style={{
              backgroundColor: "var(--primary-color)",
              "--tw-bg-opacity": "1",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#007A5E";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "var(--primary-color)";
            }}
          >
            Create Your Plan
          </button>
        </div>
      </div>
    );
  }

  const [selectedId, setSelectedId] = useState(plans[0]._id);
  const selected = plans.find((p) => p._id === selectedId) || plans[0];

  const totalActs = selected.healthActs?.length ?? 0;
  const totalAllowances = selected.indulgences?.length ?? 0;
  const completedActs = (selected.healthActs || []).filter(
    (a) => a.isCompleted
  ).length;
  const totalCheckIns = (selected.healthActs || []).reduce(
    (sum, a) => sum + (a.checkIns?.length || 0),
    0
  );
  const totalTargets = (selected.healthActs || []).reduce(
    (sum, a) => sum + (a.targetFrequency || 0),
    0
  );

  const goPrev = () => {
    const idx = plans.findIndex((p) => p._id === selected._id);
    if (idx === -1) return;
    const nextIdx = Math.min(idx + 1, plans.length - 1);
    setSelectedId(plans[nextIdx]._id);
  };

  const share = async () => {
    const text = `My Balance Report (${weekLabel(
      selected.weekStartDate
    )}): ${completedActs}/${totalActs} acts completed, ${totalCheckIns}/${totalTargets} check-ins.`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "Weekly Balance Report", text });
      } catch {}
    } else {
      await navigator.clipboard.writeText(text);
      alert("Copied summary to clipboard!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Title + week picker */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6">
        <div className="flex-1">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
            Your Weekly Balance Report
          </h1>
          <div className="mt-4 inline-flex items-center rounded-full bg-[#584FFB] px-3 py-1 text-sm text-slate-100">
            {weekLabel(selected.weekStartDate)}
          </div>
        </div>

        <div className="shrink-0">
          <label className="block sm:inline mr-2 font-medium text-gray-500 mb-2 sm:mb-0">Select week:</label>
          <select
            className="select select-bordered bg-gray-100 text-slate-900 w-full sm:w-auto"
            value={selected._id}
            onChange={(e) => setSelectedId(e.target.value)}
          >
            {plans.map((p) => (
              <option key={p._id} value={p._id}>
                {dayjs(p.weekStartDate).format("DD MMM YYYY")}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Overview cards */}
      <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-6">
        <div className="rounded-2xl bg-white p-6 shadow">
          <div className="text-4xl font-bold text-slate-900">{totalActs}</div>
          <div className="mt-1 text-slate-600">Healthy acts</div>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow">
          <div className="text-4xl font-bold text-slate-900">
            {totalAllowances}
          </div>
          <div className="mt-1 text-slate-600">Weekly allowances</div>
        </div>
      </div>

      {/* Insight banner and Breakdown - 2 columns on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Insight banner */}
        <div className="rounded-2xl bg-emerald-50 p-5 shadow flex flex-col items-start gap-3">
          <div className="text-3xl">💡</div>
          <p className="text-emerald-900 text-md leading-relaxed">
            This week you completed <b>{completedActs}</b> of <b>{totalActs}</b>{" "}
            healthy acts and logged <b>{totalCheckIns}</b> check-ins out of{" "}
            <b>{totalTargets}</b> targets.
          </p>
        </div>

        {/* Breakdown */}
        <div className="rounded-2xl bg-white p-6 shadow">
          <h3 className="font-semibold text-slate-900 mb-4">
            Health acts breakdown
          </h3>

        <div className="space-y-5">
          {(selected.healthActs || []).map((act) => {
            const done = act.checkIns?.length || 0;
            const target = act.targetFrequency || 1;
            const pct = Math.min(100, Math.round((done / target) * 100));
            const name = act.name ?? act.healthActId?.name ?? "Health act";
            const emoji = act.emoji ?? act.healthActId?.emoji ?? "✨";

            return (
              <div key={act._id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{emoji}</span>
                    <span className="text-sm font-medium text-slate-900">
                      {name}
                    </span>
                  </div>
                  <span className="text-xs text-slate-600">
                    {done}/{target}
                  </span>
                </div>
                <div className="h-3 w-full rounded-full bg-slate-200 overflow-hidden">
                  <div
                    className="h-3 rounded-full transition-all duration-300"
                    style={{
                      width: `${pct}%`,
                      background:
                        pct === 100
                          ? "#10B981" // green when done
                          : "linear-gradient(90deg,var(--primary-color),#34d399)",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between mt-8">
        <button
          onClick={goPrev}
          className="btn bg-white rounded-full text-slate-900 border-slate-200 hover:bg-slate-100"
          disabled={
            plans.findIndex((p) => p._id === selected._id) === plans.length - 1
          }
        >
          Previous report
        </button>
        <button
          onClick={share}
          className="btn btn-soft btn-success rounded-full"
        >
          Share my progress
        </button>
      </div>
    </div>
  );
}
