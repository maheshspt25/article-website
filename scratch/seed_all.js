const { execSync } = require('child_process');

console.log('🌱 Initiating Full Master Data Seeding Sequence for InfoMitra Platform...\n');

const seedFiles = [
  'prisma/seed.ts',
  'scratch/seed_all_additional_tools.js',
  'scratch/seed_new_tools.js',
  'scratch/seed_health_topics.js',
  'scratch/seed_flagship_fitness_guide.js',
  'scratch/seed_finance_truth_articles.js',
  'scratch/seed_technology_truth_articles.js',
  'scratch/enrich_all_technology_guides.js',
  'scratch/rewrite_all_tech_articles_authentic.js',
  'scratch/perfect_mobile_article.js'
];

for (const file of seedFiles) {
  console.log(`▶ Running seed file: ${file}...`);
  try {
    if (file.endsWith('.ts')) {
      execSync(`npx ts-node -O '{"module":"CommonJS"}' ${file}`, { stdio: 'inherit' });
    } else {
      execSync(`node ${file}`, { stdio: 'inherit' });
    }
    console.log(`✅ Completed: ${file}\n`);
  } catch (error) {
    console.error(`❌ Error seeding ${file}:`, error.message);
  }
}

console.log('🎉 Master Database Seeding Completed Successfully!');
