"use client"

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { toast } from '@/hooks/use-toast';
import positionsData from "../_static/positions.json";
import { fetchInterests } from '../_actions/fetchInterests';
import { saveUserPreferences } from '../_actions/saveUserPreferences';

export const usePersonalize = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      positions: positionsData.reduce((acc, position) => ({
        ...acc,
        [position.id]: false,
      }), {}),
    },
  });

  const session = useSession();
  const token = session.data?.user?.token;

  const [interests, setInterests] = useState<{ data: { id: number; attributes: { name: string; }; }[] }>({ data: [] });
  const [userInterests, setUserInterests] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const interestsRes = await fetchInterests(token);
        setInterests(interestsRes);
      } catch (error) {
        console.error('Error fetching interests:', error);
      }
    };
    fetchData();
  }, [token]);

  const toggleInterest = (id: number) => {
    setUserInterests((prevInterests) => (prevInterests.includes(id)
      ? prevInterests.filter((el) => el !== id)
      : [...prevInterests, id]));
  };

  const onSubmit = async (data: any) => {
    const userPositions = Object.entries(data.positions)
      .filter(([_, value]) => value)
      .map(([key]) => parseInt(key, 10));

    try {
      await saveUserPreferences(token, userPositions, userInterests);
      toast({ title: "Success", description: "Your preferences have been saved", variant: "default" });
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
