"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { TourForm } from "@/components/forms/TourForm";
import { LeasingForm } from "@/components/forms/LeasingForm";
import { GeneralForm } from "@/components/forms/GeneralForm";

const tabs = [
  { id: "tour", label: "Book a tour" },
  { id: "leasing", label: "Leasing enquiry" },
  { id: "general", label: "General / broker" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export function ContactTabs() {
  const searchParams = useSearchParams();
  const journeyParam = searchParams.get("journey");
  const spaceParam = searchParams.get("space") ?? undefined;
  const initial: TabId = journeyParam === "leasing" ? "leasing" : journeyParam === "general" ? "general" : "tour";
  const [active, setActive] = useState<TabId>(initial);

  return (
    <div>
      <div role="tablist" aria-label="Contact journey" className="flex flex-wrap gap-2 border-b border-ink-900/12">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={active === tab.id}
            aria-controls={`panel-${tab.id}`}
            onClick={() => setActive(tab.id)}
            className={`px-4 py-3 text-sm font-medium ${active === tab.id ? "border-b-2 border-brass-500 text-ink-900" : "text-ink-700 hover:text-ink-900"}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="pt-8">
        <div role="tabpanel" id="panel-tour" aria-labelledby="tab-tour" hidden={active !== "tour"}>
          {active === "tour" && <TourForm presetSpace={spaceParam} />}
        </div>
        <div role="tabpanel" id="panel-leasing" aria-labelledby="tab-leasing" hidden={active !== "leasing"}>
          {active === "leasing" && <LeasingForm presetSpace={spaceParam} />}
        </div>
        <div role="tabpanel" id="panel-general" aria-labelledby="tab-general" hidden={active !== "general"}>
          {active === "general" && <GeneralForm />}
        </div>
      </div>
    </div>
  );
}
