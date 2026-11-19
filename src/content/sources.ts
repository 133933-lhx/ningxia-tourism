import type { Citation } from "@/types/content";

/**
 * 站内引用来源统一管理。
 * 说明：本站内容为「公开资料整理」，来源指向官方机构的公开入口，
 * 具体条目在人工核实后应替换为更精确的页面链接。
 */
export const SRC_NX_GOV: Citation = {
  id: "nx-gov",
  title: "宁夏回族自治区人民政府门户网站",
  href: "https://www.nx.gov.cn",
};

export const SRC_NX_TOURISM: Citation = {
  id: "nx-tourism",
  title: "宁夏回族自治区文化和旅游厅",
  href: "https://whhlyt.nx.gov.cn",
};

export const SRC_NX_STATS: Citation = {
  id: "nx-stats",
  title: "宁夏回族自治区统计局（公开统计资料）",
  href: "https://tj.nx.gov.cn",
};

export const SRC_OPEN: Citation = {
  id: "open-data",
  title: "公开资料整理（百科与媒体公开报道）",
  href: "https://baike.baidu.com",
};
