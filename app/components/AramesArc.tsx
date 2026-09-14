import {
  BadgeDollarSign,
  Clock3,
  CloudSun,
  Fence,
  ShieldCheck,
} from "lucide-react";

const items = [
  {
    icon: Clock3,
    position: "left-[15.36%] top-[58%] rotate-[30deg]",
    color: "text-[#ff8500]",
  },
  {
    icon: ShieldCheck,
    position: "left-[30%] top-[25.79%] rotate-[-30deg]",
    color: "text-[#1668ff]",
  },
  { icon: CloudSun, position: "left-1/2 top-[14%]", color: "text-[#0085ff]" },
  {
    icon: BadgeDollarSign,
    position: "left-[70%] top-[25.79%] rotate-[30deg]",
    color: "text-[#ff5500]",
  },
  {
    icon: Fence,
    position: "left-[84.64%] top-[58%] rotate-[-30deg]",
    color: "text-[#199ad6]",
  },
];

export default function AramesArc() {
  return (
    <section
      aria-labelledby="arames-arc-title"
      className="relative isolate mx-auto mt-28 w-full max-w-[960px] sm:mt-40"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 left-1/2 -z-10 aspect-square w-full -translate-x-1/2 rounded-full bg-[radial-gradient(circle_closest-side_at_center,#f7b99540_0%,#f7b9951a_45%,transparent_100%)] dark:bg-[radial-gradient(circle_closest-side_at_center,#ffb38055_0%,#ffb38026_45%,transparent_100%)]"
      />
      <div className="relative z-10 mx-auto max-w-[580px] px-4 text-center">
        <p className="text-sm font-medium text-[#536777] dark:text-white/65">
          Integrations
        </p>
        <h2
          id="arames-arc-title"
          className="mt-4 text-[clamp(30px,4vw,48px)] leading-[1.12] font-medium tracking-[-.04em] text-[#101010] dark:text-white"
        >
          Works with the tools you already use.
        </h2>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none relative mt-10 aspect-[2.2/1] overflow-hidden sm:mt-14"
      >
        <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black_12%,#000b_35%,transparent_72%)]">
          <div className="absolute top-[14%] left-1/2 aspect-square w-[80%] -translate-x-1/2 rounded-full bg-[#ffd6b8] dark:bg-[#713b20]" />
        </div>
        {items.map(({ icon: Icon, position, color }, index) => (
          <div
            key={index}
            className={`absolute flex aspect-square w-[10%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[18%] border border-black/[0.025] bg-linear-to-br from-white to-[#f3f3f3] shadow-[0_8px_20px_-8px_#002d4d25] dark:border-white/5 dark:from-[#20242a] dark:to-[#14171b] dark:shadow-black/25 ${position}`}
          >
            <Icon strokeWidth={2} className={`size-[45%] ${color}`} />
          </div>
        ))}
      </div>
    </section>
  );
}
