export type RootStackParamList = {
  home: undefined;
  login: undefined;
  register: undefined;
  profile: undefined;
  updateUserProfile: undefined;
  "Create New Challenge": undefined;
};

export interface NewChallenge {
  name: string;
  description: string;
  tags: string[];
  goals: string[];
  createdBy: string; // user ID
}

export interface Challenge extends NewChallenge {
  id: string; // Firestore document ID
  createdAt: string;
  updatedAt: string;
}
