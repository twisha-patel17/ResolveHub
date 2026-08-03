import {
  FilePlus2,
  ClipboardCheck,
  CheckCircle2,
} from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: FilePlus2,
      number: "01",
      title: "Submit Your Complaint",
      description:
        "Describe the issue, upload images, and provide the location in just a few clicks.",
    },
    {
      icon: ClipboardCheck,
      number: "02",
      title: "Admin Reviews",
      description:
        "Administrators review the complaint, assign priority, and keep you updated in real time.",
    },
    {
      icon: CheckCircle2,
      number: "03",
      title: "Issue Resolved",
      description:
        "Track every update until the complaint is marked as resolved and receive instant notifications.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="bg-white py-24"
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600">
            How It Works
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900">
            Report a problem in three simple steps
          </h2>

          <p className="mt-5 text-lg text-slate-600">
            From reporting an issue to receiving updates, ResolveHub
            makes the complaint process transparent and effortless.
          </p>
        </div>


        <div className="relative mt-20 grid gap-10 lg:grid-cols-3">

          <div className="absolute left-1/2 top-16 hidden h-1 w-2/3 -translate-x-1/2 rounded-full bg-orange-100 lg:block"></div>

          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="relative rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-orange-300 hover:shadow-xl"
              >

                <div className="absolute -top-5 left-8 flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white shadow-lg">
                  {step.number}
                </div>

                <div className="mt-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-orange-500">
                  <Icon size={30} />
                </div>

                <h3 className="mt-6 text-2xl font-bold text-slate-900">
                  {step.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;