interface CartItemDisplay {
  _id: string;
  title: string;
  thumbnail: string;
  price: number;
  author: string;
}

interface CartItem {
  _id: string;
  title: string;
  thumbnail: string;
  price: number;
  author: string;
  numOfReviews: number;
  totalVideosLength: number;
  avgRatingStars: number;
  students: number;
  isBought: boolean;
}

const cartItemToDisplay = (item: CartItem): CartItemDisplay => ({
  _id: item._id,
  title: item.title,
  thumbnail: item.thumbnail,
  price: item.price,
  author: item.author
}); 