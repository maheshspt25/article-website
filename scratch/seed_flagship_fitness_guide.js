const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedFlagshipGuide() {
  console.log('🌱 Seeding Flagship Health Guide: Daily Fitness Guidelines...');

  let author = await prisma.author.findFirst();
  if (!author) {
    author = await prisma.author.create({
      data: {
        name: 'InfoMitra Health & Wellness Desk',
        slug: 'health-wellness-desk',
        designation: 'Certified Medical & Fitness Editorial Team',
        bio: 'Fact-checked wellness research desk drawing directly from WHO, ICMR-NIN, and Ministry of Health gazettes.'
      }
    });
  }

  const guide = {
    title: 'Daily Fitness Guidelines: 7 Evidence-Based Habits for Lifelong Health',
    slug: 'daily-fitness-guidelines-7-habits-lifelong-health',
    summary: 'Master the 7 evidence-based daily fitness and metabolic habits recommended by WHO and ICMR-NIN for lifelong physical endurance, cardiac health, and mental longevity.',
    categorySection: 'health',
    subCategory: 'fitness',
    readingTime: '10 min read',
    content: `<h2>The Science of Lifelong Health &amp; Daily Fitness Habits</h2>
<p>Achieving sustainable, lifelong health requires transitioning from short-term intensity cycles to consistent daily habits. According to landmark publications from the <strong>World Health Organization (WHO)</strong> and the <strong>2024 ICMR-NIN Dietary &amp; Physical Activity Guidelines for Indians</strong>, maintaining 7 foundational physical and metabolic habits drastically reduces the incidence of chronic non-communicable diseases (NCDs) such as hypertension, type-2 diabetes, cardiovascular events, and metabolic syndrome.</p>

<h3>The 7 Evidence-Based Fitness Pillars</h3>
<ol>
  <li><strong>Daily Moderate Movement (150-300 Mins/Week):</strong> Engage in at least 30 to 45 minutes of brisk walking, swimming, or cycling daily to optimize arterial compliance and lipid profiles.</li>
  <li><strong>Progressive Resistance Training (2-3 Days/Week):</strong> Preserve lean muscular tissue, bone mineral density, and basal metabolic rate (BMR) through bodyweight or resistance training.</li>
  <li><strong>The 50% Whole Food Plate Rule:</strong> Allocate half of every main meal to fresh vegetables, leafy greens, and whole fruits rich in bioavailable micronutrients and dietary fiber.</li>
  <li><strong>Circadian Alignment &amp; Sleep Hygiene (7-9 Hours):</strong> Maintain regular sleep-wake windows and turn off electronic displays 60 minutes before bedtime to maximize growth hormone repair.</li>
  <li><strong>Active Sedentary Interruptions:</strong> Break up continuous desk sitting every 60 minutes with 3 to 5 minutes of standing, walking, or mobility stretches.</li>
  <li><strong>Hydration &amp; Low-Sodium Maintenance:</strong> Drink 2.5 to 3.0 Liters of water daily while limiting total dietary salt intake to under 5 grams (1 teaspoon).</li>
  <li><strong>Mindfulness &amp; Autonomic Stress Regulation:</strong> Practice daily breathing exercises or cognitive decompression to lower basal cortisol and resting heart rate.</li>
</ol>

<h3>Metabolic Impact of Daily Physical Activity</h3>
<p>Regular daily movement enhances insulin sensitivity by increasing GLUT4 transporter translocation to skeletal muscle cell membranes independent of insulin action. This regulatory pathway plays a crucial role in maintaining blood glucose homeostasis throughout life.</p>`,
    stepByStepJson: JSON.stringify([
      { step: 1, title: 'Habit 1: Morning Light & Hydration', description: 'Drink 500ml of water upon waking and get 10-15 minutes of direct morning sunlight to anchor your circadian clock.' },
      { step: 2, title: 'Habit 2: 30-Minute Brisk Cardio', description: 'Perform 30 minutes of moderate-intensity cardio (brisk walking at 5-6 km/h) to elevate resting metabolic rate.' },
      { step: 3, title: 'Habit 3: Non-Sedentary Movement Micro-Breaks', description: 'Set an hourly timer during desk work to stand up, walk, and perform 10 bodyweight squats every 60 minutes.' },
      { step: 4, title: 'Habit 4: Progressive Resistance Workouts', description: 'Dedicate 30 minutes 3 times per week to push-ups, squats, rows, and lunges to stimulate muscle protein synthesis.' },
      { step: 5, title: 'Habit 5: Whole-Food Fiber & Protein Nutrition', description: 'Structure every meal with a 50% vegetable portion, 25% lean protein, and 25% complex unpolished grains.' },
      { step: 6, title: 'Habit 6: Evening Screen Cut-Off at 9:00 PM', description: 'Enable night-mode filters and store mobile devices away from the bed to encourage natural melatonin release.' },
      { step: 7, title: 'Habit 7: 7-9 Hours Restorative Sleep', description: 'Sleep in a dark, quiet, cool bedroom (18-22°C) to support deep slow-wave physical recovery.' }
    ]),
    faqJson: JSON.stringify([
      { q: 'How long does it take for these 7 habits to become automatic?', a: 'Clinical research indicates that forming a health habit requires between 21 and 66 days of continuous daily practice depending on behavioral complexity.' },
      { q: 'Can 10,000 daily steps replace structured resistance training?', a: 'While 10,000 steps provides exceptional cardiovascular benefit, resistance training is required to preserve muscle mass, joint stability, and bone density.' },
      { q: 'What is the minimum weekly exercise duration recommended by WHO?', a: 'WHO guidelines recommend a minimum of 150 minutes of moderate-intensity or 75 minutes of vigorous-intensity aerobic exercise per week.' },
      { q: 'How does daily walking reduce blood glucose spikes?', a: 'Brisk walking activates muscle contraction-mediated glucose uptake in muscle cells, lowering blood sugar levels after meals.' },
      { q: 'Why is salt restriction capped at 5 grams per day by ICMR?', a: 'Excess sodium increases systemic arterial pressure. Limiting salt to 5g/day reduces hypertension risk and kidney strain.' },
      { q: 'What is the ideal bedroom environment for restorative sleep?', a: 'A quiet, dark, well-ventilated room with a temperature between 18-22°C promotes optimal slow-wave and REM sleep.' },
      { q: 'How can working professionals maintain exercise consistency?', a: 'Schedule workouts as non-negotiable appointments in your calendar, ideally first thing in the morning before daily work distractions arise.' }
    ]),
    sourcesJson: JSON.stringify([
      { title: 'WHO Physical Activity Guidelines & Health Recommendations', url: 'https://www.who.int/news-room/fact-sheets/detail/physical-activity', authority: 'World Health Organization (WHO)' },
      { title: 'ICMR-NIN Dietary & Fitness Guidelines for Indians (2024)', url: 'https://nin.res.in/', authority: 'Indian Council of Medical Research (ICMR)' },
      { title: 'NIH National Institute on Aging Fitness Framework', url: 'https://www.nia.nih.gov/health/exercise-and-physical-activity', authority: 'National Institutes of Health (NIH)' }
    ]),
    disclaimer: 'Medical & Health Disclaimer: This guide is provided for educational purposes. Consult a licensed healthcare provider prior to starting a new fitness or dietary program if you have existing health conditions.'
  };

  await prisma.article.upsert({
    where: { slug: guide.slug },
    update: {
      ...guide,
      authorId: author.id,
      published: true,
      featured: true
    },
    create: {
      ...guide,
      authorId: author.id,
      published: true,
      featured: true
    }
  });

  console.log(`✅ Seeded Master Flagship Guide: ${guide.title}`);
}

seedFlagshipGuide()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
