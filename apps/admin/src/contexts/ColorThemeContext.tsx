import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect
} from "react";
import { useColorMode } from "@chakra-ui/react";

export type ColorProfile = {
  id: string;
  name: string;
  description: string;
  gradient: string;
  primary: string;
  secondary: string;
  accent: string;
  forceMode?: "light" | "dark"; // Force specific mode regardless of user preference
  noDarkMode?: boolean;
};

export const colorProfiles: ColorProfile[] = [
  {
    id: "default",
    name: "Purple-Blue Fusion",
    description: "A modern blend of soft purple and vibrant blue.",
    gradient: "linear-gradient(to-r, #805AD550, #38BDF850)",
    primary: "#805AD5",
    secondary: "#38BDF8",
    accent: "#B794F4"
  },
  {
    id: "ocean",
    name: "Ocean Blue",
    description: "A fresh, aquatic gradient with shades of blue.",
    gradient:
      "linear-gradient(to-r,rgba(0, 0, 0, 0.01),rgba(0, 150, 255, 0.4))",
    primary: "#0096FF",
    secondary: "#00D4FF",
    accent: "#B2F5EA"
  },
  {
    id: "forest",
    name: "Forest Canopy",
    description: "A natural gradient from deep forest to emerald green.",
    gradient:
      "linear-gradient(to-r,rgba(26, 43, 34, 0.06),rgba(0, 128, 0, 0.4))",
    primary: "#1A2B22",
    secondary: "#008000",
    accent: "#38A169"
  },
  {
    id: "sunset",
    name: "Twilight Amethyst",
    description: "A dreamy gradient with rich purple.",
    gradient:
      "linear-gradient(to-r,rgba(0, 0, 0, 0.14),rgba(128, 0, 255, 0.4))",
    primary: "#8000FF",
    secondary: "#A259FF",
    accent: "#F687B3"
  },
  {
    id: "classic",
    name: "Classic",
    description: "The original black and white background",
    gradient: "#000000FF",
    primary: "#000000",
    secondary: "#ffffff",
    accent: "#000000"
  },
  {
    id: "racing",
    name: "F1 2025",
    description: "An electric black and red gradient",
    gradient: "linear-gradient(to-r,rgb(0, 0, 0),rgb(138, 12, 12))",
    primary: "#000000",
    secondary: "#ff0000",
    accent: "#000000",
    forceMode: "dark" // Force dark mode for this profile
  }
];

type ColorThemeContextType = {
  currentProfile: ColorProfile;
  setCurrentProfile: (profile: ColorProfile) => void;
  colorProfiles: ColorProfile[];
  isForcedMode: boolean;
};

const ColorThemeContext = createContext<ColorThemeContextType | undefined>(
  undefined
);

export const useColorTheme = () => {
  const context = useContext(ColorThemeContext);
  if (!context) {
    throw new Error("useColorTheme must be used within a ColorThemeProvider");
  }
  return context;
};

type ColorThemeProviderProps = {
  children: ReactNode;
};

export const ColorThemeProvider: React.FC<ColorThemeProviderProps> = ({
  children
}) => {
  const [currentProfile, setCurrentProfileState] = useState<ColorProfile>(
    () => {
      // Try to get saved profile from localStorage
      const savedProfileId = localStorage.getItem("colorProfileId");
      const savedProfile = colorProfiles.find(
        (profile) => profile.id === savedProfileId
      );
      return savedProfile || colorProfiles[0]; // Default to first profile
    }
  );

  const { colorMode, setColorMode } = useColorMode();

  // Handle forced mode when profile changes
  useEffect(() => {
    if (currentProfile.forceMode && currentProfile.forceMode !== colorMode) {
      setColorMode(currentProfile.forceMode);
    }
  }, [currentProfile, colorMode, setColorMode]);

  const handleSetCurrentProfile = (profile: ColorProfile) => {
    setCurrentProfileState(profile);
    localStorage.setItem("colorProfileId", profile.id);

    // Apply forced mode if specified
    if (profile.forceMode) {
      setColorMode(profile.forceMode);
    }
  };

  const isForcedMode = !!currentProfile.forceMode;

  const value = {
    currentProfile,
    setCurrentProfile: handleSetCurrentProfile,
    colorProfiles,
    isForcedMode
  };

  return (
    <ColorThemeContext.Provider value={value}>
      {children}
    </ColorThemeContext.Provider>
  );
};
