type StoryType = {
    id: number;
    date: string;
    time: string;
    mood: string;
    color: string;
  };

  type StoryListProps = {
    stories: StoryType[];
  };
export type { StoryType, StoryListProps };