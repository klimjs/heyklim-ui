export type ScreenType = {
  id: number;
  title?: string;
};

export type BlockType = {
  id: number;
  type: string;
  color: string;
};

export type ActionType = {
  id: number;
  block?: {
    id: number;
    type: string;
    color: string;
  };
  targetId?: number;
};
