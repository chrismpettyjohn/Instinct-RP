export interface PropertyDTO {
  roomID: number;
  photoIDs: number[];
  buyNowPrice: number;
}

export interface BidOnPropertyDTO {
  offer: number;
}

export interface RespondOnPropertyBidDTO {
  accepted: boolean;
}

export interface PropertyPhotoDTO {
  photoID: number;
  isPrimary: boolean;
}
