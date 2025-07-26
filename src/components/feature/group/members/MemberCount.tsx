interface MemberCountProps {
  count: number;
}

const MemberCount = ({ count }: MemberCountProps) => {
  return (
    <div className="text-xs text-[color:var(--color-gray)] ml-4">
      인원 <span>{count}</span>
    </div>
  );
};

export default MemberCount;
