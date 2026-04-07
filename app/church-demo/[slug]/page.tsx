import Link from "next/link";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type DemoModule = {
  key: string;
  title: string;
  description: string;
  price: number;
};

type DemoConfig = {
  headline: string;
  subheadline: string;
  audience: string;
  pains: string[];
  modules: DemoModule[];
  monthlyTotal: number;
};

const baseModules: DemoModule[] = [
  {
    key: "member_checkins",
    title: "Daily Member Check-Ins",
    description:
      "Automated daily text and voice check-ins for members who live alone, are homebound, or need ongoing follow-up.",
    price: 49,
  },
  {
    key: "care_rounds",
    title: "Pastoral Care Rounds",
    description:
      "Recurring touchpoints for vulnerable members with assignment tracking for staff and trained volunteers.",
    price: 59,
  },
  {
    key: "prayer_triage",
    title: "Prayer Request Triage",
    description:
      "Routes incoming prayer requests by urgency and assigns ownership so nothing gets lost.",
    price: 45,
  },
  {
    key: "absence_detection",
    title: "Absence Detection",
    description:
      "Flags missed check-ins and possible care gaps before they become emergencies.",
    price: 39,
  },
  {
    key: "volunteer_dispatch",
    title: "Volunteer Dispatch",
    description:
      "Organizes meal trains, rides, wellness visits, and simple response tasks in one place.",
    price: 55,
  },
  {
    key: "weekly_reports",
    title: "Weekly Care Reports",
    description:
      "Gives leadership a clear summary of member needs, open loops, and completed care activity.",
    price: 35,
  },
];

function titleCaseFromSlug(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function keywordIncludes(slug: string, words: string[]) {
  return words.some((word) => slug.includes(word));
}

function buildDemoConfig(churchName: string, slug: string): DemoConfig {
  const lowerSlug = slug.toLowerCase();

  const evangelical =
    keywordIncludes(lowerSlug, [
      "baptist",
      "assembly",
      "church-of-god",
      "pentecostal",
      "fellowship",
      "community",
    ]);

  const liturgical =
    keywordIncludes(lowerSlug, [
      "methodist",
      "presbyterian",
      "lutheran",
      "episcopal",
      "anglican",
      "catholic",
    ]);

  const villageOrSeniorFocused =
    keywordIncludes(lowerSlug, [
      "villages",
      "senior",
      "retirement",
      "community",
      "care",
      "grace",
      "hope",
    ]);

  const pains = [
    "Members living alone can go unseen between Sunday services and pastoral visits.",
    "Prayer requests, follow-ups, and care promises are often tracked manually across texts, calls, and notebooks.",
    "Staff and volunteers need a simple way to know who needs outreach right now.",
  ];

  if (villageOrSeniorFocused) {
    pains.unshift(
      "A larger senior and homebound population increases the need for reliable daily check-ins and quick escalation."
    );
  }

  const modules = [...baseModules];

  if (evangelical) {
    modules.push({
      key: "first_time_guest_followup",
      title: "First-Time Guest Follow-Up",
      description:
        "Helps your church quickly follow up with first-time guests and new families with personalized outreach.",
      price: 42,
    });
  }

  if (liturgical) {
    modules.push({
      key: "homebound_communion_tracking",
      title: "Homebound Communion Tracking",
      description:
        "Tracks homebound care visits, communion follow-up, and pastoral wellness touchpoints.",
      price: 44,
    });
  }

  const monthlyTotal = modules.reduce((sum, item) => sum + item.price, 0);

  return {
    headline: `${churchName}'s Care System`,
    subheadline:
      "A customized FaithSignal demonstration built to help your church check on vulnerable members, coordinate care, and make sure nobody falls through the cracks.",
    audience: evangelical
      ? "Built for outreach-driven congregations that need fast response and volunteer coordination."
      : liturgical
      ? "Built for pastoral care teams, homebound ministries, and structured member follow-up."
      : "Built for churches that want a practical, organized, compassionate care system.",
    pains,
    modules,
    monthlyTotal,
  };
}

export default async function ChurchDemoPage({ params }: PageProps) {
  const { slug } = await params;
  const churchName = titleCaseFromSlug(slug);
  const demo = buildDemoConfig(churchName, slug);

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="border-b bg-gradient-to-b from-sky-50 to-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex rounded-full border border-sky-200 bg-white px-4 py-1 text-sm font-medium text-sky-700">
              Personalized FaithSignal Demo
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {demo.headline}
            </h1>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              {demo.subheadline}
            </p>

            <p className="mt-4 text-base font-medium text-slate-700">
              {demo.audience}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href={{
                  pathname: "/faithsignal",
                  query: {
                    church: churchName,
                    demo: slug,
                    preselect: demo.modules.map((item) => item.key).join(","),
                  },
                }}
                className="rounded-2xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700"
              >
                Start This For {churchName}
              </Link>

              <Link
                href="/faithsignal"
                className="rounded-2xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
              >
                View FaithSignal
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-12 lg:grid-cols-[1.1fr_.9fr] lg:px-8">
        <div className="space-y-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold">What this solves for {churchName}</h2>
            <ul className="mt-6 space-y-4">
              {demo.pains.map((pain) => (
                <li key={pain} className="flex gap-3">
                  <span className="mt-1 text-sky-600">•</span>
                  <span className="text-slate-700">{pain}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold">Recommended modules</h2>
            <div className="mt-6 grid gap-4">
              {demo.modules.map((module) => (
                <div
                  key={module.key}
                  className="rounded-2xl border border-slate-200 p-5"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{module.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {module.description}
                      </p>
                    </div>
                    <div className="shrink-0 rounded-full bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-700">
                      ${module.price}/mo
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="lg:sticky lg:top-8 lg:self-start">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-wide text-sky-700">
              Demo Summary
            </div>

            <h2 className="mt-3 text-2xl font-bold">A care system for {churchName}</h2>

            <p className="mt-4 text-sm leading-6 text-slate-600">
              This demo bundles together the most relevant FaithSignal services
              for your church so you can launch with a practical, pastoral,
              easy-to-manage system.
            </p>

            <div className="mt-6 rounded-2xl bg-white p-5">
              <div className="flex items-center justify-between text-sm text-slate-500">
                <span>Recommended modules</span>
                <span>{demo.modules.length}</span>
              </div>

              <div className="mt-3 flex items-end justify-between">
                <span className="text-sm text-slate-500">Estimated monthly total</span>
                <span className="text-3xl font-bold text-slate-900">
                  ${demo.monthlyTotal}
                </span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <Link
                href={{
                  pathname: "/faithsignal",
                  query: {
                    church: churchName,
                    demo: slug,
                    preselect: demo.modules.map((item) => item.key).join(","),
                  },
                }}
                className="block rounded-2xl bg-sky-600 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-sky-700"
              >
                Launch This Setup
              </Link>

              <Link
                href="/church-demo-builder"
                className="block rounded-2xl border border-slate-300 px-5 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-white"
              >
                Build a Different Demo
              </Link>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}


