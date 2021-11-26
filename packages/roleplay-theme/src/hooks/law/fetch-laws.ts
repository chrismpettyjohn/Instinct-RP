import {lawService} from '@instinct-plugin/roleplay-web';
import {createFetchHook} from '@instinct-web/core';
import {Law} from '@instinct-plugin/roleplay-types';

export const useFetchLaws = () => createFetchHook<Law[]>(lawService.getAll);
