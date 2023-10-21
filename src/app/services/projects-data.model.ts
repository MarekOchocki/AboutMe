
export interface TextProjectParagraph {
  type: 'text';
  text: string;
}

export interface ImageProjectParagraph {
  type: 'image';
  imageSrc: string;
}

export interface VideoProjectParagraph {
  type: 'video';
  videoUrl: string;
}

export type ProjectParagraph = TextProjectParagraph | ImageProjectParagraph | VideoProjectParagraph;

export interface ProjectSubsection {
  title: string;
  paragraphs: ProjectParagraph[];
}

export interface ProjectSection {
  name: string;
  subsections: ProjectSubsection[];
}

export interface Project {
  name: string;
  sections: ProjectSection[];
}

export interface ProjectsInfo {
  projects: Project[];
}
