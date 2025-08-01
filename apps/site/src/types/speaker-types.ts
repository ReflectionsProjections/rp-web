export type Speaker = {
  name: string;
  company: string;
  description: string;
};

export type SpeakerRow = {
  speakers: Speaker[];
  color: string;
};
