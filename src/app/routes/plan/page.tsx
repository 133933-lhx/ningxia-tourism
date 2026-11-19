import type { Metadata } from "next";
import { PageHeader } from "@/components/ui";
import { PlannerForm } from "@/components/PlannerForm";

export const metadata: Metadata = {
  title: "路线规划器",
  description: "按天数、区域、兴趣与预算自动生成宁夏逐日行程，同区域聚拢，减少路上折腾。",
};

export default function PlanPage() {
  return (
    <>
      <PageHeader
        eyebrow="自己排 / PLANNER"
        title="把几天排顺"
        description="先选天数和想看的风景，右侧会立即给出一版逐日行程。每个景区都能点开核对详情，再回来调整。"
        aside={
          <div className="grid grid-cols-3 gap-3 border-y border-line py-4">
            <div>
              <p className="font-display text-[28px] leading-none">1–7</p>
              <p className="mt-1 font-ui text-[11px] text-ink-500">可选天数</p>
            </div>
            <div>
              <p className="font-display text-[28px] leading-none">5</p>
              <p className="mt-1 font-ui text-[11px] text-ink-500">覆盖城市</p>
            </div>
            <div>
              <p className="font-display text-[28px] leading-none">即时</p>
              <p className="mt-1 font-ui text-[11px] text-ink-500">路线预览</p>
            </div>
          </div>
        }
      />
      <div className="container-page py-10 md:py-14">
        <PlannerForm />
      </div>
    </>
  );
}
