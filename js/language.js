(function() {
  'use strict';
  const query = new URLSearchParams(location.search).get('lang');
  let saved;
  try { saved = localStorage.getItem('lmink-language'); } catch (_) {}
  const language = ['en', 'zh-CN'].includes(query) ? query : saved === 'en' ? 'en' : 'zh-CN';
  if (query === 'en' || query === 'zh-CN') {
    try { localStorage.setItem('lmink-language', language); } catch (_) {}
  }
  document.documentElement.lang = language;

  // Exact interface strings only. Article text is excluded below.
  const english = {
    '阅读': 'Views',
    '评论': 'Comments', '加载评论': 'Load comments',
    '前往 GitHub 讨论区': 'Open GitHub Discussions',
    '登录 GitHub，参与讨论。': 'Sign in with GitHub to join the discussion.',
    '发布于': 'Published', '更新于': 'Updated', '适用版本': 'Applies to',
    '复制文章链接': 'Copy article link', '复制章节链接': 'Copy section link',
    '链接已复制': 'Link copied', '已复制': 'Copied', '手动复制链接': 'Copy link manually',
    '无法自动复制，请手动复制下方链接。': 'Unable to copy automatically. Copy the link below manually.',
    '关闭看板娘': 'Disable Live2D', '开启看板娘': 'Enable Live2D',
    '个人介绍': 'Profile', '关于我与联系方式 →': 'About & contact →',
    '地址：中国甘肃酒泉': 'Location: Jiuquan, Gansu, China',
    '分类与标签': 'Topics', '项目': 'Projects',
    '按分类浏览，用标签探索': 'Browse categories and explore tags',
    '按内容方向浏览文章。': 'Browse articles by category.',
    '从具体话题出发，发现相关内容。': 'Explore related articles through tags.',
    '从想法到实践': 'From ideas to practice', '准备中': 'Coming soon',
    '项目慢慢做，成果认真记。': 'Building thoughtfully, documenting carefully.',
    '这里将记录我的个人项目、工具与实践。': 'A home for my personal projects, tools and experiments.',
    '目前暂无公开项目，后续会补充项目介绍、技术选择和相关链接。': 'No public projects yet. Project introductions, technical decisions and links will be added here.',
    '先看看博客': 'Explore the blog',
    '，版权所有，转载请注明出处。': '. All rights reserved. Please credit the source when reposting.',
    'lmink 的博客': 'lmink’s blog',
    '首页': 'Home', '归档': 'Archives', '分类': 'Categories', '标签': 'Tags',
    '返回首页': 'Back to home', '文章目录': 'Contents', '关于作者': 'About the author',
    '银行金融科技技术人，记录 Java、AI 实践与生活。': 'Banking technologist writing about Java, AI and life.',
    '关于我': 'About', '订阅': 'Subscribe', '搜索': 'Search', '站内搜索': 'Search',
    '全部': 'All', '最近发布': 'Latest posts', '所有归档': 'All archives',
    '相关文章': 'Related posts', '继续阅读': 'Read next', '查看分类': 'View category',
    '随笔': 'Essays', '读书笔记': 'Reading notes', '观影笔记': 'Screen notes',
    '羽毛球': 'Badminton', '技术笔记': 'Tech notes', '未分类': 'Uncategorized',
    '地址:': 'Location:', '邮箱:': 'Email:', '中国甘肃酒泉': 'Jiuquan, Gansu, China',
    '学习记录': 'Learning notes', 'Java · AI · 折腾记录': 'Java · AI · Experiments',
    '记录 Java 与 AI 的实践': 'Notes on Java and AI in practice',
    '思多乱其志，行者多披靡\n知是行之始，行胜万般知\n行大于辩，梦藏于心': 'Overthinking clouds purpose; action clears the way.\nKnowledge begins action; practice makes it count.\nAct more, argue less; keep dreams close.',
    '搜索博客': 'Search the blog', '文章分类': 'Post categories', '搜索结果': 'Search results',
    '搜索文章...': 'Search posts...', '找不到您查询的内容: ${query}': 'No results for: ${query}',
    '找到 ${hits} 条结果': '${hits} results found', '找到 ${hits} 条结果（用时 ${time} 毫秒）': '${hits} results found (${time} ms)',
    '搜索标题、标签或正文': 'Search titles, tags or content', '输入你想找的内容': 'What are you looking for?',
    '关键词': 'Keywords', '输入关键词开始搜索。': 'Enter keywords to start searching.',
    '正在搜索……': 'Searching…', '没有找到匹配文章，试试其他关键词。': 'No matching posts. Try different keywords.',
    '搜索暂时不可用，请点击「搜索」重试。': 'Search is unavailable. Select Search to try again.',
    '搜索文章标题、标签和正文。多个关键词用空格分开，例如「AI 产品」。': 'Search titles, tags and content. Separate keywords with spaces, for example “AI 产品”. Posts are written in Chinese.',
    '打开导航菜单': 'Open navigation menu', '关闭导航菜单': 'Close navigation menu',
    '切换深色模式': 'Toggle dark mode', '联系与订阅': 'Contact and subscribe',
    '目录': 'Contents', '目录导航': 'Table of contents', '阅读模式': 'Reading mode',
    '回到顶部': 'Back to top', '单栏和双栏切换': 'Toggle sidebar',
    '进入阅读模式': 'Enter reading mode', '退出阅读模式': 'Exit reading mode',
    '复制成功': 'Copied', '复制失败': 'Copy failed', '置顶': 'Pinned',
    '留言板': 'Comments', '作者': 'Author', '本文作者：': 'Author:', '本文链接：': 'Post link:',
    '版权声明：': 'Copyright:', '本博客所有文章除特别声明外，均默认采用 %s 许可协议。': 'Unless otherwise stated, all posts are licensed under %s.',
    '刚刚': 'Just now', '分钟前': ' minutes ago', '小时前': ' hours ago',
    '天前': ' days ago', '个月前': ' months ago',
    '距离上次更新已经 %s 天了, 文章内容可能已经过时。': 'Last updated %s days ago. This post may be out of date.',
    '由': 'Powered by', '驱动': '', '主题': 'Theme',
    '银行金融科技 · Java · AI': 'Banking technology · Java · AI',
    '你好，我是 lmink': 'Hi, I’m lmink',
    '我是一个银行金融科技的技术人，关注 Java 开发，也在探索 AI 编程工具和产品开发。我用 AI 辅助自媒体创作、知识管理和编程，但希望把判断留在自己手里，把想法落实到具体行动中。': 'I work in banking technology, with an interest in Java development, AI coding tools and product development. I use AI to help with content creation, knowledge management and coding, while keeping my own judgment and putting ideas into practice.',
    '这里写些什么': 'What I write about', '技术与 AI': 'Technology and AI',
    '记录学习、技术踩坑，以及对产品、架构和技术选型的思考。': 'Learning notes, technical lessons, and reflections on products, architecture and technology choices.',
    '阅读与生活': 'Reading and life',
    '整理读书笔记，写下对选择、关系和成长的理解。': 'Book notes and reflections on choices, relationships and personal growth.',
    '动漫与故事': 'Anime and stories',
    '记录作品带来的感受，也观察自己看待故事的方式如何变化。': 'How stories make me feel, and how my way of seeing them changes over time.',
    '把训练中的动作要点和待改进问题留下来，方便下一次练习时回看。': 'Training techniques and things to improve, ready to revisit before the next practice.',
    '为什么写博客': 'Why I write',
    '记录在先，分享在后。我不想只留下一个结论，也想保留当时的问题、理解和还没想清楚的部分。以后回头看，能知道自己走过什么路，也能看见想法发生了怎样的变化。': 'First I keep a record; then I share it. I want to preserve not just conclusions, but also the questions, understanding and uncertainties behind them. Looking back helps me see where I have been and how my thinking has changed.',
    '如果其中一篇记录恰好能帮到你，那就更好了。': 'If one of these notes helps you along the way, all the better.',
    '邮箱 · lmink9418@gmail.com': 'Email · lmink9418@gmail.com', '订阅博客 →': 'Subscribe →',
    '不用反复打开博客，也可以收到新文章。把下面的订阅地址添加到你常用的 RSS 阅读器，就能集中查看更新。': 'Follow new posts without repeatedly visiting the blog. Add a feed address below to your RSS reader to see updates in one place.',
    'RSS 2.0：查看订阅文件': 'RSS 2.0: View feed', 'Atom：查看订阅文件': 'Atom: View feed',
    '两种格式包含相同的文章，选一个即可，不需要重复订阅。': 'Both formats contain the same posts. Choose either one; there is no need to subscribe twice.',
    '如何订阅': 'How to subscribe',
    '选择 RSS 2.0 或 Atom，复制对应的订阅地址。': 'Choose RSS 2.0 or Atom and copy its feed address.',
    '在 RSS 阅读器中选择「添加订阅」或「关注网站」。': 'Select “Add feed” or “Follow website” in your RSS reader.',
    '粘贴地址并确认，以后由阅读器检查更新。': 'Paste the address and confirm. Your reader will check for updates.',
    '订阅源包含最近 20 篇文章的摘要及原文链接。点击标题即可回到博客阅读全文；阅读器的更新速度取决于它自己的刷新设置。': 'The feed includes summaries and links for the latest 20 posts. Select a title to read the full post. Update timing depends on your reader’s refresh settings.',
    '直接打开订阅文件可能看到 XML 文本，这是正常的。订阅需要在 RSS 阅读器中完成，不是邮箱订阅。': 'Opening a feed directly may display XML text. This is normal: add it to an RSS reader. This is not an email subscription.'
  };
  function translate(text) {
    if (language !== 'en') return text;
    if (Object.prototype.hasOwnProperty.call(english, text)) return english[text];
    let match = text.match(/^找到 (\d+) 篇文章。$/);
    if (match) return `${match[1]} ${match[1] === '1' ? 'post' : 'posts'} found.`;
    match = text.match(/^(\d{4}) 年的归档$/);
    if (match) return `Archive for ${match[1]}`;
    match = text.match(/^距离上次更新已经 (.+) 天了, 文章内容可能已经过时。$/);
    if (match) return `Last updated ${match[1]} days ago. This post may be out of date.`;
    match = text.match(/^本博客所有文章除特别声明外，均默认采用 (.+) 许可协议。$/);
    if (match) return `Unless otherwise stated, all posts are licensed under ${match[1]}.`;
    return text;
  }
  window.lminkI18n = { language, translate };
  if (language === 'en' && window.ASYNC_CONFIG) {
    ASYNC_CONFIG.typed_text = ASYNC_CONFIG.typed_text.map(translate);
    Object.keys(ASYNC_CONFIG.i18n).forEach(key => {
      ASYNC_CONFIG.i18n[key] = translate(ASYNC_CONFIG.i18n[key]);
    });
  }

  function init() {
    const button = document.querySelector('.lmink-language-toggle');
    button.hidden = false;
    button.querySelector('.lmink-language-label').textContent = language === 'en' ? '中文' : 'EN';
    button.setAttribute('aria-label', language === 'en' ? '切换为中文' : 'Switch to English');
    button.addEventListener('click', () => {
      const url = new URL(location.href);
      url.searchParams.set('lang', language === 'en' ? 'zh-CN' : 'en');
      location.assign(url.href);
    });
    const protectedSelectors = ['script', 'style', 'pre', 'code', '.trm-typed-text', '.lmink-profile-alias', '.lmink-card-title', '.lmink-card-summary', '.lmink-related li', '.lmink-search-results', '.trm-timeline h6', '.trm-publication', '.toc-link', '.lmink-reading-header h1', '.lmink-toc'];
    if (window.PAGE_CONFIG && PAGE_CONFIG.isPost) protectedSelectors.push('#article-container', '.trm-banner h1');
    document.querySelectorAll('.lmink-card-title, .lmink-card-summary, .lmink-related li, .lmink-search-results, .lmink-profile-alias').forEach(el => { el.lang = 'zh-CN'; });
    if (window.PAGE_CONFIG && PAGE_CONFIG.isPost) document.querySelector('#article-container')?.setAttribute('lang', 'zh-CN');
    if (language !== 'en') return;
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (node.parentElement.closest(protectedSelectors.join(','))) continue;
      const source = node.textContent.trim();
      // Footer versions are part of the surrounding text node.
      const translated = /^驱动 v/.test(source) ? source.replace(/^驱动 /, '') : /^主题 -/.test(source) ? source.replace(/^主题/, 'Theme') : translate(source);
      if (translated !== source) node.textContent = node.textContent.replace(source, translated);
    }
    document.querySelectorAll('[title], [aria-label], [placeholder]').forEach(el => {
      if (el.closest(protectedSelectors.join(','))) return;
      for (const attr of ['title', 'aria-label', 'placeholder']) {
        if (el.hasAttribute(attr)) el.setAttribute(attr, translate(el.getAttribute(attr)));
      }
    });
    if (!PAGE_CONFIG.isPost) document.title = translate(document.title);
    // Carry the choice across pages even when browser storage is unavailable.
    document.querySelectorAll('a[href]').forEach(link => {
      const raw = link.getAttribute('href');
      const url = new URL(link.href, location.href);
      if (url.origin === location.origin && !raw.startsWith('#') && /\/$|\.html$/.test(url.pathname)) {
        url.searchParams.set('lang', 'en');
        link.href = url.href;
      }
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
