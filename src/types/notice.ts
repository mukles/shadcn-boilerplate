export interface Notice {
  id: string;
  title: string;
  description: string;
  image?: string;
  variables: {
    id?: string;
    title: string;
    description: string;
    image?: string;
  };
}

export interface NoticeData {
  id: string;
  enable: boolean;
  title: string;
  description: string;
  notices: Omit<Notice, "variables">[];
  variables: {
    id?: string;
    title: string;
    description: string;
  };
}
