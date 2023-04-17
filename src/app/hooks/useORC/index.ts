import { useMemo, useEffect } from 'react';
import ORCService from '$infras/api/orc';
import { useMutation } from '@tanstack/react-query';

type Word = {
  WordText: string;
  Left: number;
  Top: number;
  Height: number;
  Width: number;
};

export const useGetHighlights = (imageName: string) => {
  const orcService = new ORCService();
  const mutation = useMutation({
    mutationFn: orcService.getHighlights,
  });

  useEffect(() => {
    mutation.reset();
  }, [imageName]);

  const data = useMemo(() => {
    if (mutation.data) {
      let words: Word[] = [];
      const lines = mutation.data.data.ParsedResults?.[0].TextOverlay?.Lines as { Words: Word[] }[] | undefined;

      if (lines?.length) {
        lines.forEach((line) => {
          const newWords = line.Words;
          if (newWords?.length) {
            words = [...words, ...newWords];
          }
        });

        return words;
      }
    }

    return null;
  }, [mutation.data]);

  return { ...mutation, data, getHighlights: mutation.mutate };
};
