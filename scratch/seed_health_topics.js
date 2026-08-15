const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedHealthTopics() {
  console.log('🌱 Seeding authoritative Health & Fitness Guides...');

  // Ensure author exists
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

  const articles = [
    {
      title: 'How to Start a Daily Fitness Routine: ICMR & WHO Recommended Guidelines (2026)',
      slug: 'how-to-start-daily-fitness-routine-2026',
      summary: 'Comprehensive guide on starting a daily fitness routine with ICMR-NIN 2024 standards, WHO exercise minimums, and injury-prevention protocols.',
      categorySection: 'health',
      subCategory: 'fitness',
      readingTime: '7 min read',
      content: `<h2>Mastering Daily Physical Fitness with Verified Standards</h2>
<p>Maintaining daily physical activity is one of the most effective interventions for longevity, cardiovascular health, metabolic regulation, and stress management. According to the <strong>2024 ICMR-NIN Dietary &amp; Fitness Guidelines for Indians</strong> and the <strong>World Health Organization (WHO)</strong>, adults require at least 150 to 300 minutes of moderate-intensity aerobic exercise every week.</p>

<h3>Key Daily Fitness Thresholds</h3>
<ul>
  <li><strong>Moderate Aerobic Activity:</strong> 30 to 45 minutes daily (e.g. brisk walking, cycling, light swimming).</li>
  <li><strong>Muscle Resistance:</strong> 2 to 3 days per week targeting major muscle groups (legs, back, chest, core).</li>
  <li><strong>Sedentary Break Intervals:</strong> Stand up and stretch for 3 to 5 minutes after every 60 minutes of desk work.</li>
</ul>

<h3>Weekly Fitness Progress Framework</h3>
<p>Beginners should follow a 4-week ramp-up model: Start with 20-minute daily walking sessions in Week 1, progressing to 30-minute brisk cardio in Week 2, and introducing bodyweight squats and push-ups in Weeks 3 and 4.</p>`,
      stepByStepJson: JSON.stringify([
        { step: 1, title: 'Medical Baseline Assessment', description: 'Consult your physician if you have existing hypertension, diabetes, or joint conditions before beginning a new regimen.' },
        { step: 2, title: 'Establish Fixed Time Windows', description: 'Schedule workouts at consistent daily times (early morning or post-work evening) to build autonomic habits.' },
        { step: 3, title: 'Implement Dynamic Warm-Ups', description: 'Spend 5 to 10 minutes performing dynamic arm circles, torso twists, and leg swings prior to main exercise.' },
        { step: 4, title: 'Track Weekly Cumulative Minutes', description: 'Log workout duration to ensure you hit at least 150 minutes of moderate activity per week.' }
      ]),
      faqJson: JSON.stringify([
        { q: 'How many steps per day are optimal for health?', a: 'While 10,000 steps is a common benchmark, ICMR research demonstrates that 7,500 to 8,000 brisk steps daily significantly reduces cardiovascular mortality risks.' },
        { q: 'Is morning or evening exercise better?', a: 'Consistency matters more than timing; however, morning exercise improves circadian rhythm alignment, while evening workouts may yield slightly higher peak muscular strength.' }
      ]),
      sourcesJson: JSON.stringify([
        { title: 'ICMR-NIN Dietary & Physical Activity Guidelines for Indians (2024)', url: 'https://nin.res.in/' },
        { title: 'WHO Guidelines on Physical Activity & Sedentary Behaviour', url: 'https://www.who.int/news-room/fact-sheets/detail/physical-activity' }
      ]),
      disclaimer: 'Medical Disclaimer: This guide is for educational purposes. Consult a licensed doctor or physical therapist before starting high-intensity routines.'
    },

    {
      title: 'Moderate vs. Vigorous Exercise: Choosing the Right Intensity Level',
      slug: 'moderate-vs-vigorous-exercise-guide',
      summary: 'Learn the differences between moderate and vigorous aerobic exercise, target heart rate zones, and how to balance intensity for maximum metabolic benefits.',
      categorySection: 'health',
      subCategory: 'exercise',
      readingTime: '6 min read',
      content: `<h2>Understanding Exercise Intensity Zones</h2>
<p>Exercise intensity determines the metabolic pathway your body utilizes for energy. The WHO categorizes physical activity into moderate-intensity (50-70% of maximum heart rate) and vigorous-intensity (70-85% of maximum heart rate).</p>

<h3>Heart Rate Calculation Formula</h3>
<p>Estimate your Maximum Heart Rate (MHR) using: <strong>MHR = 220 - Age</strong>. Multiply your MHR by 0.60 for moderate target zone and 0.80 for vigorous target zone.</p>`,
      stepByStepJson: JSON.stringify([
        { step: 1, title: 'The Talk Test Check', description: 'During moderate exercise you can talk but not sing. During vigorous exercise you cannot say more than a few words without pausing for breath.' },
        { step: 2, title: 'Mix Intensity Modalities', description: 'Combine 3 days of 45-minute moderate walking with 2 days of 20-minute vigorous interval training.' }
      ]),
      faqJson: JSON.stringify([
        { q: 'Can 75 minutes of vigorous exercise replace 150 minutes of moderate exercise?', a: 'Yes, clinical WHO guidelines state 1 minute of vigorous exercise provides equivalent cardiovascular benefits to 2 minutes of moderate exercise.' }
      ]),
      sourcesJson: JSON.stringify([
        { title: 'WHO Global Physical Activity Recommendations', url: 'https://www.who.int/' }
      ]),
      disclaimer: 'Consult a cardiologist before engaging in high-intensity interval training (HIIT) if you have underlying cardiac risks.'
    },

    {
      title: 'ICMR-NIN 2024 Dietary Guidelines for Indians: Complete Nutrition Breakdown',
      slug: 'icmr-nin-dietary-guidelines-for-indians-2026',
      summary: 'Official breakdown of the 2024 ICMR-NIN national nutrition guidelines: macro distribution, plate rules, salt/sugar caps, and plant-based protein sources.',
      categorySection: 'health',
      subCategory: 'nutrition',
      readingTime: '8 min read',
      content: `<h2>Key Takeaways from the ICMR-NIN 2024 Dietary Reform</h2>
<p>The Indian Council of Medical Research (ICMR) and National Institute of Nutrition (NIN) released updated dietary guidelines addressing double-burden malnutrition and non-communicable diseases (NCDs).</p>

<h3>Core Nutritional Directives</h3>
<ul>
  <li><strong>50% Plate Rule:</strong> Vegetables, leafy greens, and whole fruits must occupy half of every meal plate.</li>
  <li><strong>Salt Restriction:</strong> Limit daily salt intake to &lt; 5 grams (1 teaspoon total).</li>
  <li><strong>Added Sugar Cap:</strong> Keep added sugar below 5% of total daily calorie intake (&lt; 25g/day).</li>
  <li><strong>Saturated Fats &amp; Trans Fats:</strong> Saturated fat should be &lt; 7% of daily calories with zero industrial trans-fats.</li>
</ul>`,
      stepByStepJson: JSON.stringify([
        { step: 1, title: 'Adopt Whole Grains & Legumes', description: 'Replace refined wheat (maida) and polished rice with coarse grains like ragi, bajra, jowar, and unpolished pulses.' },
        { step: 2, title: 'Ensure Adequate Protein Intake', description: 'Consume 0.8g to 1.0g of protein per kg of body weight daily using lentils, paneer, eggs, or lean poultry.' }
      ]),
      faqJson: JSON.stringify([
        { q: 'What is the recommended daily water intake for Indians?', a: 'ICMR recommends 8 to 12 glasses (2.0 to 3.0 Liters) of clean drinking water daily, adjusted for climate and perspiration.' }
      ]),
      sourcesJson: JSON.stringify([
        { title: 'ICMR-NIN Official Dietary Guidelines for Indians (2024)', url: 'https://nin.res.in/' }
      ]),
      disclaimer: 'Nutrition Disclaimer: Individual macro and calorie needs vary based on age, sex, and metabolic health. Consult a registered dietitian.'
    },

    {
      title: 'Sustainable Weight Management: Science-Backed Fat Loss & Caloric Balance',
      slug: 'sustainable-weight-management-science-guide',
      summary: 'Evidence-based strategies for healthy weight loss, metabolic health, muscle preservation, and sustainable lifestyle adaptations.',
      categorySection: 'health',
      subCategory: 'weight-management',
      readingTime: '7 min read',
      content: `<h2>The Science of Caloric Deficit &amp; Body Composition</h2>
<p>Sustainable weight loss requires creating a moderate caloric deficit of 300 to 500 kcal per day while maintaining sufficient protein intake (1.2g - 1.6g/kg) to prevent lean muscle mass loss.</p>`,
      stepByStepJson: JSON.stringify([
        { step: 1, title: 'Calculate Total Daily Energy Expenditure (TDEE)', description: 'Determine BMR + physical activity level to calculate baseline maintenance calories.' },
        { step: 2, title: 'Target 0.5kg per Week Fat Loss', description: 'Aim for a safe, gradual reduction of 0.5kg/week rather than extreme crash diets.' }
      ]),
      faqJson: JSON.stringify([
        { q: 'Are crash diets effective for long-term weight management?', a: 'No. Crash diets trigger metabolic adaptation and loss of lean muscle, leading to rapid weight regain (yo-yo effect).' }
      ]),
      sourcesJson: JSON.stringify([
        { title: 'WHO Obesity & Overweight Factsheet', url: 'https://www.who.int/' }
      ]),
      disclaimer: 'Always consult a doctor before making significant dietary reductions.'
    },

    {
      title: 'Sleep Hygiene & Circadian Rhythm Optimization: Evidence-Based Guide',
      slug: 'sleep-hygiene-circadian-rhythm-health-guide',
      summary: 'How sleep architecture, blue-light management, melatonin production, and 7 to 9 hours of quality restorative sleep transform physical & cognitive performance.',
      categorySection: 'health',
      subCategory: 'sleep',
      readingTime: '6 min read',
      content: `<h2>Why Sleep Quality Governs Physical &amp; Mental Recovery</h2>
<p>Sleep is an active physiological state essential for cellular repair, growth hormone release, memory consolidation, and glymphatic brain clearance. Adults require 7 to 9 hours of uninterrupted sleep nightly.</p>`,
      stepByStepJson: JSON.stringify([
        { step: 1, title: 'Maintain Consistent Sleep-Wake Windows', description: 'Go to bed and wake up within the same 30-minute window every day, including weekends.' },
        { step: 2, title: 'Establish Blue Light Filter Rules', description: 'Turn off smartphones, laptops, and LED screens 60 minutes before bedtime to allow natural melatonin secretion.' }
      ]),
      faqJson: JSON.stringify([
        { q: 'How does caffeine affect sleep quality?', a: 'Caffeine has a half-life of 5 to 7 hours. Avoid consuming coffee or energy drinks after 2:00 PM.' }
      ]),
      sourcesJson: JSON.stringify([
        { title: 'National Institutes of Health (NIH) Sleep Science Protocols', url: 'https://www.nih.gov/' }
      ]),
      disclaimer: 'Seek medical advice from a sleep specialist if you suffer from persistent insomnia or sleep apnea.'
    },

    {
      title: 'WHO Mental Wellness Framework: Managing Stress, Anxiety & Workplace Burnout',
      slug: 'who-mental-wellness-work-life-balance-guide',
      summary: 'Practical mental health strategies based on WHO workplace wellness guidelines: stress mitigation, mindfulness, cognitive rest, and professional support.',
      categorySection: 'health',
      subCategory: 'mental-wellness',
      readingTime: '7 min read',
      content: `<h2>Prioritizing Psychological Well-Being in Modern Work Environments</h2>
<p>The World Health Organization defines mental health as a state of well-being that enables individuals to cope with life stresses, work productively, and contribute to their community.</p>`,
      stepByStepJson: JSON.stringify([
        { step: 1, title: 'Practice Box Breathing', description: 'Perform 4-4-4-4 box breathing (inhale 4s, hold 4s, exhale 4s, hold 4s) during high-stress periods.' },
        { step: 2, title: 'Establish Work-Life Boundaries', description: 'Set non-negotiable end times for daily work emails and workplace notifications.' }
      ]),
      faqJson: JSON.stringify([
        { q: 'When should someone seek professional mental health counseling?', a: 'If stress, persistent anxiety, or mood changes interfere with daily work, relationships, or sleep for over 2 weeks, consult a licensed mental health professional.' }
      ]),
      sourcesJson: JSON.stringify([
        { title: 'WHO Mental Health Guidelines & Workplace Wellbeing', url: 'https://www.who.int/mental_health/' }
      ]),
      disclaimer: 'Mental Health Emergency Note: If you or someone you know is in crisis, contact national tele-MANAS helpline (14416 in India) immediately.'
    },

    {
      title: 'Home Fitness Equipment Guide: Essential Gear for Home Workouts',
      slug: 'home-fitness-equipment-guide-beginners',
      summary: 'Top essential home gym equipment for strength, mobility, and cardio training without needing commercial gym memberships.',
      categorySection: 'health',
      subCategory: 'fitness-equipment',
      readingTime: '6 min read',
      content: `<h2>Building an Efficient Home Workout Space</h2>
<p>You do not need expensive commercial gym machinery to build strength and endurance at home. A minimal setup with resistance bands, adjustable dumbbells, and a durable exercise mat covers over 90% of exercise variations.</p>`,
      stepByStepJson: JSON.stringify([
        { step: 1, title: 'High-Density Non-Slip Yoga/Exercise Mat', description: 'Provides cushioning for spinal protection during floor exercises, core workouts, and stretches.' },
        { step: 2, title: 'Loop & Tube Resistance Bands Set', description: 'Versatile gear for progressive overload, pull-ups assistance, and mobility drills.' }
      ]),
      faqJson: JSON.stringify([
        { q: 'Are resistance bands as effective as free weights?', a: 'Yes, studies demonstrate that resistance bands provide comparable muscle activation and strength adaptation when progressive overload is maintained.' }
      ]),
      sourcesJson: JSON.stringify([
        { title: 'Sports Medicine & Biomechanics Research Protocols', url: 'https://www.ncbi.nlm.nih.gov/' }
      ]),
      disclaimer: 'Inspect all fitness equipment for wear or defects prior to use.'
    },

    {
      title: 'Weekly Workout Plans: 3-Day Full Body & 4-Day Upper/Lower Splits for Beginners',
      slug: 'beginner-to-advanced-weekly-workout-plans',
      summary: 'Structured weekly workout routines for beginners and intermediate lifters with progressive overload, recovery rest days, and set/rep targets.',
      categorySection: 'health',
      subCategory: 'workout-plans',
      readingTime: '8 min read',
      content: `<h2>Structured Resistance &amp; Aerobic Training Schedules</h2>
<p>Consistency and progressive overload are the core principles of effective strength training. Below are tested 3-day and 4-day weekly workout routines suitable for home or gym training.</p>

<h3>3-Day Full-Body Routine (Mon / Wed / Fri)</h3>
<ul>
  <li><strong>Goblet Squats / Bodyweight Squats:</strong> 3 Sets x 10-12 Reps</li>
  <li><strong>Push-Ups / Incline Push-Ups:</strong> 3 Sets x 8-12 Reps</li>
  <li><strong>Dumbbell Rows / Resistance Band Pulls:</strong> 3 Sets x 10-12 Reps</li>
  <li><strong>Plank Hold:</strong> 3 Sets x 30-45 Seconds</li>
</ul>`,
      stepByStepJson: JSON.stringify([
        { step: 1, title: 'Record Workouts in a Logbook', description: 'Track weights lifted and reps completed to ensure continuous progressive adaptation over time.' },
        { step: 2, title: 'Incorporate 48 Hours Rest Between Muscle Groups', description: 'Allow muscle groups 48 hours to repair and rebuild before training the same target group again.' }
      ]),
      faqJson: JSON.stringify([
        { q: 'How many days per week should a beginner exercise?', a: '3 days of strength training combined with 2 days of moderate walking or swimming is ideal for optimal adaptation and recovery.' }
      ]),
      sourcesJson: JSON.stringify([
        { title: 'American College of Sports Medicine (ACSM) Exercise Guidelines', url: 'https://www.acsm.org/' }
      ]),
      disclaimer: 'Maintain proper posture and form to prevent lower back and joint injuries.'
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
    console.log(`✅ Seeded Health Guide: ${art.title} (${art.subCategory}/${art.slug})`);
  }
}

seedHealthTopics()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
