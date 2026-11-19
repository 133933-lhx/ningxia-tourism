"use client";

import { useEffect, useState } from "react";
import { WifiOff } from "./icons";

export function ConnectivityBanner() {
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    const update = () => setOffline(!navigator.onLine);
    update();
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);

  if (!offline) return null;

  return (
    <div role="status" className="border-b border-ochre bg-ochre/10">
      <div className="container-page flex items-center gap-3 py-2 font-ui text-[12px] text-ink-700">
        <WifiOff size={15} className="text-ochre" />
        <span>当前离线。站内资料仍可浏览，问答和方言翻译需要网络恢复后再试。</span>
      </div>
    </div>
  );
}
