type StoryType = {
    id: string;
    email: string;
  feel: string;
  photo: string;
  story: string;
  storyDate: string;
  recommendation: string;
  model:string;
  };

  type StoryListProps = {
    stories: StoryType[];
  };
export type { StoryType, StoryListProps };