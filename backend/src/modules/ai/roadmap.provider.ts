export interface RoadmapItem {
  title: string;
  order: number;
}

export interface RoadmapProvider {
  generate(goal: string): Promise<RoadmapItem[]>;
}