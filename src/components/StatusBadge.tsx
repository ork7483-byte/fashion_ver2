interface StatusBadgeProps {
  status: string;
  color: string;
}

const colorMap: Record<string, string> = {
  green: 'bg-[#F0F7F4] text-[#2E6B4F] border-[#2E6B4F]/20',
  yellow: 'bg-[#FFFBF0] text-[#C4940A] border-[#C4940A]/20',
  gray: 'bg-[#EAE6DE] text-[#B5AFA6] border-[#B5AFA6]/20',
  red: 'bg-[#FDF2F2] text-[#B33D3D] border-[#B33D3D]/20',
};

export default function StatusBadge({ status, color }: StatusBadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-xs font-medium border ${colorMap[color] || colorMap.gray}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${
        color === 'green' ? 'bg-[#2E6B4F]' :
        color === 'yellow' ? 'bg-[#C4940A]' :
        color === 'red' ? 'bg-[#B33D3D]' : 'bg-[#B5AFA6]'
      }`} />
      {status}
    </span>
  );
}
