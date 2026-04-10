"use client";

import { useMemo, useState } from "react";
import { Bell, Clock3, PhoneCall, Play, RefreshCcw, ShieldAlert, Siren, Smartphone, UserRound } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

type Channel = "sms" | "voice";
type ScenarioKey = "daily" | "late" | "none" | "critical";
type EventStatus = "sent" | "retry" | "escalated" | "incident" | "resolved";

type TimelineEvent = {
  id: string;
  time: string;
  title: string;
  detail: string;
  status: EventStatus;
};

type EscalationTier = {
  id: string;
  label: string;
  delayMinutes: number;
  channels: Channel[];
  action: string;
};

type WorkflowState = {
  monitoredPersonName: string;
  timezone: string;
  scheduleTime: string;
  responseWindowMinutes: number;
  quietHoursStart: string;
  quietHoursEnd: string;
  primaryChannel: Channel;
  fallbackChannel: Channel;
  retriesEnabled: boolean;
  autoOpenIncident: boolean;
  escalationMessage: string;
};

type ApiResult = {
  ok: boolean;
  message?: string;
  error?: string;
  data?: unknown;
};

const defaultWorkflow: WorkflowState = {
  monitoredPersonName: "Margaret Ellis",
  timezone: "America/New_York",
  scheduleTime: "09:00",
  responseWindowMinutes: 15,
  quietHoursStart: "21:00",
  quietHoursEnd: "07:00",
  primaryChannel: "sms",
  fallbackChannel: "voice",
  retriesEnabled: true,
  autoOpenIncident: true,
  escalationMessage:
    "We did not receive a safety response. Please acknowledge this alert and provide a status update.",
};

const escalationTiers: EscalationTier[] = [
  {
    id: "tier-1",
    label: "Primary Guardian",
    delayMinutes: 10,
    channels: ["sms", "voice"],
    action: "Ask for acknowledgment and status update.",
  },
  {
    id: "tier-2",
    label: "Backup Guardian",
    delayMinutes: 20,
    channels: ["sms", "voice"],
    action: "Escalate because primary did not acknowledge.",
  },
  {
    id: "tier-3",
    label: "Neighbor / Volunteer",
    delayMinutes: 15,
    channels: ["sms"],
    action: "Request local wellness check.",
  },
  {
    id: "tier-4",
    label: "Emergency Services",
    delayMinutes: 0,
    channels: ["voice"],
    action: "Escalate critical incident with full dispatch context.",
  },
];

const scenarioTimelineMap: Record<ScenarioKey, TimelineEvent[]> = {
  daily: [
    { id: "1", time: "9:00 AM", title: "Check-in sent", detail: "SMS check-in sent successfully.", status: "sent" },
    { id: "2", time: "9:03 AM", title: "Response received", detail: "User replied YES. Routine closed as safe.", status: "resolved" },
  ],
  late: [
    { id: "1", time: "9:00 AM", title: "Check-in sent", detail: "Primary SMS sent to monitored person.", status: "sent" },
    { id: "2", time: "9:08 AM", title: "Voice retry started", detail: "Fallback voice call triggered after no reply.", status: "retry" },
    { id: "3", time: "9:11 AM", title: "Late response received", detail: "User confirmed safe after fallback call.", status: "resolved" },
  ],
  none: [
    { id: "1", time: "9:00 AM", title: "Check-in sent", detail: "Primary SMS sent to monitored person.", status: "sent" },
    { id: "2", time: "9:08 AM", title: "Retry #1", detail: "Voice fallback triggered because no response was detected.", status: "retry" },
    { id: "3", time: "9:20 AM", title: "Tier 1 escalation", detail: "Primary guardian notified and asked to acknowledge.", status: "escalated" },
    { id: "4", time: "9:42 AM", title: "Tier 2 escalation", detail: "Backup guardian notified because acknowledgment was not received.", status: "escalated" },
    { id: "5", time: "10:01 AM", title: "Incident opened", detail: "Case converted into active incident with audit trail.", status: "incident" },
  ],
  critical: [
    { id: "1", time: "9:00 AM", title: "Check-in sent", detail: "Primary SMS sent to monitored person.", status: "sent" },
    { id: "2", time: "9:02 AM", title: "Critical response detected", detail: "Inbound reply included HELP keyword and triggered critical path.", status: "incident" },
    { id: "3", time: "9:03 AM", title: "Guardian blast", detail: "Primary and backup guardians notified immediately.", status: "escalated" },
    { id: "4", time: "9:04 AM", title: "Emergency escalation", detail: "Dispatch-ready incident opened with location and response history.", status: "incident" },
  ],
};

const statusBadgeClasses: Record<EventStatus, string> = {
  sent: "bg-sky-50 text-sky-700 border-sky-200",
  retry: "bg-amber-50 text-amber-700 border-amber-200",
  escalated: "bg-rose-50 text-rose-700 border-rose-200",
  incident: "bg-violet-50 text-violet-700 border-violet-200",
  resolved: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

function formatChannel(channel: Channel) {
  return channel === "sms" ? "SMS" : "Voice";
}

async function postJson<T>(url: string, body: Record<string, unknown>) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const text = await response.text();
  let payload: T | null = null;

  try {
    payload = text ? (JSON.parse(text) as T) : null;
  } catch {
    payload = null;
  }

  if (!response.ok) {
    const fallbackMessage =
      payload && typeof payload === "object" && payload !== null && "error" in payload
        ? String((payload as Record<string, unknown>).error)
        : `Request failed with status ${response.status}`;
    throw new Error(fallbackMessage);
  }

  return payload;
}

function ScenarioButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-2xl px-4 py-2 text-sm font-medium transition",
        active ? "bg-rose-500 text-white shadow-lg shadow-rose-500/25" : "bg-white/10 text-slate-200 hover:bg-white/15",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function MetricCard({ label, value, icon: Icon }: { label: string; value: string; icon: typeof Clock3 }) {
  return (
    <Card className="rounded-3xl border-white/10 bg-gradient-to-br from-white/10 to-white/5 text-white shadow-none backdrop-blur">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-slate-400">{label}</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight">{value}</p>
          </div>
          <div className="rounded-2xl bg-white/10 p-3">
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function TimelineCard({ events }: { events: TimelineEvent[] }) {
  return (
    <Card className="rounded-3xl border-slate-200 shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <div>
            <CardTitle>Event Timeline</CardTitle>
            <CardDescription>Full audit trail for attempts, retries, responses, and escalations.</CardDescription>
          </div>
          <Badge variant="secondary" className="rounded-full border-rose-200 bg-rose-50 text-rose-700">
            Live Audit Feed
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="flex gap-4 rounded-2xl border border-slate-200 p-4">
            <div className="w-20 shrink-0 pt-0.5 text-sm font-medium text-slate-500">{event.time}</div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <div className="font-medium text-slate-900">{event.title}</div>
                <span className={["rounded-full border px-2.5 py-1 text-xs font-medium capitalize", statusBadgeClasses[event.status]].join(" ")}>
                  {event.status}
                </span>
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">{event.detail}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default function LifeSignalTwilioCheckinEscalationUI() {
  const [scenario, setScenario] = useState<ScenarioKey>("none");
  const [workflow, setWorkflow] = useState<WorkflowState>(defaultWorkflow);
  const [selectedRisk, setSelectedRisk] = useState("elevated");
  const [isRunningScenario, setIsRunningScenario] = useState(false);
  const [isSavingWorkflow, setIsSavingWorkflow] = useState(false);
  const [isPreviewingPayload, setIsPreviewingPayload] = useState(false);
  const [activeDispatchAction, setActiveDispatchAction] = useState<string | null>(null);
  const [lastAction, setLastAction] = useState("No dispatch action triggered yet.");
  const [payloadPreview, setPayloadPreview] = useState("");

  const timeline = useMemo(() => scenarioTimelineMap[scenario], [scenario]);
  const openIncident = timeline.some((event) => event.status === "incident");
  const responseRate = scenario === "daily" ? "96.8%" : scenario === "late" ? "92.1%" : scenario === "none" ? "91.3%" : "88.4%";

  const updateWorkflow = <K extends keyof WorkflowState>(key: K, value: WorkflowState[K]) => {
    setWorkflow((current) => ({ ...current, [key]: value }));
  };

  const buildWorkflowPayload = () => ({
    monitoredPersonName: workflow.monitoredPersonName,
    timezone: workflow.timezone,
    scheduleTime: workflow.scheduleTime,
    responseWindowMinutes: workflow.responseWindowMinutes,
    quietHoursStart: workflow.quietHoursStart,
    quietHoursEnd: workflow.quietHoursEnd,
    primaryChannel: workflow.primaryChannel,
    fallbackChannel: workflow.fallbackChannel,
    retriesEnabled: workflow.retriesEnabled,
    autoOpenIncident: workflow.autoOpenIncident,
    escalationMessage: workflow.escalationMessage,
    escalationTiers,
  });

  const handleSaveWorkflow = async () => {
    setIsSavingWorkflow(true);
    setLastAction("Saving workflow to /api/check-in-workflows/save...");

    try {
      const result = await postJson<ApiResult>("/api/check-in-workflows/save", {
        workflow: buildWorkflowPayload(),
      });
      setLastAction(result?.message ?? "Workflow saved successfully.");
    } catch (error) {
      setLastAction(error instanceof Error ? error.message : "Failed to save workflow.");
    } finally {
      setIsSavingWorkflow(false);
    }
  };

  const handlePreviewPayload = async () => {
    setIsPreviewingPayload(true);
    setLastAction("Generating Twilio payload preview...");

    try {
      const result = await postJson<ApiResult>("/api/twilio/preview-payload", {
        workflow: buildWorkflowPayload(),
        scenario,
        selectedRisk,
      });
      const preview = result?.data ? JSON.stringify(result.data, null, 2) : JSON.stringify(buildWorkflowPayload(), null, 2);
      setPayloadPreview(preview);
      setLastAction(result?.message ?? "Twilio payload preview ready.");
    } catch (error) {
      setPayloadPreview(JSON.stringify(buildWorkflowPayload(), null, 2));
      setLastAction(error instanceof Error ? error.message : "Failed to preview payload.");
    } finally {
      setIsPreviewingPayload(false);
    }
  };

  const handleRunScenario = async () => {
    setIsRunningScenario(true);
    setLastAction(`Running ${scenario} scenario via /api/twilio/test-run...`);

    try {
      const result = await postJson<ApiResult>("/api/twilio/test-run", {
        scenario,
        selectedRisk,
        workflow: buildWorkflowPayload(),
      });
      setLastAction(result?.message ?? `Scenario executed: ${scenario}.`);
    } catch (error) {
      setLastAction(error instanceof Error ? error.message : "Failed to run scenario.");
    } finally {
      setIsRunningScenario(false);
    }
  };

  const dispatchActions = [
    {
      label: "Send test SMS",
      helper: "/api/twilio/test/sms",
      icon: Smartphone,
      buildBody: () => ({
        to: workflow.monitoredPersonName,
        channel: workflow.primaryChannel,
        scenario,
        workflow: buildWorkflowPayload(),
      }),
    },
    {
      label: "Trigger voice fallback",
      helper: "/api/twilio/test/voice",
      icon: PhoneCall,
      buildBody: () => ({
        to: workflow.monitoredPersonName,
        channel: workflow.fallbackChannel,
        scenario,
        workflow: buildWorkflowPayload(),
      }),
    },
    {
      label: "Simulate guardian acknowledgment",
      helper: "/api/incidents/acknowledge",
      icon: Bell,
      buildBody: () => ({
        scenario,
        actor: "guardian",
        monitoredPersonName: workflow.monitoredPersonName,
      }),
    },
    {
      label: "Open incident manually",
      helper: "/api/incidents/open",
      icon: Siren,
      buildBody: () => ({
        scenario,
        riskLevel: selectedRisk,
        monitoredPersonName: workflow.monitoredPersonName,
        workflow: buildWorkflowPayload(),
      }),
    },
  ] as const;

  const handleDispatchAction = async (action: (typeof dispatchActions)[number]) => {
    setActiveDispatchAction(action.label);
    setLastAction(`${action.label} in progress...`);

    try {
      const result = await postJson<ApiResult>(action.helper, action.buildBody());
      setLastAction(result?.message ?? `${action.label} completed successfully.`);
    } catch (error) {
      setLastAction(error instanceof Error ? error.message : `${action.label} failed.`);
    } finally {
      setActiveDispatchAction(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="mb-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Card className="rounded-[2rem] border-white/10 bg-white/5 text-white shadow-2xl shadow-black/20 backdrop-blur">
            <CardContent className="p-8">
              <div className="mb-4 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-200">
                LifeSignal • Twilio Check-In + Escalation Console
              </div>
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl">
                Wire your safety workflows into the app with real operational controls.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
                This page is designed as the in-app operations surface for scheduling check-ins, testing
                Twilio channels, managing escalation logic, and visualizing live incident state.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ScenarioButton active={scenario === "daily"} onClick={() => setScenario("daily")}>Daily Check-in</ScenarioButton>
                <ScenarioButton active={scenario === "late"} onClick={() => setScenario("late")}>Late Response</ScenarioButton>
                <ScenarioButton active={scenario === "none"} onClick={() => setScenario("none")}>No Response</ScenarioButton>
                <ScenarioButton active={scenario === "critical"} onClick={() => setScenario("critical")}>Critical Alert</ScenarioButton>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <MetricCard label="Today’s Check-ins" value="184" icon={Clock3} />
            <MetricCard label="Response Rate" value={responseRate} icon={RefreshCcw} />
            <MetricCard label="Open Incidents" value={openIncident ? "3" : "0"} icon={ShieldAlert} />
            <MetricCard label="Avg Escalation Time" value={scenario === "critical" ? "4 min" : "22 min"} icon={Siren} />
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-6">
            <Card className="rounded-3xl border-slate-200 shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <CardTitle>Check-in Configuration</CardTitle>
                    <CardDescription>Editable settings to back the real workflow record in Supabase.</CardDescription>
                  </div>
                  <Badge className="rounded-full bg-emerald-100 text-emerald-700 hover:bg-emerald-100">Active Workflow</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="monitoredPersonName">Monitored person</Label>
                    <Input id="monitoredPersonName" value={workflow.monitoredPersonName} onChange={(event) => updateWorkflow("monitoredPersonName", event.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Input id="timezone" value={workflow.timezone} onChange={(event) => updateWorkflow("timezone", event.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="scheduleTime">Check-in time</Label>
                    <Input id="scheduleTime" type="time" value={workflow.scheduleTime} onChange={(event) => updateWorkflow("scheduleTime", event.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="responseWindowMinutes">Response window (minutes)</Label>
                    <Input id="responseWindowMinutes" type="number" min={1} value={workflow.responseWindowMinutes} onChange={(event) => updateWorkflow("responseWindowMinutes", Number(event.target.value) || 1)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quietHoursStart">Quiet hours start</Label>
                    <Input id="quietHoursStart" type="time" value={workflow.quietHoursStart} onChange={(event) => updateWorkflow("quietHoursStart", event.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quietHoursEnd">Quiet hours end</Label>
                    <Input id="quietHoursEnd" type="time" value={workflow.quietHoursEnd} onChange={(event) => updateWorkflow("quietHoursEnd", event.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Primary channel</Label>
                    <Select value={workflow.primaryChannel} onValueChange={(value) => value && updateWorkflow("primaryChannel", value as Channel)}>
                      <SelectTrigger><SelectValue placeholder="Choose channel" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sms">SMS</SelectItem>
                        <SelectItem value="voice">Voice</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Fallback channel</Label>
                    <Select value={workflow.fallbackChannel} onValueChange={(value) => value && updateWorkflow("fallbackChannel", value as Channel)}>
                      <SelectTrigger><SelectValue placeholder="Choose fallback" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sms">SMS</SelectItem>
                        <SelectItem value="voice">Voice</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3">
                    <div>
                      <p className="font-medium text-slate-900">Enable retries</p>
                      <p className="text-sm text-slate-500">Fallback attempts before escalation.</p>
                    </div>
                    <Switch checked={workflow.retriesEnabled} onCheckedChange={(checked) => updateWorkflow("retriesEnabled", checked)} />
                  </div>
                  <div className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3">
                    <div>
                      <p className="font-medium text-slate-900">Auto-open incident</p>
                      <p className="text-sm text-slate-500">Create case when escalation thresholds are met.</p>
                    </div>
                    <Switch checked={workflow.autoOpenIncident} onCheckedChange={(checked) => updateWorkflow("autoOpenIncident", checked)} />
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <Label htmlFor="escalationMessage">Escalation message template</Label>
                  <Textarea id="escalationMessage" value={workflow.escalationMessage} onChange={(event) => updateWorkflow("escalationMessage", event.target.value)} className="min-h-[100px]" />
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Button className="rounded-2xl" onClick={handleSaveWorkflow} disabled={isSavingWorkflow}>
                    {isSavingWorkflow ? "Saving..." : "Save Workflow"}
                  </Button>
                  <Button variant="secondary" className="rounded-2xl" onClick={handlePreviewPayload} disabled={isPreviewingPayload}>
                    {isPreviewingPayload ? "Building Preview..." : "Preview Twilio Payload"}
                  </Button>
                </div>

                {payloadPreview ? (
                  <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-950 p-4">
                    <div className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">Twilio Payload Preview</div>
                    <pre className="overflow-x-auto text-xs leading-6 text-slate-200">{payloadPreview}</pre>
                  </div>
                ) : null}
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle>Retry + Escalation Logic</CardTitle>
                <CardDescription>These cards map directly to retry rules and escalation-step records.</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="retries" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 rounded-2xl">
                    <TabsTrigger value="retries">Retries</TabsTrigger>
                    <TabsTrigger value="tiers">Escalation Tiers</TabsTrigger>
                  </TabsList>
                  <TabsContent value="retries" className="mt-4 space-y-4">
                    {[
                      { title: "Attempt 1", channel: workflow.primaryChannel, offset: "0 min", description: "Initial outbound check-in." },
                      { title: "Attempt 2", channel: workflow.fallbackChannel, offset: "+8 min", description: "Fallback channel if no response." },
                      { title: "Attempt 3", channel: workflow.primaryChannel, offset: "+5 min", description: "Urgent reminder before escalation." },
                    ].map((attempt) => (
                      <div key={attempt.title} className="flex items-center justify-between rounded-2xl border border-slate-200 p-4">
                        <div>
                          <p className="font-medium text-slate-900">{attempt.title}</p>
                          <p className="text-sm text-slate-500">{formatChannel(attempt.channel)} • {attempt.description}</p>
                        </div>
                        <Badge variant="secondary" className="rounded-full">{attempt.offset}</Badge>
                      </div>
                    ))}
                  </TabsContent>
                  <TabsContent value="tiers" className="mt-4 space-y-4">
                    {escalationTiers.map((tier, index) => (
                      <div key={tier.id} className="rounded-2xl border border-slate-200 p-4">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div>
                            <p className="font-medium text-slate-900">Tier {index + 1} • {tier.label}</p>
                            <p className="text-sm text-slate-500">Delay: {tier.delayMinutes === 0 ? "Immediate" : `${tier.delayMinutes} min`}</p>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {tier.channels.map((channel) => (
                              <Badge key={channel} variant="secondary" className="rounded-full">{formatChannel(channel)}</Badge>
                            ))}
                          </div>
                        </div>
                        <p className="mt-3 text-sm text-slate-600">{tier.action}</p>
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="rounded-3xl border-white/10 bg-white/5 text-white shadow-2xl shadow-black/20 backdrop-blur">
              <CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <CardTitle className="text-white">Live Incident Simulator</CardTitle>
                    <CardDescription className="text-slate-300">
                      Run sample scenarios before wiring actions to real route handlers and Twilio webhooks.
                    </CardDescription>
                  </div>
                  <Button onClick={handleRunScenario} className="rounded-2xl bg-cyan-400 text-slate-950 hover:bg-cyan-300" disabled={isRunningScenario}>
                    <Play className="mr-2 h-4 w-4" />
                    {isRunningScenario ? "Running..." : "Run Scenario"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="rounded-2xl bg-white/10 p-3">
                        <UserRound className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wide text-slate-400">Monitored Person</p>
                        <p className="text-lg font-semibold">{workflow.monitoredPersonName}</p>
                      </div>
                    </div>
                    <div className="grid gap-3">
                      {[
                        ["Schedule", workflow.scheduleTime],
                        ["Primary", formatChannel(workflow.primaryChannel)],
                        ["Fallback", formatChannel(workflow.fallbackChannel)],
                        ["Risk Level", selectedRisk],
                      ].map(([label, value]) => (
                        <div key={label} className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2">
                          <span className="text-sm text-slate-400">{label}</span>
                          <span className="text-sm font-medium text-white capitalize">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <p className="text-xs uppercase tracking-wide text-slate-400">Dispatch Controls</p>
                      <Select value={selectedRisk} onValueChange={(value) => value && setSelectedRisk(value)}>
                        <SelectTrigger className="h-8 w-[140px] border-white/10 bg-white/5 text-white">
                          <SelectValue placeholder="Risk level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="stable">Stable</SelectItem>
                          <SelectItem value="caution">Caution</SelectItem>
                          <SelectItem value="elevated">Elevated</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-3">
                      {dispatchActions.map((action) => {
                        const Icon = action.icon;
                        return (
                          <button
                            key={action.label}
                            type="button"
                            onClick={() => handleDispatchAction(action)}
                            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left transition hover:bg-white/10"
                          >
                            <div className="flex items-center gap-3">
                              <div className="rounded-xl bg-white/10 p-2">
                                <Icon className="h-4 w-4" />
                              </div>
                              <div>
                                <div className="text-sm font-medium text-white">{action.label}</div>
                                <div className="text-xs text-slate-400">POST {action.helper}</div>
                                {activeDispatchAction === action.label ? (
                                  <div className="mt-1 text-[11px] text-cyan-300">Sending request...</div>
                                ) : null}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-100">
                  {lastAction}
                </div>
              </CardContent>
            </Card>

            <TimelineCard events={timeline} />

            <Card className="rounded-3xl border-0 bg-gradient-to-br from-rose-500 to-orange-400 text-white shadow-2xl shadow-rose-500/20">
              <CardContent className="p-6">
                <div className="max-w-2xl">
                  <p className="text-sm font-medium text-white/80">Critical escalation rule</p>
                  <h3 className="mt-2 text-2xl font-semibold">Bypass delays when the response indicates danger.</h3>
                  <p className="mt-3 text-sm leading-6 text-white/90">
                    HELP, FALL, PAIN, or emergency DTMF selections should open an incident immediately,
                    notify guardians in parallel, and prepare a dispatch-ready context payload.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge className="rounded-full bg-white/15 text-white hover:bg-white/15">Keyword trigger parsing</Badge>
                    <Badge className="rounded-full bg-white/15 text-white hover:bg-white/15">Immediate incident creation</Badge>
                    <Badge className="rounded-full bg-white/15 text-white hover:bg-white/15">Parallel guardian outreach</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}






