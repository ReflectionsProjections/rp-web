export interface FAQItem {
  question: string;
  answer: string;
  colors: {
    light: string;
    dark: string;
  };
}

export const FAQS: FAQItem[] = [
  {
    question: "What is Reflections | Projections (R|P)?",
    answer:
      "R|P is the largest student-run technology conference in the Midwest! Held at UIUC, we bring together students, professionals, and companies for talks, networking, competitions, and career opportunities!",
    colors: { light: "#8D0000", dark: "#600000" }
  },
  {
    question: "When and where is R|P?",
    answer:
      "R|P 2025 will be held from **September 16th - September 20th** at the **Thomas M. Siebel Center for Computer Science** ([201 N Goodwin Ave, Urbana, IL 61801](https://maps.app.goo.gl/2mphY68Pwd6qTuBz5)). See our schedule for the specific room number for each event.",
    colors: { light: "#322BB7", dark: "#221D88" }
  },
  {
    question: "Who can attend R|P?",
    answer:
      "R|P is **free** to attend for any major! As long as you are curious to explore more opportunities in tech, R|P is the right place for you. The conference is open to everyone over the age of 18.",
    colors: { light: "#56BF59", dark: "#429945" }
  },
  {
    question: "What do I need to do before R|P?",
    answer:
      "Be sure to **[register](/register)** (it's free!) and download the **Reflections | Projections app** on the [App Store](https://apps.apple.com/us/app/r-p-2025/id6744465190) or [Google Play Store](https://play.google.com/store/apps/details?id=com.reflectionsprojections&utm_source=na_Med) to stay updated on schedules, attend all our events, and receive free food and swag!",
    colors: { light: "#E6930D", dark: "#B77408" }
  },
  {
    question: "What is the Point System?",
    answer:
      "Receive exclusive rewards for attending R|P with our **Point System**! Earn points by attending events to climb our daily leaderboard. Each day is considered a race and at the end of the day, the top 50 people on the leaderboard officially complete that day’s race and receive a prize! We have **3 prizes** to unlock, so if you are able to complete 3 races throughout R|P, you can collect them all!",
    colors: { light: "#47438A", dark: "#312F63" }
  }
];
