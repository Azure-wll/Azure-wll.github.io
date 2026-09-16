export type LearningCard = {
  id: string;
  kind: "career" | "life";
  category: string;
  eyebrow: string;
  title: string;
  minutes: number;
  summary: string;
  keyPoint: string;
  sections: { title: string; body: string }[];
  misconception: string;
  scenario: string;
  question: {
    prompt: string;
    options: string[];
    answer: number;
    explanation: string;
  };
  source: { label: string; url: string; verified: string };
};

export const cards: LearningCard[] = [
  {
    id: "career-talent-map",
    kind: "career",
    category: "招聘专业",
    eyebrow: "人才寻访 · 8分钟",
    title: "搜不到简历时，先画人才地图",
    minutes: 8,
    summary:
      "人才寻访不是不断更换岗位名称，而是先判断：目标人才现在可能在哪些公司、做哪些相邻岗位、使用哪些不同的自我描述。",
    keyPoint: "先扩大来源池，再收紧录用标准；搜索范围和录用门槛不是一回事。",
    sections: [
      {
        title: "第一层｜三圈人才池",
        body: "核心圈是职位与经历都直接匹配的人；相邻圈是岗位名称不同、但做过关键任务的人；迁移圈是能力可转移、需要进一步验证的人。只搜核心圈，通常会把大量可沟通对象挡在门外。",
      },
      {
        title: "第二层｜人才地图四要素",
        body: "记录目标公司、相邻岗位、工作任务关键词和地域流动方向。每次搜索只改变一个变量，记录结果，才能知道是市场供给少、条件过窄，还是关键词失效。",
      },
    ],
    misconception: "扩大搜索范围不等于降低录用要求。前者解决“看见更多人”，后者决定“最终选谁”。",
    scenario:
      "某岗位名称是“供应商质量工程师”，但候选人的职位写着“采购质量工程师”，工作中长期负责供应商审核和异常整改。她应进入相邻圈，而不是因职位名称不同直接淘汰。",
    question: {
      prompt: "搜索结果很少时，最合理的第一步是什么？",
      options: ["把所有硬条件全部取消", "增加相邻岗位和任务关键词", "重复搜索同一个岗位名"],
      answer: 1,
      explanation: "先扩大可见范围，再用关键任务和证据筛选，能同时兼顾数量与质量。",
    },
    source: {
      label: "CIPD｜Recruitment: an introduction",
      url: "https://www.cipd.org/en/knowledge/factsheets/recruitment-factsheet/",
      verified: "2026-09-16",
    },
  },
  {
    id: "life-gaslighting",
    kind: "life",
    category: "心理学",
    eyebrow: "心理概念 · 8分钟",
    title: "煤气灯效应，不是普通的意见不合",
    minutes: 8,
    summary:
      "煤气灯效应指持续的心理操控：操控者反复否认、扭曲或重写事实，使对方逐渐怀疑自己的记忆、判断和现实感。",
    keyPoint: "一次说谎、一次争执或不认同你的感受，不足以单独构成煤气灯操控。重点在持续性、权力影响和自我怀疑。",
    sections: [
      {
        title: "它从哪里来",
        body: "名称来自1938年的舞台剧《Gas Light》及其后改编电影。故事中，丈夫通过改变环境又否认变化，让妻子怀疑自己的感知和精神状态。",
      },
      {
        title: "如何识别",
        body: "观察是否存在反复否认明确发生过的事情、贬低你的判断、孤立信息来源，以及让你越来越依赖对方解释现实。判断一种关系模式，不能只凭一句话贴标签。",
      },
    ],
    misconception: "“你不同意我”不是煤气灯效应；这个词也不是“说谎”的高级同义词。",
    scenario:
      "同事一次记错会议内容，属于记忆差异；如果他长期修改记录、否认自己说过的话，并不断告诉你“你总是记错”，才需要警惕操控模式。",
    question: {
      prompt: "下面哪一种情况最接近煤气灯操控？",
      options: ["双方对电影评价不同", "朋友忘记了一次约定", "长期扭曲事实，让对方怀疑自己的记忆"],
      answer: 2,
      explanation: "关键不是分歧本身，而是持续操控并侵蚀对方对现实与自身判断的信任。",
    },
    source: {
      label: "APA Dictionary of Psychology",
      url: "https://dictionary.apa.org/",
      verified: "2026-09-16",
    },
  },
  {
    id: "career-outreach",
    kind: "career",
    category: "候选人沟通",
    eyebrow: "沟通转化 · 8分钟",
    title: "第一句话的任务，不是讲完全部JD",
    minutes: 8,
    summary:
      "候选人决定是否回复时，会快速判断四件事：你为什么找我、机会是否相关、信息是否可信、回复是否费力。",
    keyPoint: "好的首次招呼只完成一个目标：让对方愿意进入下一轮交流。",
    sections: [
      {
        title: "一个低阻力结构",
        body: "相关证据一句＋岗位关键价值一句＋一个容易回答的问题。比如先指出对方哪段经验与你的机会相关，再说明地点和核心职责，最后只问当前是否愿意了解。",
      },
      {
        title: "为什么长文案容易失效",
        body: "在信息不足时一次抛出公司历史、完整职责和十项要求，会增加理解和回应成本。首次沟通先建立相关性，得到回复后再分层补充信息。",
      },
    ],
    misconception: "礼貌不等于模板化。批量发送“看了您的简历很匹配”通常缺少可信的匹配证据。",
    scenario:
      "与其说“我们有个不错机会感兴趣吗”，不如说“看到你做过供应商异常闭环，我们这个岗位核心也是推动8D整改，地点在南通。你目前会考虑新的质量岗位吗？”",
    question: {
      prompt: "首次招呼最应该优先包含什么？",
      options: ["完整公司介绍", "具体匹配理由和一个低门槛问题", "所有岗位要求"],
      answer: 1,
      explanation: "相关性和低回复成本更容易促成第一次互动，详细信息可以在后续逐步补齐。",
    },
    source: {
      label: "SHRM BASK｜Candidate experience",
      url: "https://www.shrm.org/content/dam/en/shrm/credentials/shrm-certification/bask/shrm-bask.pdf",
      verified: "2026-09-16",
    },
  },
  {
    id: "life-social-insurance",
    kind: "life",
    category: "生活常识",
    eyebrow: "五险一金 · 8分钟",
    title: "“五险”和“公积金”不是同一套制度",
    minutes: 8,
    summary:
      "五险属于社会保险，包括基本养老、基本医疗、工伤、失业和生育保险；住房公积金是面向住房消费的长期住房储金制度。",
    keyPoint: "不要只看工资条上的扣款金额，还要分清缴费基数、个人比例、单位比例和对应权益。",
    sections: [
      {
        title: "五险分别解决什么风险",
        body: "养老对应退休后的基本保障；医疗用于符合规定的医疗费用；失业、工伤和生育分别对应特定风险与待遇。部分地区生育保险与职工医保合并经办，但法定险种仍通常表述为五险。",
      },
      {
        title: "为什么金额不能跨城市硬比较",
        body: "缴费上下限、比例、医保规则和公积金贷款政策存在地区差异。遇到具体问题，应优先查询参保地人社、医保和公积金中心的现行规定。",
      },
    ],
    misconception: "“扣得越少越划算”不一定成立；较低缴费基数可能同时影响养老积累、部分待遇和公积金账户。",
    scenario:
      "比较两个offer时，不只比较税前工资，还要核对社保与公积金按什么基数缴、比例是多少、在哪个城市缴纳。",
    question: {
      prompt: "下面哪一项不属于社会保险的五个法定险种？",
      options: ["工伤保险", "住房公积金", "失业保险"],
      answer: 1,
      explanation: "住房公积金通常与五险并称“五险一金”，但它本身不属于社会保险五险。",
    },
    source: {
      label: "中国政府网｜什么是社会保险",
      url: "https://www.gov.cn/banshi/2012-11/30/content_2279229.htm",
      verified: "2026-09-16",
    },
  },
  {
    id: "career-scorecard",
    kind: "career",
    category: "岗位画像",
    eyebrow: "需求管理 · 8分钟",
    title: "岗位画像不是条件清单，而是一组取舍",
    minutes: 8,
    summary:
      "有效的岗位画像先定义入职后要完成的结果，再拆成必须项、加分项、可验证项和可培养项。",
    keyPoint: "当薪资、地点和人才供给不变时，每增加一个硬条件，候选池都会进一步缩小。",
    sections: [
      {
        title: "先问结果，再问经历",
        body: "与业务确认岗位在3个月、6个月要交付什么结果。经历和证书只是可能支持结果的证据，不应自动变成全部一票否决项。",
      },
      {
        title: "建立取舍记录",
        body: "把业务每次拒绝候选人的理由记录下来，区分事实证据与个人偏好。当需求变化时，回到结果和优先级，而不是不断叠加新条件。",
      },
    ],
    misconception: "“条件写得越详细，招聘越精准”只在条件确实与工作结果相关时成立。",
    scenario:
      "如果岗位真正需要的是独立推动供应商整改，那么“职位名称必须叫SQE”可以是搜索线索，但不应替代对关键任务经历的验证。",
    question: {
      prompt: "建立岗位画像时，最先应该确认什么？",
      options: ["市场上常见的JD", "入职后需要完成的关键结果", "候选人的理想年龄"],
      answer: 1,
      explanation: "关键结果决定需要验证哪些能力，也为条件取舍提供共同标准。",
    },
    source: {
      label: "OPM｜Assessment and Selection",
      url: "https://www.opm.gov/policy-data-oversight/assessment-and-selection/",
      verified: "2026-09-16",
    },
  },
  {
    id: "life-confirmation-bias",
    kind: "life",
    category: "心理学",
    eyebrow: "认知偏差 · 8分钟",
    title: "确认偏误：人会主动寻找支持自己的证据",
    minutes: 8,
    summary:
      "确认偏误是人们更容易寻找、解释和记住支持原有信念的信息，同时忽略或低估相反证据的倾向。",
    keyPoint: "减少偏误不是要求自己没有立场，而是主动寻找什么证据会推翻当前判断。",
    sections: [
      {
        title: "它如何影响判断",
        body: "一旦先形成“这个人不稳定”的印象，我们可能格外注意他的离职次数，却忽略每次变化的原因、业绩和行业背景。相同资料会被不同预设解释成不同结论。",
      },
      {
        title: "一个简单反偏误动作",
        body: "做重要判断前写下：我目前的结论是什么？支持证据是什么？什么事实会让我改变看法？我是否认真寻找过相反证据？",
      },
    ],
    misconception: "确认偏误不是“别人固执、我更客观”；它是每个人都可能出现的信息处理倾向。",
    scenario:
      "你认定某平台没有合适候选人，于是只注意不匹配简历。可以设定固定样本量，并记录符合与不符合的具体数量，代替印象判断。",
    question: {
      prompt: "下面哪种做法最能减少确认偏误？",
      options: ["只收集支持当前看法的信息", "主动定义什么证据会改变结论", "更快地作出第一判断"],
      answer: 1,
      explanation: "提前设定可推翻条件，能迫使我们认真检查相反信息。",
    },
    source: {
      label: "Encyclopaedia Britannica｜Confirmation bias",
      url: "https://www.britannica.com/science/confirmation-bias",
      verified: "2026-09-16",
    },
  },
  {
    id: "career-resume-evidence",
    kind: "career",
    category: "简历判断",
    eyebrow: "证据筛选 · 8分钟",
    title: "从简历里找证据，而不是找漂亮词语",
    minutes: 8,
    summary:
      "简历判断可以围绕对象、任务、动作和结果四类证据展开：服务什么对象、承担什么任务、本人做了什么、最后产生什么结果。",
    keyPoint: "职位名称和自我评价是线索，不是能力已经被证明的证据。",
    sections: [
      {
        title: "四格证据法",
        body: "对象帮助你判断业务场景；任务判断职责边界；动作区分参与与主导；结果判断影响。如果缺少其中一格，就把它转化为电话或面试追问。",
      },
      {
        title: "把模糊描述变成追问",
        body: "“负责招聘工作”可以继续问：负责哪些岗位、使用哪些渠道、本人做了哪些关键动作、周期或转化有什么变化。不要替候选人脑补。",
      },
    ],
    misconception: "关键词越多不代表经验越深；复制JD也能制造关键词密度。",
    scenario:
      "简历写“参与人才库建设”，需要继续确认是录入数据、设计字段、制定维护规则，还是实际推动复用并产生招聘结果。",
    question: {
      prompt: "哪一项最能证明候选人真正主导过项目？",
      options: ["简历出现“项目管理”", "能说清本人动作、难点和结果", "曾在知名公司工作"],
      answer: 1,
      explanation: "具体行为和结果比岗位名称、公司品牌或抽象形容词更接近有效证据。",
    },
    source: {
      label: "OPM｜Designing an Assessment Strategy",
      url: "https://www.opm.gov/policy-data-oversight/assessment-and-selection/assessment-strategy/",
      verified: "2026-09-16",
    },
  },
  {
    id: "life-housing-fund",
    kind: "life",
    category: "生活常识",
    eyebrow: "住房与贷款 · 8分钟",
    title: "公积金余额、缴存和贷款额度不是一回事",
    minutes: 8,
    summary:
      "住房公积金个人住房贷款是面向符合条件缴存人的政策性住房贷款。能否申请、额度和利率等，要看当地当期规则。",
    keyPoint: "不要只问“账户里有多少钱”，还要看连续缴存、缴存基数、账户状态、住房套数和当地额度计算办法。",
    sections: [
      {
        title: "三个容易混淆的概念",
        body: "账户余额是已归集资金；月缴存额由基数和比例影响；贷款额度则由当地规则综合计算。三者有关联，但通常不能简单画等号。",
      },
      {
        title: "遇到买房问题怎么查",
        body: "先确定购房地和缴存地，再查当地公积金中心最新的贷款条件、额度、首付比例和异地贷款政策。房产政策变化较快，不依赖旧攻略做决定。",
      },
    ],
    misconception: "“余额越多，任何城市都一定能贷得越多”是错误的跨地区推断。",
    scenario:
      "准备买房时，把“当地公积金中心官网或政务平台”作为第一信息源，再用银行说明和中介信息交叉核对。",
    question: {
      prompt: "估算公积金贷款前，最先要确认什么？",
      options: ["朋友去年贷了多少", "购房地和缴存地的现行政策", "银行卡余额"],
      answer: 1,
      explanation: "公积金贷款规则地方差异明显，必须以相关地区现行政策为准。",
    },
    source: {
      label: "国家机关事务管理局｜住房公积金个人贷款指南",
      url: "https://www.ggj.gov.cn/zwfw/qtfw/grgjjyw/tq_2152/bszn/",
      verified: "2026-09-16",
    },
  },
  {
    id: "career-structured-interview",
    kind: "career",
    category: "面试评估",
    eyebrow: "结构化面试 · 8分钟",
    title: "同一岗位，尽量用同一把尺子评估",
    minutes: 8,
    summary:
      "结构化面试围绕与岗位有关的能力，向候选人提出预先设计的问题，并用一致的评分标准评估答案。",
    keyPoint: "结构化不等于机械照本宣科，而是让关键问题和评分标准保持一致。",
    sections: [
      {
        title: "两类常用问题",
        body: "行为问题询问过去真实发生的经历；情境问题询问遇到类似工作场景会怎么做。两类问题都应对应明确能力，而不是随意聊天。",
      },
      {
        title: "让评分可复核",
        body: "面试前定义优秀、合格和不足答案分别应出现哪些证据。面试后先独立记录事实，再讨论结论，减少“感觉不错”一类模糊评价。",
      },
    ],
    misconception: "问了相同问题却没有统一评分标准，仍然可能只是形式上的结构化。",
    scenario:
      "评估推动能力时，所有候选人都回答一个过往冲突案例，并按目标是否清楚、行动是否具体、结果是否验证等维度评分。",
    question: {
      prompt: "结构化面试最关键的组合是什么？",
      options: ["统一问题＋统一评分标准", "问题越多越好", "完全不追问"],
      answer: 0,
      explanation: "围绕岗位能力设置一致问题和评价尺度，才能提高比较的一致性。",
    },
    source: {
      label: "U.S. OPM｜Structured Interviews",
      url: "https://www.opm.gov/policy-data-oversight/assessment-and-selection/structured-interviews/",
      verified: "2026-09-16",
    },
  },
  {
    id: "life-assertive-boundary",
    kind: "life",
    category: "人际沟通",
    eyebrow: "边界表达 · 8分钟",
    title: "坚定表达，不等于攻击别人",
    minutes: 8,
    summary:
      "坚定沟通是在尊重他人的同时，清楚表达自己的事实、感受、需求和边界；它介于被动忍让和攻击指责之间。",
    keyPoint: "边界不是要求别人必须改变，而是说明你能接受什么，以及超过边界后你会采取什么行动。",
    sections: [
      {
        title: "一个四步句式",
        body: "先描述可观察事实，再表达影响或感受，接着提出具体请求，最后说明自己可执行的选择。减少“你总是”“你根本”等全称指责。",
      },
      {
        title: "边界需要可执行",
        body: "“你以后必须尊重我”过于抽象；“如果会议临时改期，请至少提前半天通知，否则我可能无法参加”更具体，也更容易协商。",
      },
    ],
    misconception: "拒绝并不自动等于自私；但边界也不能成为控制别人选择的借口。",
    scenario:
      "同事频繁临时让你代做任务，可以说：“这周已经有两次临时交接，影响了我的截止时间。以后请至少提前一天确认；今天这项我只能明天下午处理。”",
    question: {
      prompt: "哪一句更接近坚定而非攻击式表达？",
      options: ["你总是把麻烦丢给我", "我今天无法接下，明天下午可以协助", "算了，我什么都不说"],
      answer: 1,
      explanation: "它清楚说明边界与可提供的选择，没有给对方贴人格标签。",
    },
    source: {
      label: "APA Dictionary of Psychology｜Assertiveness",
      url: "https://dictionary.apa.org/assertiveness",
      verified: "2026-09-16",
    },
  },
];

export const learningDays = [
  { day: 1, label: "周一", career: "career-talent-map", life: "life-gaslighting" },
  { day: 2, label: "周二", career: "career-outreach", life: "life-social-insurance" },
  { day: 3, label: "周三", career: "career-scorecard", life: "life-confirmation-bias" },
  { day: 4, label: "周四", career: "career-resume-evidence", life: "life-housing-fund" },
  { day: 5, label: "周五", career: "career-structured-interview", life: "life-assertive-boundary" },
];

export function getCard(id: string) {
  return cards.find((card) => card.id === id)!;
}
