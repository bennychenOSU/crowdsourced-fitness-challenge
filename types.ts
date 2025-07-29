export type RootStackParamList = {
  login: undefined;
  register: undefined;
  profile: undefined;
  home: undefined;
  ["Create New Challenge"]: undefined;
  ["My Challenges"]: undefined;
  // add other routes here
};

export interface NewChallenge {
  name: string;
  description: string;
  tags: string[];
  goals: Goal[];
  createdBy: string; // user ID
}

export interface Challenge extends NewChallenge {
  id: string; // Firestore document ID
  createdAt: string;
  updatedAt: string;
}

export interface Goal {
  name: string;
  points: number;
  totalPossiblePoints: number;
  pointsUnit: string;
}
