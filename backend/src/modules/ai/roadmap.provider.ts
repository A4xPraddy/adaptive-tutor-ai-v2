export interface RoadmapItem {
  title: string;
  description?: string;
  order: number;
}

export interface RoadmapProvider {
  generate(goal: string): Promise<RoadmapItem[]>;
}