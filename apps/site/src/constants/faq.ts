export interface FAQItem {
  question: string;
  answer: string;
  colors: {
    light: string;
    dark: string;
  };
}

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
    question: "What is Reflections | Projections?",
    answer:
      "Reflections | Projections (R|P) is the largest student-run tech conference in the Midwest, bringing together students, industry leaders, and professionals from all over the world. Join us for an exciting week of speaker talks, workshops, a career fair, and other intriguing opportunities! All of R|P is designed to allow participants to reflect upon their experiences and project towards their future.",
    colors: { light: "#8D0000", dark: "#600000" }
  },
  {
    question: "Who can attend R|P?",
    answer:
      "R|P is open to everyone over the age of 18. Registering and attending R|P is open to all majors and class levels and is completely free!",
    colors: { light: "#322BB7", dark: "#221D88" }
  },
  {
    question: "When is R|P 2024?",
    answer:
      "Reflections | Projections 2024 will be from Wednesday, September 18 to Sunday, September 22!",
    colors: { light: "#56BF59", dark: "#429945" }
  },
  {
    question: "Where are R|P’s events held?",
    answer:
      "Every event of R|P 2024 will be held in the Siebel Center for Computer Science (201 N Goodwin Ave, Urbana, IL 61801). Our calendar contains the specific room for each event.",
    colors: { light: "#E6930D", dark: "#B77408" }
  },
  {
    question: "What do I need to do before R|P?",
    answer:
      "It’s simple: register (it’s completely free!) and download the brand new Reflections | Projections app (available in the App Store and Google Play Store). Just like that, you’re all set to attend events and retrieve free swag/merch!",
    colors: { light: "#47438A", dark: "#312F63" }
  }
];
