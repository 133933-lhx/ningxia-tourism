import type { TravelRoute } from "@/types/content";
import { SRC_NX_TOURISM, SRC_OPEN } from "./sources";

const UPDATED = "2026-11";

export const routes: TravelRoute[] = [
  {
    slug: "classic-3-days",
    title: "宁夏经典 3 日：银川 + 中卫",
    days: 3,
    theme: "第一次来宁夏的首选",
    regions: ["银川", "中卫"],
    summary:
      "三天看遍宁夏最出名的三样东西：贺兰山下的西夏与影视记忆、沙湖的芦苇与沙丘、沙坡头的沙漠与黄河。节奏适中，适合第一次到访。",
    budget: "人均 1200–1800 元（不含大交通）",
    tags: ["经典", "首次到访", "3日"],
    dayPlans: [
      {
        day: 1,
        region: "银川",
        title: "贺兰山东麓：西夏王陵 + 镇北堡影城",
        items: [
          { time: "08:30", title: "西夏王陵", kind: "景区", detail: "先看西夏博物馆，再乘观光车进陵区，3 号陵（泰陵）必看。", refSlug: "xixia-mausoleums" },
          { time: "12:00", title: "午餐：羊肉臊子面", kind: "美食", detail: "景区周边或返回市区解决，简单扎实。", refSlug: "yangrou-shaozimian" },
          { time: "14:00", title: "镇北堡西部影城", kind: "景区", detail: "明城、清城两片场景区，留足 3 小时拍照。", refSlug: "zhenbeibao" },
          { time: "18:30", title: "晚餐：手抓羊肉", kind: "美食", detail: "回银川市区吃手抓，配八宝茶解腻。", refSlug: "shouzhua-yangrou" },
        ],
        tips: "西夏王陵与影城同在贺兰山东麓，顺路串成一天最省时间。",
      },
      {
        day: 2,
        region: "石嘴山",
        title: "沙湖一日：芦苇荡与鸟岛",
        items: [
          { time: "08:00", title: "银川出发去沙湖", kind: "交通", detail: "自驾约 1 小时，或乘旅游直通车。" },
          { time: "09:30", title: "沙湖景区", kind: "景区", detail: "乘船穿芦苇荡，登鸟岛观鸟，沙丘区可玩滑沙。", refSlug: "shahu" },
          { time: "13:00", title: "午餐：沙湖大鱼头", kind: "美食", detail: "湖鲜招牌，清炖最见功底。", refSlug: "shahu-dayutou" },
          { time: "16:00", title: "返回银川", kind: "交通", detail: "傍晚可去览山公园看日落或逛怀远夜市。" },
        ],
        tips: "沙湖风大，防晒和外套都备上；鸟岛观鸟带望远镜。",
      },
      {
        day: 3,
        region: "中卫",
        title: "沙坡头：沙漠与黄河",
        items: [
          { time: "07:30", title: "银川乘高铁去中卫", kind: "交通", detail: "高铁约 1.5 小时，出站打车到景区。" },
          { time: "09:30", title: "沙坡头", kind: "景区", detail: "滑沙、黄河飞索、羊皮筏子按兴趣选，别贪多。", refSlug: "shapotou" },
          { time: "13:00", title: "午餐：蒿子面 / 烩小吃", kind: "美食", detail: "中卫本地味道，蒿子面清香筋道。", refSlug: "haozi-mian" },
          { time: "15:30", title: "返程", kind: "交通", detail: "中卫返银川高铁末班较多，注意留出打车时间。" },
        ],
        tips: "沙漠项目排队久，建议先玩最想玩的，再补其他。",
      },
    ],
    sources: [SRC_NX_TOURISM, SRC_OPEN],
    verified: false,
    updatedAt: UPDATED,
  },
  {
    slug: "deep-5-days",
    title: "宁夏深度 5 日环线",
    days: 5,
    theme: "从贺兰山到六盘山",
    regions: ["银川", "石嘴山", "中卫", "吴忠", "固原"],
    summary:
      "沿宁夏南北走一条完整环线：贺兰山岩画与西夏王陵、沙湖与沙坡头、青铜峡黄河峡谷，最后南下固原看须弥山与六盘山。",
    budget: "人均 2500–3500 元（不含大交通）",
    tags: ["深度", "环线", "5日"],
    dayPlans: [
      {
        day: 1,
        region: "银川",
        title: "贺兰山：岩画 + 西夏王陵",
        items: [
          { time: "08:30", title: "贺兰山岩画", kind: "景区", detail: "太阳神岩画与沟谷徒步，约 2.5 小时。", refSlug: "helanshan-rock-art" },
          { time: "13:00", title: "西夏王陵", kind: "景区", detail: "博物馆 + 泰陵，下午光线适合拍照。", refSlug: "xixia-mausoleums" },
          { time: "18:00", title: "晚餐：羊肉泡馍", kind: "美食", detail: "市区老店，冬天最舒服。", refSlug: "yangrou-paomo" },
        ],
      },
      {
        day: 2,
        region: "石嘴山",
        title: "沙湖 + 黄渠桥",
        items: [
          { time: "09:00", title: "沙湖", kind: "景区", detail: "乘船、观鸟、沙漠区半日。", refSlug: "shahu" },
          { time: "13:30", title: "午餐：黄渠桥羊羔肉", kind: "美食", detail: "平罗黄渠桥镇，羔羊肉嫩而不膻。", refSlug: "huangquqiao-yanggaorou" },
          { time: "16:00", title: "返银川", kind: "交通", detail: "晚上可逛怀远夜市吃辣糊糊。", refSlug: "lahuhu" },
        ],
      },
      {
        day: 3,
        region: "中卫",
        title: "沙坡头一整天",
        items: [
          { time: "08:00", title: "银川 → 中卫", kind: "交通", detail: "高铁约 1.5 小时。" },
          { time: "10:00", title: "沙坡头", kind: "景区", detail: "滑沙、飞索、羊皮筏子、沙漠冲浪，按体力取舍。", refSlug: "shapotou" },
          { time: "18:30", title: "晚餐：烤羊排", kind: "美食", detail: "中卫夜市解决。", refSlug: "kao-yangpai" },
        ],
        tips: "沙漠日晒强，帽子、墨镜、防晒霜、2L 水是底线。",
      },
      {
        day: 4,
        region: "吴忠",
        title: "青铜峡黄河大峡谷",
        items: [
          { time: "09:00", title: "中卫 → 青铜峡", kind: "交通", detail: "自驾约 2 小时，途经中宁可买枸杞。", refSlug: "zhongning-gouqi" },
          { time: "11:00", title: "青铜峡黄河大峡谷", kind: "景区", detail: "游船看峡谷，登岸看一百零八塔。", refSlug: "qingtongxia-canyon" },
          { time: "17:00", title: "吴忠晚餐：手抓羊肉", kind: "美食", detail: "吴忠是手抓重镇，选老店。", refSlug: "shouzhua-yangrou" },
        ],
      },
      {
        day: 5,
        region: "固原",
        title: "须弥山 + 六盘山",
        items: [
          { time: "08:00", title: "吴忠 → 固原", kind: "交通", detail: "自驾约 3 小时，或高铁到固原再包车。" },
          { time: "11:00", title: "须弥山石窟", kind: "景区", detail: "大佛楼唐代坐佛与北魏窟龛。", refSlug: "xumishan" },
          { time: "15:00", title: "六盘山红军长征纪念亭", kind: "景区", detail: "看展馆与山景，夏季凉爽。", refSlug: "liupanshan" },
          { time: "18:00", title: "晚餐：羊肉粉汤", kind: "美食", detail: "固原早市/夜市都有，暖身收尾。", refSlug: "yangrou-fentang" },
        ],
      },
    ],
    sources: [SRC_NX_TOURISM, SRC_OPEN],
    verified: false,
    updatedAt: UPDATED,
  },
  {
    slug: "family-2-days",
    title: "亲子 2 日：银川轻松版",
    days: 2,
    theme: "孩子不累、大人不赶",
    regions: ["银川"],
    summary:
      "选车程短、互动多的点：鸣翠湖看鸟、镇北堡影城拍照、水洞沟坐骆驼车。每天只安排一个主景区，留足午休。",
    budget: "人均 600–1000 元（不含大交通）",
    tags: ["亲子", "轻松", "2日"],
    dayPlans: [
      {
        day: 1,
        region: "银川",
        title: "鸣翠湖 + 影城",
        items: [
          { time: "09:30", title: "鸣翠湖", kind: "景区", detail: "芦苇迷宫游船、观鸟塔，半天足够。", refSlug: "mingcuihu" },
          { time: "12:30", title: "午餐：羊肉搓面", kind: "美食", detail: "孩子也能吃的家常面。", refSlug: "yangrou-cuomian" },
          { time: "14:30", title: "午休", kind: "其他", detail: "回酒店休息，避开正午日晒。" },
          { time: "17:00", title: "镇北堡西部影城", kind: "景区", detail: "傍晚光线好、人相对少，拍《大话西游》同款。", refSlug: "zhenbeibao" },
        ],
        tips: "影城地面多土路，给孩子穿好走的鞋。",
      },
      {
        day: 2,
        region: "银川",
        title: "水洞沟半日",
        items: [
          { time: "09:00", title: "水洞沟", kind: "景区", detail: "遗址博物馆 + 骆驼车 + 藏兵洞，孩子兴趣点密集。", refSlug: "shuidonggou" },
          { time: "13:00", title: "午餐：烩小吃", kind: "美食", detail: "一碗齐全，挑食娃也友好。", refSlug: "hui-xiaochi" },
          { time: "15:00", title: "返程 / 市区公园", kind: "交通", detail: "时间富余可去览山公园或宁夏博物馆。" },
        ],
      },
    ],
    sources: [SRC_NX_TOURISM, SRC_OPEN],
    verified: false,
    updatedAt: UPDATED,
  },
  {
    slug: "photo-3-days",
    title: "摄影 3 日：贺兰山与沙漠光影",
    days: 3,
    theme: "追日出日落的光",
    regions: ["银川", "中卫"],
    summary:
      "按光线安排行程：贺兰山岩画与西夏王陵拍晨昏，沙坡头拍沙漠与黄河的日落，沙湖拍芦苇与飞鸟。",
    budget: "人均 1500–2200 元（不含大交通）",
    tags: ["摄影", "日出日落", "3日"],
    dayPlans: [
      {
        day: 1,
        region: "银川",
        title: "贺兰山：岩画晨光 + 王陵日落",
        items: [
          { time: "07:00", title: "贺兰口岩画", kind: "景区", detail: "清晨侧光最能显出刻痕，太阳神岩画重点。", refSlug: "helanshan-rock-art" },
          { time: "12:00", title: "午餐：市区简餐", kind: "美食", detail: "回市区休整、导照片。" },
          { time: "16:30", title: "西夏王陵", kind: "景区", detail: "日落前 1.5 小时进陵区，拍夯土陵台剪影。", refSlug: "xixia-mausoleums" },
        ],
      },
      {
        day: 2,
        region: "中卫",
        title: "沙坡头日落",
        items: [
          { time: "09:00", title: "银川 → 中卫", kind: "交通", detail: "高铁 1.5 小时。" },
          { time: "15:30", title: "沙坡头", kind: "景区", detail: "下午进景区，沙丘线条在侧光下最立体。", refSlug: "shapotou" },
          { time: "19:00", title: "黄河边日落", kind: "其他", detail: "沙坡头是拍黄河日落的最佳机位之一。" },
        ],
        tips: "风沙大，换镜头前先关相机电源，带气吹。",
      },
      {
        day: 3,
        region: "石嘴山",
        title: "沙湖芦苇与鸟",
        items: [
          { time: "07:30", title: "沙湖", kind: "景区", detail: "清晨芦苇荡有雾气和鸟群，长焦必备。", refSlug: "shahu" },
          { time: "12:00", title: "午餐：沙湖大鱼头", kind: "美食", detail: "湖边吃鱼，顺便整理素材。", refSlug: "shahu-dayutou" },
          { time: "15:00", title: "返程", kind: "交通", detail: "沙湖回银川约 1 小时。" },
        ],
      },
    ],
    sources: [SRC_NX_TOURISM, SRC_OPEN],
    verified: false,
    updatedAt: UPDATED,
  },
  {
    slug: "xixia-culture-2-days",
    title: "西夏文化 2 日",
    days: 2,
    theme: "一个消失王朝的现场",
    regions: ["银川"],
    summary:
      "以西夏为主线：西夏王陵看陵制与文物，贺兰山岩画看作画者的世界，宁夏博物馆补齐历史脉络，晚上读一段西夏文。",
    budget: "人均 700–1100 元（不含大交通）",
    tags: ["历史", "西夏", "2日"],
    dayPlans: [
      {
        day: 1,
        region: "银川",
        title: "王陵 + 博物馆",
        items: [
          { time: "09:00", title: "西夏王陵", kind: "景区", detail: "博物馆先看，再进陵区，理解「陵塔」形制。", refSlug: "xixia-mausoleums" },
          { time: "13:00", title: "午餐：蒸羊羔肉", kind: "美食", detail: "市区老店，慢慢吃。", refSlug: "zheng-yanggaorou" },
          { time: "15:00", title: "宁夏博物馆", kind: "其他", detail: "西夏文物与岩画专题，免费需预约。" },
        ],
      },
      {
        day: 2,
        region: "银川",
        title: "贺兰山岩画",
        items: [
          { time: "09:00", title: "贺兰山岩画", kind: "景区", detail: "重点看太阳神与人面像岩画，配世界岩画馆。", refSlug: "helanshan-rock-art" },
          { time: "13:00", title: "午餐：生汆面", kind: "美食", detail: "返程路上解决。", refSlug: "shengcuan-mian" },
          { time: "15:00", title: "镇北堡影城（可选）", kind: "景区", detail: "顺路补一个影视场景。", refSlug: "zhenbeibao" },
        ],
      },
    ],
    sources: [SRC_NX_TOURISM, SRC_OPEN],
    verified: false,
    updatedAt: UPDATED,
  },
  {
    slug: "winter-2-days",
    title: "冬季 2 日：冰雪与温泉",
    days: 2,
    theme: "淡季人少，另一种宁夏",
    regions: ["银川", "石嘴山"],
    summary:
      "冬季的沙湖有冰雪项目，贺兰山可看雪线，市区温泉与羊肉是标配。注意部分景区冬季闭园或缩短营业时间，出发前务必确认。",
    budget: "人均 800–1300 元（不含大交通）",
    tags: ["冬季", "冰雪", "2日"],
    dayPlans: [
      {
        day: 1,
        region: "石嘴山",
        title: "沙湖冰雪",
        items: [
          { time: "09:30", title: "沙湖", kind: "景区", detail: "冰雪项目以当年运营公告为准，冰面项目注意安全。", refSlug: "shahu" },
          { time: "13:00", title: "午餐：沙湖大鱼头", kind: "美食", detail: "冬天喝鱼汤最舒服。", refSlug: "shahu-dayutou" },
          { time: "16:00", title: "返回银川泡温泉", kind: "其他", detail: "市区周边温泉度假区，提前订票。" },
        ],
        tips: "冬季景区开放时间会缩短，务必提前电话确认。",
      },
      {
        day: 2,
        region: "银川",
        title: "贺兰山雪景 + 市区",
        items: [
          { time: "10:00", title: "贺兰山沿线", kind: "景区", detail: "雪后贺兰山很出片，注意山路结冰。", refSlug: "helanshan-rock-art" },
          { time: "13:00", title: "午餐：羊杂碎", kind: "美食", detail: "一碗热汤回魂。", refSlug: "yangzasui" },
          { time: "15:00", title: "宁夏博物馆 / 市区咖啡", kind: "其他", detail: "天冷就转室内。" },
        ],
      },
    ],
    sources: [SRC_NX_TOURISM, SRC_OPEN],
    verified: false,
    updatedAt: UPDATED,
  },
  {
    slug: "desert-hike-2-days",
    title: "沙漠徒步 2 日",
    days: 2,
    theme: "走进腾格里",
    regions: ["中卫"],
    summary:
      "以沙坡头为基地的轻徒步：第一天沙丘徒步与黄河边露营看星空，第二天滑沙与黄河项目收尾。徒步请跟正规向导，切勿独自深入沙漠。",
    budget: "人均 900–1500 元（含向导/装备租赁）",
    tags: ["徒步", "沙漠", "露营"],
    dayPlans: [
      {
        day: 1,
        region: "中卫",
        title: "沙丘徒步 + 星空",
        items: [
          { time: "08:00", title: "集合与装备检查", kind: "其他", detail: "水、防晒、头灯、保暖层；跟持证向导。" },
          { time: "10:00", title: "腾格里沙漠边缘徒步", kind: "其他", detail: "约 8–12 公里，量力而行，避开正午高温。" },
          { time: "18:00", title: "营地晚餐", kind: "美食", detail: "简餐为主，注意垃圾全部带走。" },
          { time: "21:00", title: "观星", kind: "其他", detail: "远离城市光污染，沙丘上银河可见。" },
        ],
        tips: "沙漠昼夜温差大，白天 30℃、夜里可能 5℃；手机信号不稳，提前告知家人行程。",
      },
      {
        day: 2,
        region: "中卫",
        title: "沙坡头收尾",
        items: [
          { time: "08:00", title: "出沙", kind: "其他", detail: "按向导安排撤出，补水补能量。" },
          { time: "10:00", title: "沙坡头", kind: "景区", detail: "滑沙、飞索、羊皮筏子，放松收尾。", refSlug: "shapotou" },
          { time: "14:00", title: "午餐：蒿子面", kind: "美食", detail: "中卫本地味道。", refSlug: "haozi-mian" },
        ],
      },
    ],
    sources: [SRC_NX_TOURISM, SRC_OPEN],
    verified: false,
    updatedAt: UPDATED,
  },
  {
    slug: "yellow-river-study-3-days",
    title: "黄河研学 3 日",
    days: 3,
    theme: "从水利到文明",
    regions: ["吴忠", "中卫", "银川"],
    summary:
      "沿黄河看三个层次：青铜峡的水利与西夏塔、沙坡头的治沙与河湾、银川的黄河灌溉与城市。适合带学生做地理/历史主题出行。",
    budget: "人均 1200–1700 元（不含大交通）",
    tags: ["研学", "黄河", "3日"],
    dayPlans: [
      {
        day: 1,
        region: "吴忠",
        title: "青铜峡水利枢纽",
        items: [
          { time: "09:30", title: "青铜峡黄河大峡谷", kind: "景区", detail: "看水利枢纽与一百零八塔，理解黄河灌溉史。", refSlug: "qingtongxia-canyon" },
          { time: "13:00", title: "午餐：黄河鲤鱼", kind: "美食", detail: "沿黄餐桌的主角。", refSlug: "huanghe-liyu" },
          { time: "15:00", title: "黄河坛（可选）", kind: "其他", detail: "视开放情况安排。" },
        ],
      },
      {
        day: 2,
        region: "中卫",
        title: "沙坡头治沙工程",
        items: [
          { time: "09:00", title: "沙坡头治沙区", kind: "景区", detail: "麦草方格与包兰铁路治沙，是最直观的地理课。", refSlug: "shapotou" },
          { time: "13:00", title: "午餐：烩小吃", kind: "美食", detail: "中卫本地味。", refSlug: "hui-xiaochi" },
          { time: "15:00", title: "黄河边观察", kind: "其他", detail: "观察河道、流速与河岸植被，做记录。" },
        ],
      },
      {
        day: 3,
        region: "银川",
        title: "宁夏博物馆 + 灌区",
        items: [
          { time: "09:30", title: "宁夏博物馆", kind: "其他", detail: "从岩画到西夏到引黄灌溉，一条线讲清宁夏。" },
          { time: "13:00", title: "午餐：羊肉臊子面", kind: "美食", detail: "返程前最后一碗。", refSlug: "yangrou-shaozimian" },
          { time: "15:00", title: "唐徕渠 / 城市灌区", kind: "其他", detail: "看黄河水如何进银川城。" },
        ],
      },
    ],
    sources: [SRC_NX_TOURISM, SRC_OPEN],
    verified: false,
    updatedAt: UPDATED,
  },
];

export function getRoute(slug: string): TravelRoute | undefined {
  return routes.find((r) => r.slug === slug);
}
