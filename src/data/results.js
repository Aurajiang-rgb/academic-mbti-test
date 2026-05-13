/**
 * 8 种三维人格组合画像（key 与计分逻辑一致）。
 * - image: 静态资源路径，对应 `public/images/*.png`（开发/构建后为 `/images/...`）
 * - mbti: 趣味映射，非临床测评
 * - match: 与该画像标签的匹配度（百分比整数）
 */
export const RESULT_MAP = {
  CISl: {
    title: '野生学术吗喽',
    tags: '组内小透明 | 擅长退堂鼓 | 精神离职专家',
    desc: '导师不疼，SCI 不爱。主打陪伴式读研/博,但是个聪明蛋子。对科研最大贡献是维持了实验室的二氧化碳浓度，但是对世界的贡献肯定不止于此。',
    mbti: 'INFP/ISFP',
    match: 80,
    image: '/images/CISl.png',
  },
  SPPr: {
    title: '无情 Paper 制造机',
    tags: '组内太子/长公主 | 导师心腹 | 情绪稳定如狗',
    desc: '组内唯一真神，你没有感情全是产出。别人测这个是为了发疯，你测这个只是在跑胶间隙休息两分钟。',
    mbti: 'INTJ/ISTJ',
    match: 85,
    image: '/images/SPPr.png',
  },
  CIPr: {
    title: '暗黑系科研狂徒',
    tags: '独狼战士 | 边骂边干 | 赛博精神病',
    desc: '常年在实验室阴暗爬行。看似精神崩溃，全靠对命运的愤怒在疯狂做实验写代码出图。每一篇Paper都写满怨气。',
    mbti: 'INTP',
    match: 90,
    image: '/images/CIPr.png',
  },
  SPSl: {
    title: '组会 PPT 影帝',
    tags: '向上管理大师 | 嘴强王者 | 摸鱼仙人',
    desc: '一天只看半篇文献，却能在组会讲出冲击诺奖的气势。科研全靠一张嘴，实操全靠忽悠师弟师妹。',
    mbti: 'ENTP/ENFJ',
    match: 92,
    image: '/images/SPSl.png',
  },
  SISl: {
    title: '佛系学术老兵',
    tags: '看破红尘 | 延毕候选人 | 苟住就是胜利',
    desc: '达到了科研最高境界——无所谓。老板骂你听着，发不出文章没关系，大不了转行去摊煎饼。',
    mbti: 'ISFJ',
    match: 85,
    image: '/images/SISl.png',
  },
  CPSl: {
    title: '天选科研赌徒',
    tags: '薛定谔的产出 | 导师速效救心丸',
    desc: '你在实验室是个谜。要么几个月看不见人影，要么在DDL前夜疯狂创造奇迹。科研全靠祖师爷赏饭吃。',
    mbti: 'ESTP/ESFP',
    match: 93,
    image: '/images/CPSl.png',
  },
  SIPr: {
    title: '老实巴交填坑人',
    tags: '学术老黄牛 | 无情打工仔 | 稳定发育',
    desc: '不善言辞不会讨好，但你是实验室最可靠的基石。数据最扎实，虽然光环不在你身上，但毕业绝对没问题。',
    mbti: 'ISTP',
    match: 97,
    image: '/images/SIPr.png',
  },
  CPPr: {
    title: '卷王之王 (疯批版)',
    tags: '卷死同行 | 极限微操 | 既要又要',
    desc: '所有研究生的噩梦。产出惊人且精神状态处于诡异的亢奋中。别人是来上学的，而你注定为科研而生。',
    mbti: 'ENTJ',
    match: 99,
    image: '/images/CPPr.png',
  },
}
