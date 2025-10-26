import { EventType } from "@rp/shared";
import { IconType } from "react-icons";

import {
  FaBriefcase,
  FaCheck,
  FaHandshake,
  FaMicrophone,
  FaStar,
  FaUtensils
} from "react-icons/fa";

export const EVENT_ICONS: Record<EventType, IconType> = {
  SPECIAL: FaStar, // star for special events
  SPEAKER: FaMicrophone, // microphone for speaker sessions
  CORPORATE: FaBriefcase, // briefcase for corporate events
  PARTNERS: FaHandshake, // handshake for partners
  MEALS: FaUtensils, // utensils for meal breaks
  CHECKIN: FaCheck // checkmark for check-in
};
