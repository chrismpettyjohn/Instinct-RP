import {AxiosResponse} from 'axios';
import {useEffect, useState} from 'react';
import {Photo} from '@instinct-prj/interface';
import {backendAPI} from '@instinct-web/core';

export function useFetchPhotosByUsername(
  username: string
): Photo[] | undefined {
  const [photos, setPhotos] = useState<Photo[]>();

  useEffect(() => {
    async function fetchPhotos() {
      setPhotos(undefined);
      const photosResponse: AxiosResponse<Photo[]> = await backendAPI.get(
        `photos/by-user/${username}`
      );
      setPhotos(photosResponse.data);
    }

    fetchPhotos();
  }, [username]);

  return photos;
}
