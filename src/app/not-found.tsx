import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grain relative border-b border-line">
      <div className="container-page flex min-h-[58vh] flex-col justify-center py-20">
        <p className="kicker">Error 404</p>
        <p className="mt-4 font-display text-[92px] leading-none text-vermilion md:text-[132px]">404</p>
        <h1 className="mt-4 font-display text-[26px] tracking-[0.04em] md:text-[34px]">
          这个页面在贺兰山里走丢了
        </h1>
        <p className="mt-3 max-w-md text-[12px] leading-[1.95] text-ink-500">
          你访问的地址不存在，或者内容已经调整。可以从下面的入口重新出发。
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link
            href="/"
            className="inline-flex items-center gap-3 bg-ink px-5 py-3 text-[12px] tracking-[0.14em] text-paper transition-colors hover:bg-vermilion focus-ring"
          >
            回首页
            <span aria-hidden="true" className="font-mono-ui text-[10px]">→</span>
          </Link>
          <Link href="/attractions" className="link-line text-[12px] tracking-[0.1em]">看景区</Link>
          <Link href="/routes/plan" className="link-line text-[12px] tracking-[0.1em]">排路线</Link>
        </div>
      </div>
    </div>
  );
}
