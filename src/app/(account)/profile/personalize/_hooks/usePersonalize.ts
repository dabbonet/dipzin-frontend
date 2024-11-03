"use client"

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from '@/hooks/use-toast';
import positionsData from "../_static/positions.json";
import { fetchInterests } from '../_actions/fetchInterests';
import { saveUserPreferences } from '../_actions/saveUserPreferences';
import { useRouter } from 'next/navigation';

export const usePersonalize = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      positions: positionsData.reduce((acc, position) => ({
        ...acc,
        [position.id]: false,
      }), {}),
    },
  });

  const router = useRouter()
  const [interests, setInterests] = useState<{ data: { id: number; attributes: { name: string; }; }[] }>({ data: [] });
  const [userInterests, setUserInterests] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const interestsRes = await fetchInterests();
        setInterests(interestsRes);
      } catch (error) {
        console.error('Error fetching interests:', error);
      }
    };
    fetchData();
  }, []);

  const toggleInterest = (id: number) => {
    setUserInterests((prevInterests) => (prevInterests.includes(id)
      ? prevInterests.filter((el) => el !== id)
      : [...prevInterests, id]));
  };

  const onSubmit = async (data: any) => {
    router.push("/");
    if (!data.positions) {
      toast({ title: "Error", description: "No positions selected", variant: "error" });
      return;
    }

    const userPositions = Object.entries(data.positions)
      .filter(([_, value]) => value)
      .map(([key]) => parseInt(key, 10));

    try {
      await saveUserPreferences(userPositions, userInterests);
      toast({ title: "Success", description: "Your preferences have been saved", variant: "default" });
      router.push("/");
    } catch (error) {
      toast({ title: "Error", description: "Something went wrong", variant: "error" });
    }
  };

  return {
    control,
    interests,
    userInterests,
    toggleInterest,
    handleSubmit,
    onSubmit,
  };
};
