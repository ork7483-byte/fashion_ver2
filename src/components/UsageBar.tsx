interface UsageBarProps {
  used: number;
  total: number;
  label: string;
}

export default function UsageBar({ used, total, label }: UsageBarProps) {
  const pct = Math.min((used / total) * 100, 100);

  return (
    <div className="text-xs">
      <div className="flex justify-between mb-1">
        <span className="text-[#8C857B]">{label}</span>
        <span className="font-medium text-[#2C2825]">{used}/{total}</span>
      </div>
      <div className="h-1.5 rounded-full bg-[#EAE6DE] overflow-hidden">
        <div
          className="h-full rounded-full bg-[#D4572A] transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
