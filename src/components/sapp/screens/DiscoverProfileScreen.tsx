'use client';

import { PlantProfile } from '@/constants/mockProfiles';
import ProfileCardView from '@/components/sapp/ProfileCardView';

interface DiscoverProfileScreenProps {
  profile: PlantProfile;
}

export default function DiscoverProfileScreen({ profile }: DiscoverProfileScreenProps) {
  return <ProfileCardView profile={profile} preview />;
}
