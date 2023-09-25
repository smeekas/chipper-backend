export type PostType = {
  endpoint: string;
  expirationTime: null | string | number;
  keys: {
    p256dh: string;
    auth: string;
  };
};

export type SubType = PostType[];

export type PostData = {
  id: string;
  image: string;
  location: string;
  title: string;
};
