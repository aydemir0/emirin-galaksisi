export interface Project {
  id: string;
  name: string;
  color: string;
  description: string;
  textureUrl: string;
  size: number;
  orbitRadius: number;
  orbitSpeed: number;
  angleOffset: number;
  link: string;
}

export interface ProfileOrbit {
  id: string;
  name: string;
  color: string;
  description: string;
  imageUrl: string;
  size: number;
  orbitRadius: number;
  orbitSpeed: number;
  angleOffset: number;
  link?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  date: string;
  imageUrl: string;
}

export interface BlogPanelData {
  id: string;
  name: string;
  description: string;
  posts: BlogPost[];
}
