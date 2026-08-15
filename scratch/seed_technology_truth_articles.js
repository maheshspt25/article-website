const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedTechnologyTruthArticles() {
  console.log('🌱 Seeding authoritative Real-Truth Technology Guides...');

  let author = await prisma.author.findFirst();
  if (!author) {
    author = await prisma.author.create({
      data: {
        name: 'InfoMitra Tech & Developer Desk',
        slug: 'tech-developer-desk',
        designation: 'Senior Technical Editorial Staff',
        bio: 'Fact-checked technical editorial desk drawing directly from Canonical Ubuntu, React core documentation, Python Software Foundation, and Google Developers.'
      }
    });
  }

  const articles = [
    {
      title: 'Generative AI Architecture: RAG (Retrieval-Augmented Generation) & LLM Fine-Tuning Guide',
      slug: 'generative-ai-llm-fine-tuning-rag-architecture-guide',
      summary: 'Deep-dive architectural guide on Retrieval-Augmented Generation (RAG), vector embeddings (Pinecone, Qdrant), vector search, and LLM fine-tuning.',
      categorySection: 'technology',
      subCategory: 'ai',
      readingTime: '9 min read',
      content: `<h2>Understanding Retrieval-Augmented Generation (RAG) Architecture</h2>
<p>Retrieval-Augmented Generation (RAG) connects Large Language Models (LLMs) to authoritative external knowledge bases, eliminating hallucinations and ensuring accurate domain-specific responses.</p>

<h3>Key RAG System Components</h3>
<ul>
  <li><strong>Document Ingestion &amp; Chunking:</strong> Parse raw Markdown/HTML/PDF documents into 512 to 1024 token chunks with 10% overlap.</li>
  <li><strong>Vector Embeddings:</strong> Generate high-dimensional vector representations using embedding models (e.g. OpenAI text-embedding-3 or HuggingFace BGE).</li>
  <li><strong>Vector Database Storage:</strong> Store vectors in Qdrant, Pinecone, or pgvector for sub-10ms cosine similarity searches.</li>
  <li><strong>Context-Augmented Prompting:</strong> Inject top-k relevant document chunks into the LLM system prompt as verified context.</li>
</ul>`,
      stepByStepJson: JSON.stringify([
        { step: 1, title: 'Chunk Source Documents', description: 'Split large documentation files into 512-token chunks with 50-token overlap.' },
        { step: 2, title: 'Generate Vector Embeddings', description: 'Pass text chunks through an embedding model to compute dense vector arrays.' },
        { step: 3, title: 'Query Vector Index via Cosine Distance', description: 'Search the vector database for nearest neighbor chunks matching user search queries.' },
        { step: 4, title: 'Synthesize LLM Response with Sources', description: 'Pass retrieved chunks + user prompt to the LLM with strict instructions to cite source metadata.' }
      ]),
      faqJson: JSON.stringify([
        { q: 'What is the primary advantage of RAG over full LLM fine-tuning?', a: 'RAG provides real-time data updating without expensive GPU retrain cycles and provides verifiable source links for every response.' },
        { q: 'Which vector database offers native open-source self-hosting?', a: 'Qdrant and PostgreSQL with the pgvector extension provide high-performance self-hosted vector indexing.' }
      ]),
      sourcesJson: JSON.stringify([
        { title: 'HuggingFace AI & RAG Documentation', url: 'https://huggingface.co/docs', authority: 'HuggingFace' },
        { title: 'PyTorch AI Framework Docs', url: 'https://pytorch.org/', authority: 'PyTorch Foundation' }
      ]),
      disclaimer: 'Technical Disclaimer: AI system architectures require proper API rate limiting, vector index backups, and hallucination evaluation benchmarks.'
    },

    {
      title: 'React 19 Architecture: Server Components, Server Actions & React Compiler Guide',
      slug: 'react-19-server-components-actions-compiler-guide',
      summary: 'Comprehensive guide to React 19 architecture: React Server Components (RSC), async Server Actions, automatic memoization via React Compiler, and use() hook.',
      categorySection: 'technology',
      subCategory: 'programming',
      readingTime: '8 min read',
      content: `<h2>Core Architectural Shift in React 19</h2>
<p>React 19 introduces full stabilization of <strong>React Server Components (RSC)</strong>, async <strong>Server Actions</strong>, and the <strong>React Compiler</strong> (forget manual useMemo and useCallback).</p>

<h3>Key Features in React 19</h3>
<ul>
  <li><strong>React Compiler:</strong> Automatically memoizes JSX sub-trees and variables, rendering <code>useMemo</code> and <code>useCallback</code> redundant.</li>
  <li><strong>Server Actions:</strong> Execute server-side database mutations directly from client forms using standard HTML form actions.</li>
  <li><strong>use() Hook:</strong> Read promises and context conditionally inside components during render.</li>
  <li><strong>Asset Loading &amp; Resource Preloading:</strong> Native support for <code>preload</code>, <code>preinit</code>, and script async loading.</li>
</ul>`,
      stepByStepJson: JSON.stringify([
        { step: 1, title: 'Enable React 19 Compiler', description: 'Install babel-plugin-react-compiler to enable automatic component memoization.' },
        { step: 2, title: 'Define Async Server Actions', description: 'Mark server functions with "use server" to execute direct database queries from UI forms.' },
        { step: 3, title: 'Unwrap Promises with use()', description: 'Pass promises from Server Components to Client Components and read them using the use() hook wrapped in Suspense.' }
      ]),
      faqJson: JSON.stringify([
        { q: 'Do I still need useMemo and useCallback in React 19?', a: 'No, the React Compiler automatically optimizes re-renders and memoization at compile time.' },
        { q: 'What is the benefit of React Server Components?', a: 'Server Components reduce client JavaScript bundle size by rendering component logic on the server without sending code to the browser.' }
      ]),
      sourcesJson: JSON.stringify([
        { title: 'React 19 Official Documentation', url: 'https://react.dev/', authority: 'React Core Team / Meta' }
      ]),
      disclaimer: 'Developer Note: Verify third-party library compatibility before upgrading production apps to React 19.'
    },

    {
      title: 'Ubuntu 24.04 LTS Server Hardening & Security Configuration Guide',
      slug: 'ubuntu-2404-lts-server-hardening-security-guide',
      summary: 'Production server hardening guide for Ubuntu 24.04 LTS (Noble Numbat): SSH key authentication, UFW firewall rules, Fail2ban, and automatic security updates.',
      categorySection: 'technology',
      subCategory: 'software',
      readingTime: '8 min read',
      content: `<h2>Hardening Ubuntu 24.04 LTS (Noble Numbat) for Production</h2>
<p>Ubuntu 24.04 LTS is Canonical's long-term support server release. Securing a Linux server requires implementing multi-layered defense-in-depth protocols.</p>

<h3>Essential Server Hardening Steps</h3>
<ul>
  <li><strong>SSH Key Authentication:</strong> Disable password authentication and root login in <code>/etc/ssh/sshd_config</code>.</li>
  <li><strong>Uncomplicated Firewall (UFW):</strong> Restrict incoming network traffic to only essential ports (22, 80, 443).</li>
  <li><strong>Fail2ban Intrusion Prevention:</strong> Automatically ban IP addresses that exhibit malicious brute-force login behavior.</li>
  <li><strong>Unattended Upgrades:</strong> Enable automatic security patches via <code>unattended-upgrades</code> package.</li>
</ul>`,
      stepByStepJson: JSON.stringify([
        { step: 1, title: 'Disable Root Login & Password Auth', description: 'Set PermitRootLogin no and PasswordAuthentication no in /etc/ssh/sshd_config.' },
        { step: 2, title: 'Configure UFW Firewall Rules', description: 'Run ufw default deny incoming, ufw allow 22/tcp, ufw allow 80/tcp, ufw allow 443/tcp, and ufw enable.' },
        { step: 3, title: 'Install & Enable Fail2ban', description: 'Run apt install fail2ban and configure jail.local to monitor sshd logs.' }
      ]),
      faqJson: JSON.stringify([
        { q: 'How long is Canonical support for Ubuntu 24.04 LTS?', a: 'Ubuntu 24.04 LTS receives 5 years of standard security updates (up to 2029) and 12 years with Ubuntu Pro (Expanded Security Maintenance).' }
      ]),
      sourcesJson: JSON.stringify([
        { title: 'Canonical Ubuntu Server Documentation', url: 'https://ubuntu.com/server/docs', authority: 'Canonical Ubuntu' }
      ]),
      disclaimer: 'Sysadmin Note: Test firewall and SSH configurations in a secondary terminal before closing your active root session.'
    },

    {
      title: 'Android 15 & iOS 18 Mobile App Security & Privacy Permissions Guide',
      slug: 'android-15-ios-18-mobile-app-security-permissions-guide',
      summary: 'Modern mobile app security standards for Android 15 & iOS 18: scoped storage, partial photo picker, background location limits, and biometric auth.',
      categorySection: 'technology',
      subCategory: 'mobile',
      readingTime: '7 min read',
      content: `<h2>Privacy &amp; Permission Architecture in Android 15 &amp; iOS 18</h2>
<p>Both Google Android 15 and Apple iOS 18 enforce strict user privacy protections, mandating zero-trust permission models for mobile applications.</p>`,
      stepByStepJson: JSON.stringify([
        { step: 1, title: 'Implement Scoped Photo Picker', description: 'Use photo picker APIs to request individual photo access rather than full media library permissions.' },
        { step: 2, title: 'Enforce Biometric Authentication', description: 'Use Android BiometricPrompt and iOS LocalAuthentication APIs for secure user verification.' }
      ]),
      faqJson: JSON.stringify([
        { q: 'Why is full media library permission restricted in modern OS releases?', a: 'Both Android 15 and iOS 18 restrict broad storage access to protect user photos and metadata from unauthorized background harvesting.' }
      ]),
      sourcesJson: JSON.stringify([
        { title: 'Android Developers Security Portal', url: 'https://developer.android.com/', authority: 'Google Android' },
        { title: 'Apple Developer Security Documentation', url: 'https://developer.apple.com/', authority: 'Apple Inc.' }
      ]),
      disclaimer: 'Mobile Security Note: Regularly update app SDK target versions to maintain Play Store and App Store compliance.'
    },

    {
      title: 'Docker Containers vs. WebAssembly (WASI): Server Microservices Comparison',
      slug: 'docker-containers-vs-webassembly-wasi-architecture-guide',
      summary: 'Comparative architectural analysis between Docker OCI containerization and WebAssembly System Interface (WASI) sandboxing for cloud microservices.',
      categorySection: 'technology',
      subCategory: 'software',
      readingTime: '8 min read',
      content: `<h2>Docker OCI Containers vs. WebAssembly (WASI)</h2>
<p>While Docker OCI containers package complete OS file systems, WebAssembly (WASM) with WASI (WebAssembly System Interface) provides a lightweight, language-agnostic bytecode sandbox operating directly on host runtimes.</p>`,
      stepByStepJson: JSON.stringify([
        { step: 1, title: 'Evaluate Startup Latency Needs', description: 'WASM modules start in sub-milliseconds (<5ms), making them superior for serverless cold-start reduction.' },
        { step: 2, title: 'Assess System Call Requirements', description: 'Docker containers provide full Linux kernel system calls, while WASI exposes strict capability-based APIs.' }
      ]),
      faqJson: JSON.stringify([
        { q: 'Is WebAssembly replacing Docker?', a: 'No, WebAssembly complements Docker. WASM excels for micro-services and edge functions, while Docker remains the standard for complex legacy applications.' }
      ]),
      sourcesJson: JSON.stringify([
        { title: 'WASM & Bytecode Alliance Documentation', url: 'https://bytecodealliance.org/', authority: 'Bytecode Alliance' },
        { title: 'Docker Official Documentation', url: 'https://docs.docker.com/', authority: 'Docker Inc.' }
      ]),
      disclaimer: 'Architecture Note: Select technology based on application dependency requirements and team deployment experience.'
    },

    {
      title: 'Python 3.12+ Performance Optimizations, Type Annotations & Asyncio Practices',
      slug: 'python-312-performance-typing-asyncio-best-practices',
      summary: 'Modern Python 3.12+ programming guide: specialized adaptive interpreter performance gains, strict type hints (PEP 695), and asyncio task groups.',
      categorySection: 'technology',
      subCategory: 'programming',
      readingTime: '7 min read',
      content: `<h2>Key Innovations in Modern Python 3.12+</h2>
<p>Python 3.12+ delivers major performance improvements through specialized adaptive interpreter optimization, reduced memory overhead, and enhanced type parameter syntax (PEP 695).</p>`,
      stepByStepJson: JSON.stringify([
        { step: 1, title: 'Adopt Generic Type Syntax (PEP 695)', description: 'Use new type statement and class MyClass[T]: syntax for cleaner generic type annotations.' },
        { step: 2, title: 'Use asyncio.TaskGroup for Concurrent I/O', description: 'Replace asyncio.gather with asyncio.TaskGroup context managers for safe exception handling.' }
      ]),
      faqJson: JSON.stringify([
        { q: 'How much faster is Python 3.12 compared to Python 3.10?', a: 'Python 3.12 shows average performance speedups of 15% to 25% over Python 3.10 on standard benchmark suites.' }
      ]),
      sourcesJson: JSON.stringify([
        { title: 'Python Software Foundation Release Notes', url: 'https://docs.python.org/3/', authority: 'Python Software Foundation (PSF)' }
      ]),
      disclaimer: 'Programming Note: Use virtual environments (venv) to isolate package dependencies.'
    },

    {
      title: 'Core Web Vitals Optimization in Next.js 14+: LCP, CLS & INP Performance Guide',
      slug: 'core-web-vitals-nextjs-performance-optimization-guide',
      summary: 'Step-by-step guide to achieving 100/100 Google Lighthouse scores: LCP image optimization, CLS prevention, and Interaction to Next Paint (INP) response tuning.',
      categorySection: 'technology',
      subCategory: 'apps',
      readingTime: '8 min read',
      content: `<h2>Mastering Google Core Web Vitals (LCP, CLS, INP)</h2>
<p>Google evaluates web user experience using three Core Web Vitals metrics: <strong>Largest Contentful Paint (LCP &lt; 2.5s)</strong>, <strong>Cumulative Layout Shift (CLS &lt; 0.1)</strong>, and <strong>Interaction to Next Paint (INP &lt; 200ms)</strong>.</p>`,
      stepByStepJson: JSON.stringify([
        { step: 1, title: 'Optimize Hero LCP Images', description: 'Use next/image with priority prop and WebP/AVIF formats for above-the-fold hero banners.' },
        { step: 2, title: 'Reserve Container Dimensions for CLS', description: 'Define fixed aspect ratio CSS aspect-ratio properties on dynamic image and ad containers.' }
      ]),
      faqJson: JSON.stringify([
        { q: 'What replaced FID (First Input Delay) in Core Web Vitals?', a: 'Interaction to Next Paint (INP) replaced FID, measuring the latency of all user interactions throughout the full page lifecycle.' }
      ]),
      sourcesJson: JSON.stringify([
        { title: 'Google Web.dev Core Web Vitals Guide', url: 'https://web.dev/vitals/', authority: 'Google Chrome Web Team' }
      ]),
      disclaimer: 'SEO Note: Test page metrics using real user field data (Chrome User Experience Report - CrUX).'
    },

    {
      title: 'Git & GitHub Enterprise DevOps Workflow: Branching & CI/CD Actions Guide',
      slug: 'git-github-branching-ci-cd-devops-workflow-guide',
      summary: 'Production Git branching strategies (GitHub Flow vs Trunk-Based Development), pull request reviews, and automated GitHub Actions CI/CD deployment pipelines.',
      categorySection: 'technology',
      subCategory: 'programming',
      readingTime: '7 min read',
      content: `<h2>Modern Git &amp; GitHub DevOps Workflows</h2>
<p>High-velocity engineering teams rely on automated CI/CD workflows and disciplined Git branching strategies to ship code safely to production.</p>`,
      stepByStepJson: JSON.stringify([
        { step: 1, title: 'Enforce Branch Protection Rules', description: 'Require pull request reviews, linear commit history, and passing status checks on main branch.' },
        { step: 2, title: 'Write GitHub Actions CI Pipeline', description: 'Automate linting, unit tests, and production build checks on every git push.' }
      ]),
      faqJson: JSON.stringify([
        { q: 'Why is Trunk-Based Development favored by continuous deployment teams?', a: 'Trunk-based development avoids long-lived merge conflicts by encouraging short-lived feature branches merged daily.' }
      ]),
      sourcesJson: JSON.stringify([
        { title: 'GitHub Docs CI/CD Actions Documentation', url: 'https://docs.github.com/en/actions', authority: 'GitHub / Microsoft' }
      ]),
      disclaimer: 'DevOps Note: Store sensitive API tokens and credentials in GitHub Encrypted Secrets.'
    }
  ];

  for (const art of articles) {
    await prisma.article.upsert({
      where: { slug: art.slug },
      update: {
        ...art,
        authorId: author.id,
        published: true,
        featured: true
      },
      create: {
        ...art,
        authorId: author.id,
        published: true,
        featured: true
      }
    });
    console.log(`✅ Seeded Real-Truth Technology Guide: ${art.title} (${art.subCategory}/${art.slug})`);
  }
}

seedTechnologyTruthArticles()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
