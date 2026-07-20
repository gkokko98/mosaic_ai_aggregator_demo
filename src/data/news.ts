import type { NewsItem } from "./types";

/**
 * @fileoverview Mock article data — sibling to `apps.ts` in the same
 * no-backend mock layer. Powers the News list, Home's News preview row, and
 * each article's `/news/:id` page directly; there is no API layer behind it.
 */

// `image` is a CSS gradient placeholder standing in for real Figma artwork/photography.
export const news: NewsItem[] = [
  {
    id: "ai-nutrition-science",
    title: "How AI makes nutrition science accessible",
    category: "health",
    image: "linear-gradient(135deg, #92400e 0%, #451a03 100%)",
    date: "12 Jun 2026",
    body: [
      "For decades, precision nutrition was the preserve of elite athletes and patients with specific conditions — complex, expensive, and requiring a clinical setting. Artificial intelligence is changing that equation fundamentally.",
      "New apps now combine computer vision with vast nutritional databases to analyze a meal from a photograph in under three seconds. Models trained on millions of labelled food images can distinguish between a latte and a flat white, between basmati and jasmine rice, details that matter when you are tracking micronutrients.",
      "The most advanced platforms build adaptive meal plans that respond to real feedback loops: if you consistently skip a recommended meal, the system adjusts rather than repeating the advice. The result is a shift from generic dietary guidelines to genuinely personal nutrition, at a fraction of the cost of professional consultation, and available to anyone with a smartphone.",
    ],
  },
  {
    id: "algorithm-bedtime-stories",
    title: "Once upon an algorithm: AI stories kids actually love",
    category: "kids",
    image: "linear-gradient(135deg, #1e1b4b 0%, #4c1d95 100%)",
    date: "10 Jun 2026",
    body: [
      "The ritual of the bedtime story is one of childhood's most universal experiences, and one of the hardest for busy parents to sustain night after night. AI is stepping in not to replace that ritual but to make it infinitely sustainable.",
      "Platforms like Moonkid generate original stories on demand, calibrated to a child's age, interests, and even their emotional state that day. A child who had a difficult day at school can be offered a story about resilience; one who is excited about a birthday can hear a celebration tale.",
      "The technology pairs story generation with voice synthesis and ambient sound design, producing an experience that researchers describe as measurably calming, with children falling asleep faster than with recorded audiobooks.",
    ],
  },
  {
    id: "ai-tutors-classroom",
    title: "Why AI tutors are showing up in every classroom",
    category: "education",
    image: "linear-gradient(135deg, #164e63 0%, #0e7490 100%)",
    date: "6 Jun 2026",
    body: [
      "Every classroom has the same structural problem: one teacher, twenty-five different learning paces. AI tutors are increasingly being deployed as a way to close that gap without asking teachers to be twenty-five places at once.",
      "Modern language-tutoring apps listen to a student's pronunciation, track which grammar patterns keep tripping them up, and quietly resurface those exact patterns in later exercises until they stick. The pacing adapts session to session, so a fast learner is never bored and a struggling one is never overwhelmed.",
      "Teachers who have piloted these tools report the biggest shift isn't test scores, but time: freed from repeating the same explanation five times a class, they get to spend it on the students who need a human, not a hint.",
    ],
  },
  {
    id: "generative-tools-creators",
    title: "The generative tools creators can't stop using",
    category: "ai-tools",
    image: "linear-gradient(135deg, #6d28d9 0%, #db2777 100%)",
    date: "2 Jun 2026",
    body: [
      "A few years ago, generating a usable illustration or a polished piece of writing from scratch meant hours of work or a commissioned freelancer. Today it can mean a well-worded prompt and a few seconds of waiting.",
      "Creators are folding these tools into every stage of their workflow: moodboards for a pitch, rough drafts of a script, quick variations on a logo before a client call. The tools aren't replacing the creative decision, they're compressing the distance between an idea and something you can actually look at.",
      "What's changed recently isn't just quality, it's speed of iteration. Creators describe trying ten directions in the time it used to take to rough out one, which shifts the real skill from execution to knowing which of the ten is worth pursuing.",
    ],
  },
];
