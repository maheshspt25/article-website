const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const newTools = [
    {
      name: 'GPA & CGPA Calculator',
      slug: 'gpa-calculator',
      category: 'Education & Students',
      description: 'Calculate semester GPA, cumulative CGPA, and equivalent percentage for university exams.',
      icon: 'Calculator',
      isFeatured: true
    },
    {
      name: 'Pomodoro Study & Focus Timer',
      slug: 'pomodoro-timer',
      category: 'Education & Productivity',
      description: 'Structured 25-minute deep focus timer with short break tracking for students and professionals.',
      icon: 'Clock',
      isFeatured: true
    },
    {
      name: 'ATS Resume Keyword Analyzer',
      slug: 'resume-keyword-analyzer',
      category: 'Career & Professional',
      description: 'Analyze resume text against target job descriptions to calculate ATS keyword match percentage.',
      icon: 'FileSearch',
      isFeatured: true
    },
    {
      name: 'Monthly Salary & Tax Calculator',
      slug: 'salary-calculator',
      category: 'Finance & Career',
      description: 'Calculate monthly net take-home in-hand salary after EPF, PT, and Income Tax (New Regime).',
      icon: 'IndianRupee',
      isFeatured: true
    },
    {
      name: 'Password Generator & Security Tester',
      slug: 'password-generator',
      category: 'Security & Utility',
      description: 'Generate high-entropy secure passwords with instant bit security score and 1-click copy.',
      icon: 'KeyRound',
      isFeatured: true
    },
    {
      name: 'Text & Code Diff Comparator',
      slug: 'text-diff-tool',
      category: 'Developer & Writing',
      description: 'Compare two text documents or code snippets side-by-side to highlight line additions and changes.',
      icon: 'GitCompare',
      isFeatured: true
    },
    {
      name: 'Markdown Live Editor & Converter',
      slug: 'markdown-editor',
      category: 'Writing & Developer',
      description: 'Write markdown notes and READMEs with real-time HTML preview and 1-click export.',
      icon: 'FileCode',
      isFeatured: true
    }
  ];

  for (const t of newTools) {
    await prisma.tool.upsert({
      where: { slug: t.slug },
      update: t,
      create: t
    });
    console.log(`Seeded tool: ${t.name} (${t.slug})`);
  }
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
